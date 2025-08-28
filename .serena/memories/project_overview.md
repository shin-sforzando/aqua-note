# Aqua Note プロジェクト概要

## プロジェクトの目的

Aqua Note は水槽管理（アクアリウム管理）用のWebアプリケーションです。
熱帯魚などの飼育における水換えや給餌などのメンテナンス作業を簡単に記録・管理できるツールです。

## 現在の開発状況（2025年8月）

- Issue #4完了：初回デプロイとテスト環境の準備
- Coming Soonページが稼働中
- UIは仮実装（単一ファイル `/src/routes/+page.svelte` に統合）
- Issue #10でSvelte-UXを正式導入予定

## 主な機能（実装予定）

- 水槽情報管理
- 生体情報管理  
- メンテナンス記録（水換え、給餌、添加剤等）
- 水質パラメータ記録
- 無料プラン：基本機能
- 有料プラン（予定）：複数水槽管理、リマインダー、高度なアルバム機能

## プロジェクト構造

```plain
aqua-note/
├── src/
│   ├── routes/         # SvelteKitのページとルーティング
│   │   └── +page.svelte # Coming Soonページ（現在の仮実装）
│   ├── lib/           # 共通ライブラリ
│   │   ├── server/    # サーバーサイドコード
│   │   │   ├── db/    # データベース関連（Drizzle ORM）
│   │   │   └── auth.ts # 認証ロジック（Lucia Auth）
│   │   ├── paraglide/ # 国際化（i18n）
│   │   └── assets/    # 静的アセット
│   └── stories/       # Storybookコンポーネント（デモ用）
├── tests/            # 全テストを統合
│   ├── e2e/          # E2Eテスト（Playwright）
│   └── unit/         # ユニットテスト（Vitest）
├── docs/             # プロジェクトドキュメント
│   ├── DESIGN_GUIDELINES.md # デザインガイドライン
│   ├── D1_MIGRATION.md      # D1マイグレーションガイド
│   └── Roadmap.md          # 開発ロードマップ
├── .storybook/       # Storybook設定
├── static/           # 静的ファイル
├── messages/         # 国際化メッセージ
└── drizzle/          # データベースマイグレーション
```

## 技術スタック

- **フレームワーク**: SvelteKit v5 + Svelte v5
- **スタイリング**: Tailwind CSS v4
- **データベース**: Cloudflare D1
- **認証**: Lucia Auth
- **国際化**: Paraglide
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
