<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/ui/button/button.svelte';
	import { fn } from 'storybook/test';

	const { Story } = defineMeta({
		title: 'Components/UI/Button',
		component: Button,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
			},
			size: {
				control: 'select',
				options: ['default', 'sm', 'lg', 'icon']
			},
			disabled: {
				control: 'boolean'
			},
			href: {
				control: 'text'
			},
			type: {
				control: 'select',
				options: ['button', 'submit', 'reset']
			}
		},
		args: {
			onclick: fn()
		}
	});
</script>

<Story name="Default" args={{ variant: 'default' }}>
	{#snippet template(args)}
		<Button {...args}>Button</Button>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Button variant="default">Default</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
		</div>
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex flex-wrap items-center gap-4">
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
			<Button size="icon">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 5l7 7-7 7M5 5l7 7-7 7" />
				</svg>
			</Button>
		</div>
	{/snippet}
</Story>

<Story name="States">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Button>Normal</Button>
			<Button disabled>Disabled</Button>
		</div>
	{/snippet}
</Story>

<Story name="As Link">
	{#snippet template()}
		<Button href="https://example.com">Link Button</Button>
	{/snippet}
</Story>

<Story name="Mobile View" globals={{ viewport: { value: 'mobile1', isRotated: false } }}>
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4 w-full">
			<Button class="w-full">Full Width Button</Button>
			<div class="flex gap-2">
				<Button size="sm" class="flex-1">Cancel</Button>
				<Button variant="destructive" size="sm" class="flex-1">Delete</Button>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Tablet View" globals={{ viewport: { value: 'tablet', isRotated: false } }}>
	{#snippet template()}
		<div class="flex flex-wrap gap-4 p-6">
			<Button variant="default">Primary Action</Button>
			<Button variant="outline">Secondary Action</Button>
			<Button variant="ghost" size="icon">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</Button>
		</div>
	{/snippet}
</Story>

<Story name="Interactive Example">
	{#snippet template()}
		<div class="flex flex-col gap-4 p-4">
			<h3 class="text-lg font-semibold">Button Playground</h3>
			<div class="flex gap-2">
				<Button variant="default" onclick={() => alert('Default clicked!')}>Click Me</Button>
				<Button variant="outline" onclick={() => alert('Outline clicked!')}>Or Me</Button>
			</div>
		</div>
	{/snippet}
</Story>
