<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Menu, Settings, User } from '@lucide/svelte';

	const { Story } = defineMeta({
		title: 'Components/UI/Sheet',
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<Sheet.Root>
		<Sheet.Trigger>
			<Button variant="outline">Open Sheet</Button>
		</Sheet.Trigger>
		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title>Sheet Title</Sheet.Title>
				<Sheet.Description>
					This is a basic sheet component that slides out from the side of the screen.
				</Sheet.Description>
			</Sheet.Header>
			<div class="py-4">
				<p class="text-sm text-muted-foreground">
					You can put any content here. This sheet is useful for navigation menus, forms, or
					detailed information panels.
				</p>
			</div>
			<Sheet.Footer>
				<Sheet.Close>
					<Button variant="outline">Close</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</Story>

<Story name="From Right">
	<Sheet.Root>
		<Sheet.Trigger>
			<Button variant="outline">
				<Menu class="w-4 h-4 mr-2" />
				Menu
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="right" class="w-[400px]">
			<Sheet.Header>
				<Sheet.Title>Navigation Menu</Sheet.Title>
			</Sheet.Header>
			<div class="flex flex-col space-y-3 py-4">
				<Button variant="ghost" class="justify-start">
					<User class="w-4 h-4 mr-2" />
					Profile
				</Button>
				<Button variant="ghost" class="justify-start">
					<Settings class="w-4 h-4 mr-2" />
					Settings
				</Button>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</Story>

<Story name="From Left">
	<Sheet.Root>
		<Sheet.Trigger>
			<Button variant="outline">Open from Left</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="w-[300px]">
			<Sheet.Header>
				<Sheet.Title>Left Panel</Sheet.Title>
				<Sheet.Description>Content slides in from the left side</Sheet.Description>
			</Sheet.Header>
			<div class="py-4">
				<p class="text-sm">This demonstrates a sheet opening from the left side.</p>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</Story>

<Story name="Mobile Navigation Example">
	<Sheet.Root>
		<Sheet.Trigger>
			<Button variant="ghost" size="icon" aria-label="Open mobile menu">
				<Menu class="w-6 h-6" />
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="right" class="w-[300px] sm:w-[400px]">
			<Sheet.Header>
				<Sheet.Title>Menu</Sheet.Title>
			</Sheet.Header>
			<div class="flex flex-col space-y-4 mt-6">
				<div class="flex flex-col space-y-3">
					<h3 class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
						Account
					</h3>
					<Button variant="ghost" class="justify-start">Login</Button>
					<Button class="justify-start">Sign Up</Button>
				</div>
			</div>
		</Sheet.Content>
	</Sheet.Root>
</Story>
