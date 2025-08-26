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

- **開発環境**: SQLite + Drizzle ORM
- **本番環境**: Cloudflare D1（予定）
- **ORM**: Drizzle ORM v0.40.0
- **クライアント**: @libsql/client

## ストレージ

- **本番環境**: Cloudflare R2（予定）

## テスト

- **ユニットテスト**: Vitest v3.2.3（ブラウザ環境とNode環境を分離）
- **E2Eテスト**: Playwright v1.49.1
- **UI開発**: Storybook v9.1.3

## ビルド・開発ツール

- **ビルドツール**: Vite v7.0.4
- **TypeScript**: v5.0.0（strict mode有効）
- **パッケージマネージャー**: npm
- **リンター**: ESLint v9.18.0
- **フォーマッター**: Prettier v3.4.2

## デプロイ

- **プラットフォーム**: Cloudflare Pages/Workers（予定）
- **アダプター**: 現在は @sveltejs/adapter-auto、本番では @sveltejs/adapter-cloudflare に切り替え予定

## 主要な依存関係

- @inlang/paraglide-js: 国際化対応
- @node-rs/argon2: パスワードハッシュ化
- @oslojs/crypto, @oslojs/encoding: 暗号化関連ユーティリティ
