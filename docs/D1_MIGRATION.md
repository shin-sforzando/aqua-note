# Cloudflare D1 移行完了ドキュメント

## 概要

SQLite/libsqlからCloudflare D1への移行が正常に完了しました。
このドキュメントは、新しいD1ベースのデータベースアーキテクチャで作業するための包括的なガイドです。

## 主な変更点

### 1. データベース技術

- **移行前**: libsqlクライアントを使用したSQLite
- **移行後**: Cloudflare D1（サーバーレスSQLite）

### 2. 開発環境

- **移行前**: ローカルSQLiteファイル
- **移行後**: platformProxyサポート付きwranglerによるD1エミュレーション

### 3. 設定

- **移行前**: `DATABASE_URL` 環境変数
- **移行後**: `wrangler.toml` のD1バインディング

## アーキテクチャ

### プラットフォームベースのデータベースアクセス

すべてのデータベース操作は `platform` オブジェクトを経由します:

```typescript
// src/lib/server/db/index.ts
export function getDb(platform: App.Platform) {
	if (!platform?.env?.aqua_note_db) {
		throw new Error('D1 database binding not found');
	}
	return drizzle(platform.env.aqua_note_db, { schema });
}
```

### データベースバインディング

`wrangler.toml` で設定:

```toml
# デフォルト（開発/本番）
[[d1_databases]]
binding = "aqua_note_db"
database_name = "aqua-note-db"
database_id = "a7f03bf7-852c-444a-8505-33f1a4edae52"

# プレビュー環境
[[env.preview.d1_databases]]
binding = "aqua_note_db"
database_name = "aqua-note-preview-db"
database_id = "899aa230-eb69-47a8-bb3f-bf7ec92fa398"
```

## 開発ワークフロー

### HMR付きローカル開発

`platformProxy` 設定により、完全なHMRサポート付きでVite devを使用できます:

```bash
# HMRとD1付きで開発サーバーを起動
npm run dev

# 代替: wranglerを直接使用（HMRなし）
npm run dev:wrangler
```

### データベースマイグレーション

```bash
# マイグレーションファイルの生成
npm run db:generate

# ローカルD1に適用
npm run db:migrate:local

# リモートD1に適用（本番）
npm run db:migrate:remote

# プレビュー環境に適用
npm run db:migrate:preview
```

### デプロイ

```bash
# プレビュー環境にデプロイ
npm run deploy:preview

# 本番環境にデプロイ
npm run deploy:production
```

## データベースアクセス

### ローカル開発

ローカルD1データベースは `.wrangler/state/v3/d1/` ディレクトリに保存されます。

### 外部SQLクライアント

TablePlusや他のSQLクライアントで接続する場合:

1. ローカルデータベースのエクスポート:

   ```bash
   npx wrangler d1 export aqua-note-db --local --output local.db
   ```

2. SQLクライアントで `local.db` を開く

3. リモートデータベースの直接検査:

   ```bash
   npx wrangler d1 execute aqua-note-db --remote --command "SELECT * FROM user"
   ```

## テスト

### ユニットテスト

- Vitest用のプラットフォームモッキングが設定済み
- 例: `src/lib/server/auth.spec.ts`

### E2Eテスト

- 完全なD1統合テスト
- 例: `e2e/d1-connection.test.ts`

## トラブルシューティング

### よくある問題

1. **「D1 database binding not found」エラー**
   - `npm run dev` を使用していることを確認（`vite dev` を直接実行しない）
   - `wrangler.toml` の設定を確認

2. **HMRが動作しない**
   - `svelte.config.js` で `platformProxy` が設定されていることを確認
   - 開発サーバーを再起動

3. **マイグレーション失敗**
   - 正しい環境をターゲットにしていることを確認
   - `wrangler.toml` でデータベースIDが一致していることを確認

### 環境固有のコマンド

```bash
# 利用可能なデータベースを確認
npx wrangler d1 list

# マイグレーション履歴を表示
npx wrangler d1 migrations list aqua-note-db --local
npx wrangler d1 migrations list aqua_note_db --env preview --remote
```

## CI/CD統合

GitHub ActionsワークフローはすでにD1で動作するよう設定済み:

- プレビューデプロイはプレビューD1データベースを使用
- 本番デプロイは本番D1データベースを使用

## D1の利点

1. **エッジでのゼロレイテンシデータベースアクセス**
2. **Cloudflareネットワーク全体での自動レプリケーション**
3. **組み込みバックアップ**とポイントインタイムリカバリ
4. **コネクションプーリング不要**
5. **Cloudflare Workersとのシームレスな統合**

## 移行のロールバック

必要に応じて、以前のSQLite/libsql実装を復元できます:

1. gitコミットのリバート
2. `DATABASE_URL` 環境変数の復元
3. `wrangler.toml` からD1バインディングを削除

ただし、D1は優れたパフォーマンスと統合を提供するため、これは推奨されません。

## リソース

- [Cloudflare D1 ドキュメント](https://developers.cloudflare.com/d1/)
- [Drizzle ORM D1 ガイド](https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit)
- [SvelteKit Cloudflare アダプター](https://svelte.dev/docs/kit/adapter-cloudflare)

## サポート

問題や質問がある場合:

1. このドキュメントを確認
2. D1ステータスを確認: <https://www.cloudflarestatus.com/>
3. リポジトリにissueを作成
