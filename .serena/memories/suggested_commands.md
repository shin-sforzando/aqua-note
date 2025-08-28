# 開発コマンド一覧

## 基本的な開発コマンド

### 開発サーバー

```bash
npm run dev              # 開発サーバー起動（http://localhost:5173）
npm run dev:wrangler     # Wrangler開発サーバー（Cloudflare Workers環境）
npm run preview          # ビルド後のプレビュー
```

### ビルド

```bash
npm run build            # 本番用ビルド
```

### 型チェック・検証

```bash
npm run check            # 型チェック実行
npm run check:watch      # 型チェック（ウォッチモード）
```

### コードフォーマット・リント

```bash
npm run format           # Prettierで自動整形
npm run lint             # フォーマットチェック＆ESLint実行
```

### テスト

```bash
npm run test             # 全テスト実行（ユニット＋E2E）
npm run test:unit        # ユニットテストのみ（Vitest）
npm run test:e2e         # E2Eテストのみ（Playwright）
```

## データベース関連（Cloudflare D1）

### Drizzle Kit コマンド

```bash
npm run db:generate           # マイグレーション生成
npm run db:migrate:local      # ローカルD1にマイグレーション適用
npm run db:migrate:remote     # リモートD1にマイグレーション適用  
npm run db:migrate:preview    # プレビュー環境D1にマイグレーション適用
npm run db:studio             # Drizzle Studio起動（DBをGUIで確認）
```

## デプロイ

```bash
npm run deploy:preview        # プレビュー環境にデプロイ
npm run deploy:production     # 本番環境にデプロイ
```

## UI開発

### Storybook

```bash
npm run storybook             # Storybook開発サーバー起動（http://localhost:6006）
npm run build-storybook       # Storybookビルド
```

## システムコマンド（Darwin/macOS）

### ファイル操作

```bash
ls -la                        # ファイル一覧（隠しファイル含む）
cd {directory}                # ディレクトリ移動
pwd                          # 現在のディレクトリパス表示
```

### 検索

```bash
find . -name "*.ts"          # ファイル名で検索
grep -r "keyword" .          # 内容で検索
```

### プロセス確認

```bash
ps aux | grep node           # Node.jsプロセス確認
lsof -i :5173                # ポート5173使用プロセス確認
```

## タスク完了時の必須コマンド

タスク完了時は必ず以下のコマンドを実行して問題がないことを確認:

```bash
# 1. コードフォーマット
npm run format

# 2. リントチェック
npm run lint

# 3. 型チェック
npm run check

# 4. テスト実行
npm run test
```

これらのコマンドが全てパスすることを確認してからコミットすること。
