# Aqua Note プロジェクト概要

## プロジェクトの目的

Aqua Note は水槽管理（アクアリウム管理）用のWebアプリケーションです。
熱帯魚などの飼育における水換えや給餌などのメンテナンス作業を簡単に記録・管理できるツールです。

## 主な機能（実装予定）

### 基本機能

- **ユーザー管理**: 認証、プロフィール、設定管理
- **水槽管理**: 複数水槽の登録・管理、仕様記録
- **生体管理**: 水槽内生体の記録・追跡
- **メンテナンス記録**: 水換え、給餌、添加剤投入の記録
- **水質管理**: 各種水質パラメータの測定・記録
- **観察記録**: 日々の観察内容の記録
- **写真管理**: 水槽・生体・記録の写真保存

### 有料機能

- **複数水槽管理**: 無制限の水槽登録
- **高度なリマインダー**: メンテナンススケジュール管理
- **詳細レポート**: 水質トレンド分析
- **公開機能**: 水槽の一般公開・共有
- **バックアップ**: データ自動バックアップ

## プロジェクト構造（最新版）

```plain
aqua-note/
├── src/                           # アプリケーションソース
│   ├── routes/                    # SvelteKitルーティング
│   │   ├── +page.svelte          # ホームページ（Coming Soon）
│   │   ├── +layout.svelte        # レイアウト
│   │   └── test-d1/              # D1接続テストページ
│   ├── lib/                      # 共通ライブラリ
│   │   ├── server/               # サーバーサイドコード
│   │   │   ├── db/               # データベース層
│   │   │   │   ├── schema.ts     # 完全なデータベーススキーマ
│   │   │   │   └── index.ts      # DB接続設定
│   │   │   └── auth.ts           # 認証ロジック（Lucia Auth）
│   │   ├── components/           # Svelteコンポーネント
│   │   └── assets/               # 静的アセット
│   ├── stories/                  # Storybook用コンポーネント
│   │   ├── *.svelte             # デモコンポーネント
│   │   ├── *.stories.svelte     # ストーリー
│   │   └── assets/              # Storybook用アセット
│   ├── app.html                 # HTMLテンプレート
│   ├── app.css                  # グローバルCSS
│   ├── hooks.server.ts          # サーバーフック
│   ├── hooks.ts                 # クライアントフック
│   └── worker-configuration.d.ts # Cloudflare Workers型定義
├── tests/                        # テストファイル
│   ├── unit/                     # ユニットテスト（Vitest）
│   │   ├── components/           # コンポーネントテスト
│   │   ├── lib/server/           # サーバーロジックテスト
│   │   └── routes/               # ルートテスト
│   └── e2e/                      # E2Eテスト（Playwright）
│       ├── d1-connection.test.ts # D1接続テスト
│       └── coming-soon.spec.ts   # UI E2Eテスト
├── docs/                         # プロジェクトドキュメント
│   ├── D1_MIGRATION.md          # D1マイグレーションガイド
│   ├── DESIGN_GUIDELINES.md     # デザインガイドライン
│   └── ERD.md                   # ER図
├── drizzle/                      # データベースマイグレーション
│   ├── 0000_initial_complete_schema_text_unified.sql
│   └── meta/                     # マイグレーションメタデータ
├── scripts/                      # ユーティリティスクリプト
│   └── reset-db.sql             # DB初期化スクリプト
├── messages/                     # 国際化メッセージ
│   ├── ja.json                  # 日本語
│   └── en.json                  # 英語
├── static/                       # 静的ファイル
│   ├── favicon/                 # ファビコン各種
│   ├── logo.svg                 # ロゴ
│   └── robots.txt               # SEO設定
├── .storybook/                   # Storybook設定
├── .github/                      # GitHub設定
│   ├── workflows/               # GitHub Actions
│   ├── actions/                 # カスタムアクション
│   └── ISSUE_TEMPLATE/          # Issueテンプレート
├── .serena/                      # Serena MCP設定
│   ├── memories/                # プロジェクト記憶
│   └── cache/                   # キャッシュ
├── .claude/                      # Claude Code設定
│   ├── agents/                  # 専用エージェント
│   └── settings.local.json      # ローカル設定
├── .vscode/                      # VSCode設定
└── project.inlang/               # Paraglide国際化設定
```

## 技術スタック

- **フレームワーク**: SvelteKit v5 + Svelte v5
- **スタイリング**: Tailwind CSS v4
- **データベース**: Cloudflare D1（完全実装済み）
- **ORM**: Drizzle ORM（完全スキーマ実装済み）
- **認証**: Lucia Auth
- **決済**: Stripe統合（スキーマ実装済み）
- **国際化**: Paraglide（日本語・英語対応）
- **テスト**: Vitest（ユニット）、Playwright（E2E）
- **デプロイ**: Cloudflare Workers

## 開発ガイドライン

- 英語で考えても良いが、ユーザとの応答は必ず日本語で対応
- 不確かな情報は必ず確認してから回答（特に日付、バージョン情報、コマンド名など）
- 作業前に必ずGitブランチを作成
  - Issue番号がある場合: `{0埋め3桁のIssue番号}_機能名` 形式
  - 例: Issue #19の場合は `019_prepare_github_actions`
- mainブランチで直接作業することは厳禁
- 既存の実装パターンを必ず確認してから新機能を追加
- YAGNI原則に従い、必要になるまで実装を遅らせる

## 重要な設定ファイル

- `svelte.config.js` - SvelteKit設定（MDsveX、アダプター）
- `vite.config.ts` - Vite設定（Tailwind、Paraglide、テスト設定）
- `drizzle.config.ts` - データベーススキーマ設定
- `tsconfig.json` - TypeScript設定（strict mode有効）
- `playwright.config.ts` - E2Eテスト設定
- `wrangler.toml` - Cloudflare Workers設定

## 次の開発ステップ

1. **認証機能の実装**: ユーザー登録・ログイン機能
2. **基本UI実装**: ダッシュボード、水槽一覧画面
3. **CRUD機能実装**: 水槽・生体・記録の基本操作
4. **Stripe統合**: サブスクリプション機能
5. **高度な機能**: リマインダー、レポート、公開機能
