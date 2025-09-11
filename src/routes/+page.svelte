<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
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
		<!-- Logo area -->
		<div class="mb-8">
			<img src="/logo.svg" alt="Aqua Note Logo" class="w-32 h-32 mx-auto mb-4" />
			<h1
				class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4"
			>
				Aqua Note
			</h1>
			<p class="text-xl md:text-2xl text-muted-foreground">水槽管理をもっとシンプルに</p>
		</div>

		<!-- Coming Soon card -->
		<Card class="backdrop-blur-sm shadow-xl">
			<CardHeader class="text-center">
				<Badge class="mx-auto mb-4 font-mono">COMING SOON</Badge>
				<CardTitle class="text-2xl md:text-3xl">まもなく公開予定</CardTitle>
				<CardDescription class="text-base leading-relaxed">
					Aqua Noteは、熱帯魚などの飼育における水換えや給餌などの<br class="hidden md:inline" />
					メンテナンス作業を簡単に記録・管理できる<br class="hidden md:inline" />
					アクアリウム愛好家のためのWebアプリケーションです。
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-muted-foreground mb-8 leading-relaxed text-center">
					無料プランで基本機能をお使いいただけます。<br class="hidden md:inline" />
					より高度な機能をご利用になりたい方向けに、<br class="hidden md:inline" />
					有料プランもご用意する予定です。
				</p>

				<!-- Feature preview -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<Card class="p-4">
						<CardContent class="flex items-start space-x-3 p-0">
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
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
								<h3 class="font-semibold text-card-foreground">水槽管理</h3>
								<p class="text-sm text-muted-foreground">複数の水槽を一元管理</p>
							</div>
						</CardContent>
					</Card>

					<Card class="p-4">
						<CardContent class="flex items-start space-x-3 p-0">
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
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
								<h3 class="font-semibold text-card-foreground">記録管理</h3>
								<p class="text-sm text-muted-foreground">メンテナンス履歴を記録</p>
							</div>
						</CardContent>
					</Card>

					<Card class="p-4">
						<CardContent class="flex items-start space-x-3 p-0">
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
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
								<h3 class="font-semibold text-card-foreground">データ分析</h3>
								<p class="text-sm text-muted-foreground">水質変化を可視化</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<!-- Planned pricing -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card>
						<CardHeader class="text-center">
							<CardTitle class="text-lg">無料プラン</CardTitle>
						</CardHeader>
						<CardContent>
							<ul class="text-sm text-muted-foreground space-y-1">
								<li>基本的な水槽管理</li>
								<li>メンテナンス記録</li>
								<li>シンプルなデータ表示</li>
							</ul>
						</CardContent>
					</Card>

					<Card class="border-primary/30 bg-primary/5">
						<CardHeader class="text-center">
							<CardTitle class="text-lg flex items-center justify-center gap-2">
								有料プラン
								<Badge variant="default" class="text-xs">予定</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul class="text-sm text-muted-foreground space-y-1">
								<li>複数の水槽管理</li>
								<li>リマインダー・通知</li>
								<li>高度なアルバム機能</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	</div>
</div>
