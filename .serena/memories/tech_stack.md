# 技術スタック

## フロントエンド

- **フレームワーク**: SvelteKit v5 + Svelte v5
- **スタイリング**: Tailwind CSS v4（@tailwindcss/vite プラグイン経由）
- **国際化**: Paraglide（日本語・英語対応）
- **Markdown**: MDsveX（.svx ファイルサポート）

## バックエンド

- **ランタイム**: Node.js
- **フレームワーク**: SvelteKit（サーバーサイドも含む）
- **認証**: Lucia Auth（src/lib/server/auth.ts）

## データベース

- **全環境**: Cloudflare D1
- **ORM**: Drizzle ORM v0.44.5
- **開発環境**: D1エミュレーション + platformProxy対応
- **マイグレーション**: Drizzle Kit v0.31.4

## ストレージ

- **本番環境**: Cloudflare R2（予定）

## テスト・品質保証

- **ユニットテスト**: Vitest v3.2.4（ブラウザ環境とNode環境を分離）
- **E2Eテスト**: Playwright v1.55.0
- **カバレッジ測定**: Vitest Coverage v8（常時有効、80%閾値設定）
  - HTMLレポート: ./coverage/index.html
  - 除外設定: Storybook、自動生成ファイル、Paraglideファイル
- **UI開発**: Storybook v9.1.3

### カバレッジ戦略

- **現在実装**: Vitestによるユニットテストカバレッジ
- **将来検討**: PlaywrightによるE2Eテストカバレッジ
- **理由**: SvelteKit + Cloudflare Workers環境でのPlaywrightカバレッジ設定の複雑さ
- **現状**: 9つのE2Eテスト全成功、主要機能（認証57.97%、スキーマ82.73%）のカバレッジ確保済み

## ビルド・開発ツール

- **ビルドツール**: Vite v7.1.3
- **TypeScript**: v5.9.2（strict mode有効）
- **パッケージマネージャー**: npm
- **リンター**: ESLint v9.34.0
- **フォーマッター**: Prettier v3.6.2

## デプロイ・インフラ

- **プラットフォーム**: Cloudflare Workers
- **アダプター**: @sveltejs/adapter-cloudflare v7.2.3
- **CI/CD**: GitHub Actions
  - 本番デプロイ: mainブランチpush時
  - PRプレビュー: PR毎に自動生成
  - 自動クリーンアップ: PR閉鎖時にWorkers削除

## 主要な依存関係

### プロダクション依存関係

- @cloudflare/workers-types: Cloudflare Workers型定義
- @inlang/paraglide-js: 国際化対応
- @node-rs/argon2: パスワードハッシュ化
- @oslojs/crypto, @oslojs/encoding: 暗号化関連ユーティリティ
- drizzle-orm: TypeScript ORM

### 開発依存関係

- @vitest/coverage-v8: カバレッジ測定
- @vitest/browser: ブラウザ環境テスト
- vitest-browser-svelte: Svelteコンポーネントテスト
- wrangler: Cloudflare開発・デプロイツール

## アーキテクチャの特徴

- **エッジファースト**: Cloudflare Workersによるエッジコンピューティング
- **型安全**: TypeScript strict mode + Drizzle ORMの型推論
- **国際化対応**: Paraglideによる静的i18n
- **テスト分離**: クライアント/サーバーテストの明確な分離
- **カバレッジ駆動**: 常時カバレッジ測定による品質保証
