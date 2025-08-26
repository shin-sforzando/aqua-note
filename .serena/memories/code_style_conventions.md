# コードスタイル・規約

## TypeScript設定

- **strict mode**: 有効（厳密な型チェック）
- **moduleResolution**: bundler
- **esModuleInterop**: true
- **forceConsistentCasingInFileNames**: true（ファイル名の大文字小文字を厳密にチェック）

## Prettierフォーマット設定

- **useTabs**: true（タブ使用）
- **singleQuote**: true（シングルクォート使用）
- **trailingComma**: none（末尾カンマなし）
- **printWidth**: 100（1行の最大文字数）
- **Svelteファイル**: prettier-plugin-svelteで自動フォーマット

## ファイル命名規則

- **コンポーネント**: PascalCase（例: `UserProfile.svelte`）
- **ユーティリティ**: camelCase（例: `formatDate.ts`）
- **ルート**: kebab-case（例: `user-settings`）
- **テストファイル**: `*.test.ts` または `*.spec.ts`

## ディレクトリ構造規則

- **ページ**: `src/routes/` 配下に配置
- **共通コンポーネント**: `src/lib/components/` 配下
- **サーバーサイドコード**: `src/lib/server/` 配下
- **型定義**: 各モジュールと同じディレクトリに配置

## インポート規則

- **パスエイリアス**: `$lib/` を使用（src/lib/へのエイリアス）
- **相対パス**: 同一ディレクトリ内のみ使用
- **絶対パス**: `$lib/` を活用して可読性向上

## Svelte/SvelteKit規約

- **Svelte 5**: 新しいRunes構文を使用
- **レイアウト**: `+layout.svelte` でレイアウト定義
- **ページ**: `+page.svelte` でページコンポーネント定義
- **サーバーサイド**: `+page.server.ts` でサーバーサイド処理
- **型定義**: `+page.ts` で型定義とデータローディング

## Git規約

- **ブランチ名**:
  - Issue有り: `{0埋め3桁のIssue番号}_機能名`
  - Issue無し: `feature/機能名` or `fix/バグ名`
- **コミットメッセージ**: Commitizen friendly
  - `feat:` 新機能
  - `fix:` バグ修正
  - `docs:` ドキュメント
  - `style:` フォーマット修正
  - `refactor:` リファクタリング
  - `test:` テスト
  - `chore:` ビルド・補助ツール

## テスト規約

- **ユニットテスト**: Vitest使用
  - Svelteコンポーネント: `.svelte.test.ts` または `.svelte.spec.ts`
  - サーバーサイド: 通常の `.test.ts` または `.spec.ts`
- **E2Eテスト**: Playwright使用
  - `e2e/` ディレクトリに配置

## 国際化（i18n）

- **Paraglide**使用
- メッセージファイルは `messages/` に配置
- 日本語・英語対応を前提に開発

## セキュリティ

- **認証**: Lucia Auth使用
- **パスワード**: argon2でハッシュ化
- **環境変数**: `.env` ファイルで管理（`.env.example` を参考）
- **シークレット**: 絶対にコミットしない

## コメント

- **コメント追加禁止**: CLAUDE.mdの指示により、特に要求されない限りコメントは追加しない
- 必要な説明は変数名・関数名で表現
