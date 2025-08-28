<script lang="ts">
	// Coming Soon ページ - 仮実装
	// 将来的にSvelte-UXを導入時にコンポーネント化予定
</script>

<svelte:head>
	<title>Aqua Note - 水槽管理をもっとシンプルに</title>
	<meta
		name="description"
		content="Aqua Noteは、アクアリウム愛好家のための水槽管理アプリです。水換えや給餌などのメンテナンス記録を簡単に管理できます。まもなく公開予定。"
	/>
	<meta property="og:title" content="Aqua Note - 水槽管理をもっとシンプルに" />
	<meta
		property="og:description"
		content="アクアリウム愛好家のための水槽管理アプリ。まもなく公開予定。"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Aqua Note" />
	<meta property="og:url" content="https://aqua-note.app" />
	<meta property="og:image" content="https://aqua-note.app/og-image.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Aqua Note - 水槽管理をもっとシンプルに" />
	<meta
		name="twitter:description"
		content="アクアリウム愛好家のための水槽管理アプリ。まもなく公開予定。"
	/>
	<meta name="twitter:image" content="https://aqua-note.app/og-image.png" />
</svelte:head>

<div
	class="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-blue-100 flex items-center justify-center px-4"
>
	<div class="text-center max-w-4xl mx-auto">
		<!-- ロゴエリア -->
		<div class="mb-8">
			<img src="/logo.svg" alt="Aqua Note Logo" class="w-32 h-32 mx-auto mb-4" />
			<h1
				class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 mb-4"
			>
				Aqua Note
			</h1>
			<p class="text-xl md:text-2xl text-gray-700">水槽管理をもっとシンプルに</p>
		</div>

		<!-- Coming Soon カード -->
		<div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
			<span
				class="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold mb-6"
			>
				COMING SOON
			</span>

			<h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">まもなく公開予定</h2>

			<p class="text-gray-600 mb-6 leading-relaxed">
				Aqua Noteは、熱帯魚などの飼育における水換えや給餌などの<br class="hidden md:inline" />
				メンテナンス作業を簡単に記録・管理できる<br class="hidden md:inline" />
				アクアリウム愛好家のためのWebアプリケーションです。
			</p>

			<p class="text-gray-600 mb-8 leading-relaxed">
				無料プランで基本機能をお使いいただけます。<br class="hidden md:inline" />
				より高度な機能をご利用になりたい方向けに、<br class="hidden md:inline" />
				有料プランもご用意する予定です。
			</p>

			<!-- 機能プレビュー -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8">
				<div class="flex items-start space-x-3">
					<svg
						class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<h3 class="font-semibold text-gray-800">水槽管理</h3>
						<p class="text-sm text-gray-600">複数の水槽を一元管理</p>
					</div>
				</div>

				<div class="flex items-start space-x-3">
					<svg
						class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/>
					</svg>
					<div>
						<h3 class="font-semibold text-gray-800">記録管理</h3>
						<p class="text-sm text-gray-600">メンテナンス履歴を記録</p>
					</div>
				</div>

				<div class="flex items-start space-x-3">
					<svg
						class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
					<div>
						<h3 class="font-semibold text-gray-800">データ分析</h3>
						<p class="text-sm text-gray-600">水質変化を可視化</p>
					</div>
				</div>
			</div>

			<!-- プラン予定 -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
				<div class="border border-gray-200 rounded-lg p-4">
					<h4 class="font-semibold text-gray-800 mb-2">無料プラン</h4>
					<ul class="text-sm text-gray-600 space-y-1">
						<li>・ 基本的な水槽管理</li>
						<li>・ メンテナンス記録</li>
						<li>・ シンプルなデータ表示</li>
					</ul>
				</div>
				<div class="border border-blue-300 rounded-lg p-4 bg-blue-50">
					<h4 class="font-semibold text-gray-800 mb-2">
						有料プラン
						<span class="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full ml-2">予定</span>
					</h4>
					<ul class="text-sm text-gray-600 space-y-1">
						<li>・ 複数の水槽管理</li>
						<li>・ リマインダー・通知</li>
						<li>・ 高度なアルバム機能</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
