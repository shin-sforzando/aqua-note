# Aqua Note デザインガイドライン

## 概要

このドキュメントは、Aqua Noteのビジュアルデザインと UI/UX の一貫性を保つためのガイドラインです。
Tailwind CSS、Svelte-UX、LayerChartを効果的に組み合わせて使用することを前提としています。

## 現在の実装状況

**重要**: 現在のUIは仮実装です。Coming Soonページ（`/src/routes/+page.svelte`）に全てのコードが統合されています。
これはIssue #10でSvelte-UXを正式導入するまでの一時的な実装であり、YAGNI原則に基づいた判断です。

## デザイン原則

### 1. 水をテーマにした流動的なデザイン

- グラデーションを活用した深みのある表現
- 透明感のある要素（backdrop-blur、opacity）
- 波や泡などの自然なモーション

### 2. シンプルで直感的

- 明確な情報階層
- 余白を活かしたレイアウト
- アクションが予測可能なUI

### 3. アクセシビリティファースト

- 十分なコントラスト比
- キーボードナビゲーション対応
- スクリーンリーダー対応

## カラーパレット

### プライマリカラー（水・海）

```css
--color-primary-50: #ecfeff;   /* cyan-50 */
--color-primary-100: #cffafe;  /* cyan-100 */
--color-primary-200: #a5f3fc;  /* cyan-200 */
--color-primary-300: #67e8f9;  /* cyan-300 */
--color-primary-400: #22d3ee;  /* cyan-400 */
--color-primary-500: #06b6d4;  /* cyan-500 */
--color-primary-600: #0891b2;  /* cyan-600 */
--color-primary-700: #0e7490;  /* cyan-700 */
--color-primary-800: #155e75;  /* cyan-800 */
--color-primary-900: #164e63;  /* cyan-900 */
```

### セカンダリカラー（深海）

```css
--color-secondary-50: #eff6ff;   /* blue-50 */
--color-secondary-100: #dbeafe;  /* blue-100 */
--color-secondary-200: #bfdbfe;  /* blue-200 */
--color-secondary-300: #93c5fd;  /* blue-300 */
--color-secondary-400: #60a5fa;  /* blue-400 */
--color-secondary-500: #3b82f6;  /* blue-500 */
--color-secondary-600: #2563eb;  /* blue-600 */
--color-secondary-700: #1d4ed8;  /* blue-700 */
--color-secondary-800: #1e40af;  /* blue-800 */
--color-secondary-900: #1e3a8a;  /* blue-900 */
```

### グラデーション

```css
/* 背景用グラデーション */
--gradient-background: from-cyan-50 via-blue-50 to-blue-100;

/* アクセント用グラデーション */
--gradient-accent: from-blue-400 to-cyan-500;
--gradient-accent-hover: from-blue-500 to-cyan-600;

/* ボタン・バッジ用グラデーション */
--gradient-button: from-blue-500 to-cyan-500;
```

## タイポグラフィ

### フォントファミリー

- 見出し: システムフォント（日本語優先）
- 本文: システムフォント
- コード: 等幅フォント

### サイズスケール

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

## スペーシング

Tailwind CSSのデフォルトスケールを使用:

- `space-1`: 0.25rem (4px)
- `space-2`: 0.5rem (8px)
- `space-3`: 0.75rem (12px)
- `space-4`: 1rem (16px)
- `space-6`: 1.5rem (24px)
- `space-8`: 2rem (32px)
- `space-12`: 3rem (48px)

## コンポーネントパターン

### カード

```svelte
<div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
  <!-- コンテンツ -->
</div>
```

### グラデーションボタン

```svelte
<button class="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all">
  ボタンテキスト
</button>
```

### バッジ

```svelte
<span class="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold">
  BADGE TEXT
</span>
```

### アイコン付きリスト項目

```svelte
<div class="flex items-start space-x-3">
  <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0">
    <!-- アイコン -->
  </svg>
  <div>
    <h3 class="font-semibold text-gray-800">見出し</h3>
    <p class="text-sm text-gray-600">説明文</p>
  </div>
</div>
```

## レスポンシブデザイン

### ブレークポイント

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### モバイルファーストの実装例

```svelte
<div class="text-base md:text-lg lg:text-xl">
  <!-- モバイルでtext-base、タブレットでtext-lg、デスクトップでtext-xl -->
</div>
```

## Svelte-UX統合ガイドライン

### コンポーネント使用時の注意点

1. Svelte-UXのテーマ設定とTailwindクラスの併用
2. カスタムCSSプロパティでカラーを統一
3. モーション設定の一貫性

### 推奨される組み合わせ

```svelte
<script>
  import { Button, Card } from 'svelte-ux';
</script>

<!-- Svelte-UXコンポーネントにTailwindクラスを適用 -->
<Card class="bg-gradient-to-b from-cyan-50 to-blue-50">
  <Button 
    variant="filled"
    class="bg-gradient-to-r from-blue-500 to-cyan-500"
  >
    アクション
  </Button>
</Card>
```

## LayerChart統合ガイドライン

### グラフカラーパレット

```javascript
const chartColors = {
  primary: ['#06b6d4', '#0891b2', '#0e7490'], // cyan系
  secondary: ['#3b82f6', '#2563eb', '#1d4ed8'], // blue系
  gradient: [
    'url(#gradient-cyan)', // SVGグラデーション参照
    'url(#gradient-blue)'
  ]
};
```

### グラフスタイル

```svelte
<script>
  import { Chart, Axis, Line, Area } from 'layerchart';
</script>

<Chart
  data={data}
  x="date"
  y="value"
  padding={{ top: 20, bottom: 20 }}
>
  <defs>
    <linearGradient id="gradient-cyan" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.1" />
    </linearGradient>
  </defs>
  
  <Area
    fill="url(#gradient-cyan)"
    class="opacity-60"
  />
  <Line
    stroke="#06b6d4"
    strokeWidth={2}
  />
</Chart>
```

## アニメーション

### トランジション

```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
```

### Svelte組み込みトランジション

```svelte
<script>
  import { fade, fly, slide } from 'svelte/transition';
</script>

{#if visible}
  <div transition:fade={{ duration: 300 }}>
    <!-- コンテンツ -->
  </div>
{/if}
```

## アクセシビリティ

### コントラスト比

- 通常テキスト: 最小4.5:1
- 大きいテキスト（18pt以上）: 最小3:1
- UIコンポーネント: 最小3:1

### セマンティックHTML

- 適切な見出し階層（h1 → h2 → h3）
- ランドマーク要素（header、main、footer、nav）
- フォーム要素のラベル付け

### ARIA属性

```svelte
<button 
  aria-label="メニューを開く"
  aria-expanded={isOpen}
  aria-controls="menu"
>
  <!-- アイコン -->
</button>
```

## 実装例: Coming Soonページの分解

### 構造

```plain
1. 背景レイヤー
   - グラデーション背景
   - アニメーション要素（泡など）

2. コンテンツレイヤー
   - ロゴセクション
   - メインカード
     - バッジ
     - 見出し
     - 説明文
     - 機能リスト
     - プラン比較

3. フッター
```

### コンポーネント化の例

```svelte
<!-- GradientBackground.svelte -->
<div class="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-blue-100">
  <slot />
</div>

<!-- FeatureCard.svelte -->
<div class="flex items-start space-x-3">
  <slot name="icon" />
  <div>
    <h3 class="font-semibold text-gray-800">
      <slot name="title" />
    </h3>
    <p class="text-sm text-gray-600">
      <slot name="description" />
    </p>
  </div>
</div>
```

## ダークモード対応（将来実装）

### カラー変数の定義

```css
:root {
  --bg-primary: white;
  --text-primary: #1f2937;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
}
```

### Tailwind設定での対応

```svelte
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <!-- コンテンツ -->
</div>
```

## まとめ

このガイドラインは、Aqua Noteの視覚的一貫性を保ちながら、将来的な拡張にも対応できる柔軟な設計を目指しています。
新しいコンポーネントを作成する際は、必ずこのガイドラインを参照し、既存のデザインパターンとの整合性を確認してください。

### チェックリスト

- [ ] カラーパレットに準拠している
- [ ] レスポンシブデザインに対応している
- [ ] アクセシビリティ要件を満たしている
- [ ] 既存コンポーネントとの一貫性がある
- [ ] Svelte-UX/LayerChartとの互換性を考慮している
