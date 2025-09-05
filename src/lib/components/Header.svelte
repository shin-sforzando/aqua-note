<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<header class="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo and brand -->
			<div class="flex items-center space-x-4">
				<a href="/" class="flex items-center space-x-2">
					<img src="/logo.svg" alt="Aqua Note Logo" class="w-8 h-8" />
					<span class="text-xl font-bold text-primary">Aqua Note</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden md:flex items-center space-x-8">
				<!-- Navigation items removed as requested -->
			</nav>

			<!-- Action buttons -->
			<div class="hidden md:flex items-center space-x-3">
				<Button variant="ghost" size="sm">Login</Button>
				<Button size="sm">Sign Up</Button>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<Button variant="ghost" size="icon" aria-label="Open menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</Button>
			</div>
		</div>
	</div>

	<!-- Mobile Navigation Menu (simplified) -->
	<div class="md:hidden border-t border-border bg-background/95 backdrop-blur-sm hidden">
		<div class="px-4 py-4 space-y-2">
			<Button variant="ghost" size="sm" class="w-full justify-start">Login</Button>
			<Button size="sm" class="w-full">Sign Up</Button>
		</div>
	</div>
</header>
