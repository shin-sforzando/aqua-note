# モニタリング・ログ収集システムの実装

## 実装概要

水槽管理アプリケーション（Aqua Note）にCloudflare Workers対応のモニタリング・ログ収集システムを実装。

## 実装されたファイル

### 1. ログユーティリティ (`src/lib/server/logger.ts`)

- **構造化ログシステム**: JSON形式でCloudflare Workers Logs対応
- **セキュリティ機能**: パスワード、トークン等の機密情報自動除去
- **ログレベル**: debug, info, warn, error の4段階
- **パフォーマンス計測**: PerformanceTimerクラス
- **認証ログ**: logAuth()メソッド
- **エラーログ**: logError()メソッド（Errorオブジェクト自動変換）

### 2. サーバーサイドミドルウェア (`src/hooks.server.ts`)

- **認証ログ**: セッション検証のログとパフォーマンス計測
- **グローバルエラーハンドリング**: handleLogging関数
- **リクエストトラッキング**: 開始/完了ログ、requestID生成
- **PerformanceTimer改善**: try-catch-finally構造で確実なリソース管理
- **ミドルウェア順序**: handleParaglide → handleLogging → handleAuth

### 3. クライアントサイドエラートラッキング (`src/hooks.ts`)

- **HandleClientError**: クライアントサイドエラーの自動収集
- **サーバー送信**: /api/errorsエンドポイントへの自動レポート
- **フォールバック**: 送信失敗してもアプリ動作に影響なし

### 4. エラーレポートAPI (`src/routes/api/errors/+server.ts`)

- **POST /api/errors**: クライアントエラーレポート受信
- **型安全性**: ClientErrorData interface
- **統合ログ**: サーバーログへの一元記録

## Cloudflare Workers対応

- **自動ログ収集**: console.*()がWorkers Logsで自動収集
- **構造化ログ**: JSON形式でLogpush対応
- **リアルタイム監視**: Workers Logsダッシュボード対応
- **パフォーマンス**: Workers環境最適化済み

## 技術的特徴

- **リクエストID**: crypto.randomUUID()でユニーク生成
- **コンテキスト管理**: createRequestContext()ヘルパー
- **エラー安全性**: 例外発生時もアプリ継続動作
- **リソース管理**: finally句でタイマー確実終了

## 使用方法

```typescript
import { logger, PerformanceTimer } from '$lib/server/logger';

// 基本ログ
logger.info('User logged in', { userId: 'user-123' });

// エラーログ
logger.logError(error, 'Database connection failed');

// パフォーマンス計測
const timer = new PerformanceTimer('database_query');
// ... 処理 ...
timer.end(true, { rowCount: 10 });
```
