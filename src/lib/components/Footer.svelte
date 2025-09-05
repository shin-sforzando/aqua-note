<script lang="ts">
	// Footer component with consistent design system
</script>

<footer class="bg-muted/30 border-t border-border">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Main footer content -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
			<!-- Brand section -->
			<div class="md:col-span-2">
				<div class="flex items-center space-x-2 mb-4">
					<img src="/logo.svg" alt="Aqua Note Logo" class="w-8 h-8" />
					<span class="text-xl font-bold text-primary">Aqua Note</span>
				</div>
				<p class="text-muted-foreground mb-4 max-w-md">
					アクアリウム愛好家のための水槽管理アプリケーション。水換えや給餌などのメンテナンス作業を簡単に記録・管理できます。
				</p>
				<p class="text-sm text-muted-foreground">© 2025 Aqua Note. All rights reserved.</p>
			</div>

			<!-- Product links -->
			<div>
				<h3 class="text-sm font-semibold text-foreground mb-4">Product</h3>
				<ul class="space-y-3">
					<li>
						<a
							href="/features"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Features
						</a>
					</li>
					<li>
						<a
							href="/pricing"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Pricing
						</a>
					</li>
					<li>
						<a
							href="https://github.com/shin-sforzando/aqua-note"
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							GitHub
						</a>
					</li>
				</ul>
			</div>

			<!-- Support links -->
			<div>
				<h3 class="text-sm font-semibold text-foreground mb-4">Support</h3>
				<ul class="space-y-3">
					<li>
						<a
							href="/help"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Help Center
						</a>
					</li>
					<li>
						<a
							href="/privacy"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Privacy Policy
						</a>
					</li>
					<li>
						<a
							href="/terms"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Terms of Service
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
