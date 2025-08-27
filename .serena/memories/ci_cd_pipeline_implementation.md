# CI/CD Pipeline Implementation Details

## 実装内容

### GitHub Actions Workflows

- **ci.yml**: PRトリガーのCI（lint, format, test, build, preview deploy）
- **deploy.yml**: mainブランチへのpush時の本番デプロイ
- **setup-node-env**: 共通のNode.js環境セットアップ用Composite Action

### 重要な技術的決定

1. **Node.js Version**: v24を使用（次期LTS）

2. **Cloudflare Workers選択理由**:
   - 当初はCloudflare Pagesを想定
   - Workersの方がエッジコンピューティングに適している
   - D1データベースとの統合が容易

3. **Paraglide問題の解決**:
   - 問題: CI環境でParaglideファイルが生成されない
   - 原因: Paraglideファイルはビルド時に生成される
   - 解決: 型チェック前にビルドを実行するよう順序変更

4. **データベース戦略**:
   - Cloudflare D1を選択（Cloudflareエコシステムに統合）
   - 現状: libsql/clientでダミーURL使用
   - 今後: Issue #29でD1への移行を実施

### 環境変数管理

- Cloudflareダッシュボードで管理（コードにハードコードしない）
- 必要なSecrets（未設定）:
  - CLOUDFLARE_API_TOKEN
  - CLOUDFLARE_ACCOUNT_ID
  - CLOUDFLARE_ACCOUNT_SUBDOMAIN

### プレビュー環境

- PR毎に自動デプロイ
- URL形式: <https://aqua-note-pr-{PR番号}.{subdomain}.workers.dev>
