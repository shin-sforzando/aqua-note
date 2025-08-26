# 🐠 Aqua Note Development Roadmap

## 開発フェーズ

```mermaid
gantt
    title Aqua Note 開発フェーズ（時期は目安）
    dateFormat X
    axisFormat %s

    section Phase 1
    基盤構築           :done,    p1, 0, 1
    CI/CDセットアップ   :done,    p1a, 0, 1

    section Phase 2
    認証・基本機能      :active,  p2, 1, 2
    カレンダービュー    :active,  p2a, 1, 2

    section Phase 3
    記録機能実装       :         p3, 3, 2
    アルファ版         :crit,    milestone, 5, 0

    section Phase 4
    データ可視化       :         p4, 5, 2
    ベータ版          :crit,    milestone, 7, 0

    section Phase 5
    機能拡充          :         p5, 7, 2
    正式版            :crit,    milestone, 9, 0

    section Phase 6
    有料機能          :         p6, 9, 2
    Premium版         :crit,    milestone, 11, 0
```

## 機能比較マトリックス

```mermaid
flowchart LR
    subgraph 無料版[無料アカウント]
        F1[水槽管理<br/>1つまで]
        F2[メンテナンス記録]
        F3[水質パラメータ]
        F4[グラフ表示]
        F5[写真1枚]
        F6[シェア機能]
    end

    subgraph 有料版[有料アカウント]
        P1[水槽管理<br/>無制限]
        P2[全メンテナンス機能]
        P3[高度な分析]
        P4[詳細グラフ]
        P5[アルバム機能]
        P6[リマインダー]
        P7[複数ユーザー]
    end

    F1 -.アップグレード.-> P1
    F5 -.アップグレード.-> P5
    F2 -.アップグレード.-> P6
```

## マイルストーン詳細

### 📍 Phase 1: 基盤構築

- ✅ CI/CDパイプライン（GitHub Actions → Cloudflare Pages）
- ✅ Coming Soonページ公開
- ✅ ランディングページ（水中の泡アニメーション）
- ✅ SEO基盤（OGP、sitemap.xml、構造化データ）
- ✅ 法的文書（利用規約、プライバシーポリシー）

### 📍 Phase 2: コアMVP

- 🔄 認証システム（ユーザー登録・ログイン）
- 🔄 カレンダービューコンポーネント
- 🔄 水槽管理基本機能（1つのみ）
- 🔄 国際化対応（日本語・英語）

### 📍 Phase 3: 記録機能（アルファ版）

- ⏳ メンテナンス記録（水換え、給餌、フィルター交換等）
- ⏳ カレンダーでの記録表示
- ⏳ モバイル最適化
- ⏳ **アルファ版として限定公開**

### 📍 Phase 4: データ可視化（ベータ版）

- ⏳ 水質パラメータ記録
- ⏳ グラフ表示（LayerChart）
- ⏳ シェア機能
- ⏳ HTML埋め込みコード
- ⏳ **ベータ版として公開**

### 📍 Phase 5: 機能拡充（正式版）

- ⏳ 水槽写真保存（1枚）
- ⏳ 生体管理機能
- ⏳ データエクスポート（CSV/PDF）
- ⏳ **正式版（無料版）として公開**

### 📍 Phase 6: 有料機能

- ⏳ Stripe決済システム
- ⏳ 複数水槽管理
- ⏳ 高度なアルバム機能
- ⏳ リマインダー・通知機能
- ⏳ **有料プラン導入**

## コミュニケーション

- 📢 **進捗報告**: LPに記載
- 🐛 **バグ報告**: GitHub Issues
- 💡 **機能要望**: GitHub Discussions

---

_このロードマップは開発の進捗に応じて更新されます。最終更新: 2025年8月_
