# CI/CD Pipeline

## 実装内容

### GitHub Actions Workflows

- **ci.yml**: PRトリガーのCI（lint, format, test, build, preview deploy）
- **deploy.yml**: mainブランチへのpush時の本番デプロイ
- **cleanup-pr-workers.yml**: PR閉鎖時のCloudflare Workersクリーンアップ
- **claude-*.yml**: Claude Code関連の自動化ワークフロー群
- **setup-node-env**: 共通のNode.js環境セットアップ用Composite Action

### PR環境の自動管理

#### プレビュー環境

- **作成**: PR毎に自動デプロイ
- **URL形式**: `https://aqua-note-pr-{PR番号}.{subdomain}.workers.dev`
- **削除**: PR閉鎖時に自動クリーンアップ（2025年8月30日実装）

#### クリーンアップ機能の詳細

- **トリガー**: `pull_request.closed`イベント
- **削除対象**:
  - Cloudflare Worker: `aqua-note-pr-{PR番号}`
  - GitHub Deployments: `pr-{PR番号}`環境のデプロイメント履歴
- **エラー処理**: `continue-on-error`で既に削除済みの場合も正常継続
- **通知**: 成功・失敗の明確な状況報告

### 重要な技術的決定

1. **Node.js Version**: v24を使用（次期LTS）

2. **Cloudflare Workers選択理由**:
   - 当初はCloudflare Pagesを想定していたが、2025年現在非推奨
   - Workersの方がエッジコンピューティングに適している
     - cf. <https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/#compatibility-matrix>
   - D1データベースとの統合が容易

3. **Paraglide問題の解決**:
   - 問題: CI環境でParaglideファイルが生成されない
   - 原因: Paraglideファイルはビルド時に生成される
   - 解決: 型チェック前にビルドを実行するよう順序変更

4. **データベース戦略**:
   - Cloudflare D1を選択
   - D1への移行完了
   - platformProxyによるHMR対応済み

### 環境変数管理

- Cloudflareダッシュボードで管理（コードにハードコードしない）
- 必要なSecrets:
  - CLOUDFLARE_API_TOKEN（設定済み）
  - CLOUDFLARE_ACCOUNT_ID（設定済み）
  - CLOUDFLARE_ACCOUNT_SUBDOMAIN（設定済み）

### 今後の改善点

1. **モニタリング強化**: デプロイメント失敗時の詳細ログ
2. **セキュリティ**: シークレットの定期ローテーション
3. **パフォーマンス**: ビルド時間の最適化検討
4. **通知**: Slack/Discord等への通知統合検討
