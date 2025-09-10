<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Spinner } from '$lib/components/ui/spinner';

	const { Story } = defineMeta({
		title: 'Components/UI/Spinner',
		component: Spinner,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['default', 'water']
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl']
			}
		}
	});
</script>

<Story name="Default" args={{ variant: 'default', size: 'md' }}>
	{#snippet template(args)}
		<Spinner {...args} />
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template()}
		<div class="flex items-center gap-8">
			<div class="flex flex-col items-center gap-2">
				<Spinner size="sm" />
				<span class="text-xs text-muted-foreground">Small (sm)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Spinner size="md" />
				<span class="text-xs text-muted-foreground">Medium (md)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Spinner size="lg" />
				<span class="text-xs text-muted-foreground">Large (lg)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Spinner size="xl" />
				<span class="text-xs text-muted-foreground">Extra Large (xl)</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Variants">
	{#snippet template()}
		<div class="flex items-center gap-8">
			<div class="flex flex-col items-center gap-2">
				<Spinner variant="default" />
				<span class="text-xs text-muted-foreground">Default (一般的な用途)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Spinner variant="water" />
				<span class="text-xs text-muted-foreground">Water (水槽関連の処理)</span>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Aqua Theme Variants">
	{#snippet template()}
		<div class="space-y-6">
			<div class="p-6 bg-gradient-to-br from-cyan-50 via-blue-50 to-blue-100 rounded-lg">
				<h3 class="text-lg font-semibold mb-4 text-cyan-800">Water Theme Spinners</h3>
				<div class="flex items-center gap-6">
					<div class="flex flex-col items-center gap-2">
						<Spinner variant="water" size="lg" />
						<span class="text-sm text-cyan-700">水質データ読み込み中...</span>
					</div>
					<div class="flex flex-col items-center gap-2">
						<Spinner variant="default" size="lg" />
						<span class="text-sm text-gray-700">システム処理中...</span>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Loading States">
	{#snippet template()}
		<div class="space-y-6">
			<div class="border rounded-lg p-4">
				<div class="flex items-center gap-3">
					<Spinner size="sm" />
					<span class="text-sm">Connecting to aquarium sensors...</span>
				</div>
			</div>
			<div class="border rounded-lg p-4">
				<div class="flex items-center gap-3">
					<Spinner variant="water" size="sm" />
					<span class="text-sm">Analyzing water quality...</span>
				</div>
			</div>
			<div class="border rounded-lg p-4">
				<div class="flex items-center gap-3">
					<Spinner variant="default" size="sm" />
					<span class="text-sm">Updating fish feeding schedule...</span>
				</div>
			</div>
			<div class="border rounded-lg p-4">
				<div class="flex items-center gap-3">
					<Spinner variant="default" size="sm" />
					<span class="text-sm">Syncing maintenance records...</span>
				</div>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Button Loading">
	{#snippet template()}
		<div class="flex flex-col gap-4">
			<button
				class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md"
				disabled
			>
				<Spinner size="sm" />
				Loading...
			</button>
			<button
				class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-md"
				disabled
			>
				<Spinner variant="water" size="sm" />
				Analyzing Water
			</button>
			<button
				class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md"
				disabled
			>
				<Spinner variant="default" size="sm" />
				Processing
			</button>
		</div>
	{/snippet}
</Story>

<Story name="Card Loading">
	{#snippet template()}
		<div class="max-w-md space-y-4">
			<div class="border rounded-lg p-6">
				<div class="flex items-center justify-center py-8">
					<div class="flex flex-col items-center gap-3">
						<Spinner variant="water" size="lg" />
						<span class="text-sm text-muted-foreground">Loading aquarium data...</span>
					</div>
				</div>
			</div>
			<div class="border rounded-lg p-6">
				<div class="flex items-center justify-between">
					<div>
						<h3 class="font-semibold">Water Temperature</h3>
						<p class="text-sm text-muted-foreground">Current reading</p>
					</div>
					<Spinner variant="water" size="md" />
				</div>
			</div>
		</div>
	{/snippet}
</Story>
