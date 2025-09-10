<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Badge } from '$lib/components/ui/badge';

	const { Story } = defineMeta({
		title: 'Components/UI/Badge',
		component: Badge,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['default', 'secondary', 'destructive', 'outline']
			},
			href: {
				control: 'text'
			}
		}
	});
</script>

<Story name="Default" args={{ variant: 'default' }}>
	{#snippet template(args)}
		<Badge {...args}>Badge</Badge>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Badge variant="default">Default</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="destructive">Destructive</Badge>
			<Badge variant="outline">Outline</Badge>
		</div>
	{/snippet}
</Story>

<Story name="As Link">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Badge href="#" variant="default">Link Badge</Badge>
			<Badge href="#" variant="secondary">Secondary Link</Badge>
			<Badge href="#" variant="outline">Outline Link</Badge>
		</div>
	{/snippet}
</Story>

<Story name="With Icons">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Badge variant="default">
				<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				Success
			</Badge>
			<Badge variant="destructive">
				<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				Error
			</Badge>
			<Badge variant="secondary">
				<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				Info
			</Badge>
		</div>
	{/snippet}
</Story>

<Story name="Count Badges">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Badge variant="default">1</Badge>
			<Badge variant="secondary">12</Badge>
			<Badge variant="outline">99+</Badge>
			<Badge variant="destructive">New</Badge>
		</div>
	{/snippet}
</Story>

<Story name="Status Indicators">
	{#snippet template()}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="text-sm font-medium">System Status:</span>
				<Badge variant="default">Online</Badge>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-sm font-medium">Water Quality:</span>
				<Badge variant="secondary">Good</Badge>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-sm font-medium">Filter Status:</span>
				<Badge variant="destructive">Needs Cleaning</Badge>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-sm font-medium">Temperature:</span>
				<Badge variant="outline">Normal</Badge>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Aquarium Tags">
	{#snippet template()}
		<div class="space-y-4">
			<div>
				<h4 class="text-sm font-semibold mb-2">Maintenance Tasks</h4>
				<div class="flex flex-wrap gap-2">
					<Badge variant="default">Water Change</Badge>
					<Badge variant="secondary">Filter Clean</Badge>
					<Badge variant="outline">Temperature Check</Badge>
					<Badge variant="default">Feeding</Badge>
				</div>
			</div>
			<div>
				<h4 class="text-sm font-semibold mb-2">Fish Species</h4>
				<div class="flex flex-wrap gap-2">
					<Badge variant="outline">Tropical</Badge>
					<Badge variant="outline">Freshwater</Badge>
					<Badge variant="outline">Community Tank</Badge>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
