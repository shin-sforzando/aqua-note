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
				<div class="flex space-x-4">
					<a
						href="https://github.com/shin-sforzando/aqua-note"
						target="_blank"
						rel="noopener noreferrer"
						class="text-muted-foreground hover:text-foreground transition-colors"
						aria-label="GitHub"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
					</a>
				</div>
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
							href="/changelog"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Changelog
						</a>
					</li>
					<li>
						<a
							href="/roadmap"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Roadmap
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
							href="/docs"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Documentation
						</a>
					</li>
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
							href="/contact"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Contact
						</a>
					</li>
					<li>
						<a
							href="/community"
							class="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Community
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Bottom section -->
		<div class="border-t border-border py-6">
			<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				<p class="text-sm text-muted-foreground">© 2025 Aqua Note. All rights reserved.</p>
				<div class="flex space-x-6">
					<a
						href="/privacy"
						class="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						Privacy Policy
					</a>
					<a
						href="/terms"
						class="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						Terms of Service
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
