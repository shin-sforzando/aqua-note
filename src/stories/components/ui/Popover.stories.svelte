<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	const { Story } = defineMeta({
		title: 'Components/UI/Popover',
		component: Popover.Popover,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Popover.Root>
			<Popover.Trigger>
				<Button variant="outline">Open popover</Button>
			</Popover.Trigger>
			<Popover.Content class="w-80">
				<div class="grid gap-4">
					<div class="space-y-2">
						<h4 class="font-medium leading-none">Popover Title</h4>
						<p class="text-sm text-muted-foreground">This is a popover with some content inside.</p>
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	{/snippet}
</Story>

<Story name="With Form">
	{#snippet template()}
		<Popover.Root>
			<Popover.Trigger>
				<Button variant="outline">Update dimensions</Button>
			</Popover.Trigger>
			<Popover.Content class="w-80">
				<div class="grid gap-4">
					<div class="space-y-2">
						<h4 class="font-medium leading-none">Dimensions</h4>
						<p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
					</div>
					<div class="grid gap-2">
						<div class="grid grid-cols-3 items-center gap-4">
							<Label for="width">Width</Label>
							<Input id="width" value="100%" class="col-span-2 h-8" />
						</div>
						<div class="grid grid-cols-3 items-center gap-4">
							<Label for="maxWidth">Max. width</Label>
							<Input id="maxWidth" value="300px" class="col-span-2 h-8" />
						</div>
						<div class="grid grid-cols-3 items-center gap-4">
							<Label for="height">Height</Label>
							<Input id="height" value="25px" class="col-span-2 h-8" />
						</div>
						<div class="grid grid-cols-3 items-center gap-4">
							<Label for="maxHeight">Max. height</Label>
							<Input id="maxHeight" value="none" class="col-span-2 h-8" />
						</div>
					</div>
				</div>
			</Popover.Content>
		</Popover.Root>
	{/snippet}
</Story>

<Story name="Positioning">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">Top</Button>
				</Popover.Trigger>
				<Popover.Content side="top" class="w-64">
					<p class="text-sm">Popover positioned on top</p>
				</Popover.Content>
			</Popover.Root>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">Right</Button>
				</Popover.Trigger>
				<Popover.Content side="right" class="w-64">
					<p class="text-sm">Popover positioned on the right</p>
				</Popover.Content>
			</Popover.Root>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">Bottom</Button>
				</Popover.Trigger>
				<Popover.Content side="bottom" class="w-64">
					<p class="text-sm">Popover positioned on the bottom</p>
				</Popover.Content>
			</Popover.Root>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">Left</Button>
				</Popover.Trigger>
				<Popover.Content side="left" class="w-64">
					<p class="text-sm">Popover positioned on the left</p>
				</Popover.Content>
			</Popover.Root>
		</div>
	{/snippet}
</Story>

<Story name="Alignment">
	{#snippet template()}
		<div class="flex flex-wrap gap-4">
			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">Start Align</Button>
				</Popover.Trigger>
				<Popover.Content align="start" class="w-64">
					<p class="text-sm">Popover aligned to start</p>
				</Popover.Content>
			</Popover.Root>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">Center Align</Button>
				</Popover.Trigger>
				<Popover.Content align="center" class="w-64">
					<p class="text-sm">Popover aligned to center</p>
				</Popover.Content>
			</Popover.Root>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="outline">End Align</Button>
				</Popover.Trigger>
				<Popover.Content align="end" class="w-64">
					<p class="text-sm">Popover aligned to end</p>
				</Popover.Content>
			</Popover.Root>
		</div>
	{/snippet}
</Story>
