---
name: issue-prioritizer
description: GitHub Issueを分析して次に着手すべきタスクを検討する
---

# Issue Prioritizer

プロジェクトのGitHub Issueを分析し、次に着手すべきタスクを推奨します。

## 必須要件

1. **全Issue分析**: `gh issue list --state open --limit 100` で取得した全Issueを分析すること
2. **データベース**: Issue本文の「## 優先度」セクションの数値（0.0-1.0）を使用すること
3. **件数明記**: 分析したIssue総数を必ず報告すること

## 分析手順

### 1. データ収集

```bash
# 現在の状態確認
git branch --show-current
git status
git log --oneline -5

# Issue取得（**必ず --limit 100 を指定**）
gh issue list --state open --limit 100 --json number,title,body > issues.json

# 件数確認
cat issues.json | jq 'length'

# 優先度抽出
cat issues.json | jq -r '.[] | {number, title, priority: (.body | match("優先度[\\s\\S]*?([0-9]\\.[0-9]+)") | .captures[0].string // "未設定")}'
```

### 2. 優先順位決定

優先度値（0.0-1.0）が高い順に並べる。同一優先度の場合:

- 他Issueの前提条件となるものを優先
- 現在のフェーズ目標に合致するものを優先
- 技術的依存関係を考慮

### 3. 推奨生成

上位3-5個のIssueについて:

- Issue番号とタイトル
- 優先度値（数値で明記）
- 選定理由（依存関係、ブロッカー解除効果など）
- 実装順序の依存関係図

## 出力テンプレート

```markdown
## 分析結果

**分析対象**: XX件のOPENなIssue

### 推奨タスク

1. **Issue #XX: [タイトル]**
   - 優先度: X.XX
   - 理由: [具体的な理由]

2. **Issue #YY: [タイトル]**
   - 優先度: X.XX
   - 理由: [具体的な理由]
