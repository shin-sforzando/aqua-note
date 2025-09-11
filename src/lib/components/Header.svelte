<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Menu } from '@lucide/svelte';

	let mobileMenuOpen = $state(false);
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
				<Sheet.Root bind:open={mobileMenuOpen}>
					<Sheet.Trigger>
						<Button variant="ghost" size="icon" aria-label="Open menu">
							<Menu class="w-6 h-6" />
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="right" class="w-[300px] sm:w-[400px]">
						<Sheet.Header>
							<Sheet.Title>Menu</Sheet.Title>
						</Sheet.Header>
						<div class="flex flex-col space-y-4 mt-6">
							<!-- Action buttons -->
							<div class="flex flex-col space-y-3">
								<h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
									Account
								</h3>
								<Button
									variant="ghost"
									class="justify-start"
									onclick={() => (mobileMenuOpen = false)}
								>
									Login
								</Button>
								<Button class="justify-start" onclick={() => (mobileMenuOpen = false)}>
									Sign Up
								</Button>
							</div>
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</div>
</header>
