# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Aqua Note は水槽管理（アクアリウム管理）用のWebアプリケーションです。
熱帯魚などの飼育における水換えや給餌などのメンテナンス作業を簡単に記録・管理できるツールです。
SvelteKit v5を基盤として、最新のWeb技術スタックで構築されています。

## 開発ガイドライン

- ソースコード中のコメント、ログ出力などはすべて **英語に統一** せよ
  - 日本語で記述するのは @docs/ 以下の文書と `messages/ja.json` のみ
  - 日本語を検索する正規表現は `[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠ー]`
- 英語で考えても良いが、ユーザとの応答は必ず **日本語で対応** せよ
- **不確かな情報は必ず確認してから回答** せよ（特に日付、バージョン情報、コマンド名など）
  - 現在は2025年9月、Claude Codeの知識はここから2年ほど古い
  - ユーザから提示されたURLは必ず参照せよ
  - Playwright, Context 7, Serena等のMCPを積極的に活用せよ
- **作業前に必ずGitブランチを作成** せよ
  - Issue番号がある場合: `{0埋め3桁のIssue番号}_機能名` 形式でブランチを作成
  - 例: Issue #19の場合は `019_prepare_github_actions` のようなブランチ名
  - mainブランチで直接作業することは厳禁
- **既存の実装パターンを必ず確認** せよ
  - 新しい機能を追加する前に、必ず既存コードの実装パターンを確認すること

## 開発コマンド

### 基本的な開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー（ビルド後の確認）
npm run preview

# 型チェック
npm run check
npm run check:watch  # ウォッチモード

# コードフォーマット
npm run format       # 自動整形
npm run lint        # フォーマットチェック＆ESLint

# テスト実行
npm run test        # 全テスト実行
npm run test:unit   # ユニットテストのみ
npm run test:e2e    # E2Eテストのみ
```

### データベース関連

```bash
# Drizzle Kit コマンド
npm run db:generate        # マイグレーション生成
npm run db:migrate:local   # ローカルD1にマイグレーション適用
npm run db:migrate:remote  # リモートD1にマイグレーション適用
npm run db:migrate:preview # プレビューD1にマイグレーション適用
npm run db:studio          # Drizzle Studio起動
```

データベースはCloudflare D1を使用。
ローカル開発では自動的にD1エミュレーションが有効になります。

### UI開発

```bash
# Storybook
npm run storybook        # Storybook開発サーバー起動
npm run build-storybook  # Storybookビルド
```

## アーキテクチャ

### ディレクトリ構造

- `src/routes/` - SvelteKitのページとルーティング
- `src/lib/` - 共通ライブラリとコンポーネント
  - `server/` - サーバーサイドコード
    - `db/` - データベース関連（Drizzle ORM）
    - `auth.ts` - 認証ロジック（Lucia Auth）
  - `paraglide/` - 国際化（i18n）ファイル
  - `assets/` - 静的アセット
- `src/stories/` - Storybookコンポーネント
- `.storybook/` - Storybook設定

### 技術スタック

- **フレームワーク**: SvelteKit v5 + Svelte v5
- **スタイリング**: Tailwind CSS v4（ `@tailwindcss/vite` プラグイン経由）
- **データベース**: Cloudflare D1
- **ストレージ**: Cloudflare R2（予定）
- **認証**: Lucia Auth（ `src/lib/server/auth.ts` ）
- **国際化**: Paraglide（日本語・英語対応）
- **テスト**:
  - ユニットテスト: Vitest（ブラウザ環境とNode環境を分離）
  - E2Eテスト: Playwright
- **Markdown**: MDsveX（ `.svx` ファイルサポート）
- **デプロイ**: Cloudflare Workers

### 重要な設定ファイル

- `svelte.config.js` - SvelteKit設定（MDsveX、アダプター）
- `vite.config.ts` - Vite設定（Tailwind、Paraglide、テスト設定）
- `drizzle.config.ts` - データベーススキーマ設定
- `tsconfig.json` - TypeScript設定（strict mode有効）

### データベーススキーマ

`src/lib/server/db/schema.ts` に定義:

現在のスキーマ（デモ用）:

- `user` テーブル - ユーザー情報（id、username、passwordHash等）
- `session` テーブル - セッション管理

今後実装予定のスキーマ:

- ユーザ情報 (有料/無料)
- 水槽情報
- 生体情報
- メンテナンス記録（水換え、給餌、清掃等）
- 水質パラメータ記録
- 画像

### テスト設定

Vitestは2つのプロジェクトで構成:

1. **client** - ブラウザ環境でSvelteコンポーネントをテスト（ `.svelte.test.ts` 、 `.svelte.spec.ts` ）
2. **server** - Node環境でサーバーサイドコードをテスト

## 開発時の注意点

1. **型安全性**: TypeScriptのstrict modeが有効
2. **国際化**: Paraglideを使用、メッセージは `src/lib/paraglide/messages/` に配置
3. **コミット**: Commitizen friendly、GitHub flowに準拠
4. **認証**: platformベースの認証システム
5. **データベース**: Cloudflare D1を使用、環境変数は不要
6. **デプロイ**: `@sveltejs/adapter-cloudflare` を使用、Cloudflare Workersにデプロイ

## リファレンス

- [SvelteKit v5](https://svelte.jp/docs/kit/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)
- [Svelte-UX](https://svelte-ux.techniq.dev)
- [LayerChart](https://www.layerchart.com)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Cloudflare D1](https://developers.cloudflare.com/d1/)
- [Cloudflare R2](https://developers.cloudflare.com/r2/)
- [drizzle](https://orm.drizzle.team/docs/overview)
