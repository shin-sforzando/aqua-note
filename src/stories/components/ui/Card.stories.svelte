<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	const { Story } = defineMeta({
		title: 'Components/UI/Card',
		component: Card.Root,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Card.Root class="w-80">
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
			</Card.Header>
			<Card.Content>
				<p>Card content goes here. This is a simple card component.</p>
			</Card.Content>
		</Card.Root>
	{/snippet}
</Story>

<Story name="With Description">
	{#snippet template()}
		<Card.Root class="w-96">
			<Card.Header>
				<Card.Title>Project Setup</Card.Title>
				<Card.Description>Deploy your new project in one-click.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="project-name">Project name</Label>
						<Input id="project-name" placeholder="Enter project name" />
					</div>
					<div class="space-y-2">
						<Label for="project-desc">Description</Label>
						<Input id="project-desc" placeholder="Enter description" />
					</div>
				</div>
			</Card.Content>
			<Card.Footer>
				<div class="flex justify-between w-full">
					<Button variant="outline">Cancel</Button>
					<Button>Deploy</Button>
				</div>
			</Card.Footer>
		</Card.Root>
	{/snippet}
</Story>

<Story name="Simple Card">
	{#snippet template()}
		<Card.Root class="w-80">
			<Card.Content>
				<div class="space-y-4">
					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full"></div>
						<div>
							<h3 class="font-semibold">John Doe</h3>
							<p class="text-sm text-muted-foreground">Software Engineer</p>
						</div>
					</div>
					<p class="text-sm">Building amazing user experiences with modern web technologies.</p>
				</div>
			</Card.Content>
		</Card.Root>
	{/snippet}
</Story>

<Story name="Stats Card">
	{#snippet template()}
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
			<Card.Root>
				<Card.Content>
					<div class="text-center space-y-2">
						<div class="text-2xl font-bold text-blue-600">24°C</div>
						<p class="text-sm text-muted-foreground">Water Temperature</p>
						<Badge variant="default">Normal</Badge>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Content>
					<div class="text-center space-y-2">
						<div class="text-2xl font-bold text-green-600">7.2</div>
						<p class="text-sm text-muted-foreground">pH Level</p>
						<Badge variant="secondary">Good</Badge>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Content>
					<div class="text-center space-y-2">
						<div class="text-2xl font-bold text-orange-600">3 days</div>
						<p class="text-sm text-muted-foreground">Last Water Change</p>
						<Badge variant="outline">Due Soon</Badge>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	{/snippet}
</Story>

<Story name="Aquarium Tank Card">
	{#snippet template()}
		<Card.Root class="w-96">
			<Card.Header>
				<div class="flex items-start justify-between">
					<div>
						<Card.Title>Tropical Community Tank</Card.Title>
						<Card.Description>75 gallon freshwater aquarium</Card.Description>
					</div>
					<Badge variant="default">Active</Badge>
				</div>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<p class="text-sm font-medium">Temperature</p>
							<p class="text-2xl font-bold text-blue-600">76°F</p>
						</div>
						<div>
							<p class="text-sm font-medium">pH Level</p>
							<p class="text-2xl font-bold text-green-600">7.0</p>
						</div>
					</div>
					<div>
						<p class="text-sm font-medium mb-2">Fish Species</p>
						<div class="flex flex-wrap gap-1">
							<Badge variant="outline">Neon Tetra</Badge>
							<Badge variant="outline">Angelfish</Badge>
							<Badge variant="outline">Corydoras</Badge>
						</div>
					</div>
				</div>
			</Card.Content>
			<Card.Footer>
				<div class="flex gap-2 w-full">
					<Button variant="outline" class="flex-1">View Details</Button>
					<Button class="flex-1">Maintenance</Button>
				</div>
			</Card.Footer>
		</Card.Root>
	{/snippet}
</Story>

<Story name="Maintenance Log Card">
	{#snippet template()}
		<Card.Root class="w-96">
			<Card.Header>
				<Card.Title>Recent Maintenance</Card.Title>
				<Card.Description>Last 7 days</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-3">
					<div class="flex items-center justify-between p-2 border rounded">
						<div class="flex items-center space-x-3">
							<div class="w-2 h-2 bg-blue-500 rounded-full"></div>
							<div>
								<p class="text-sm font-medium">Water Change</p>
								<p class="text-xs text-muted-foreground">25% water changed</p>
							</div>
						</div>
						<Badge variant="secondary">3 days ago</Badge>
					</div>
					<div class="flex items-center justify-between p-2 border rounded">
						<div class="flex items-center space-x-3">
							<div class="w-2 h-2 bg-green-500 rounded-full"></div>
							<div>
								<p class="text-sm font-medium">Filter Cleaning</p>
								<p class="text-xs text-muted-foreground">Mechanical filter cleaned</p>
							</div>
						</div>
						<Badge variant="secondary">1 week ago</Badge>
					</div>
					<div class="flex items-center justify-between p-2 border rounded">
						<div class="flex items-center space-x-3">
							<div class="w-2 h-2 bg-orange-500 rounded-full"></div>
							<div>
								<p class="text-sm font-medium">Feeding</p>
								<p class="text-xs text-muted-foreground">Daily feeding routine</p>
							</div>
						</div>
						<Badge variant="default">Today</Badge>
					</div>
				</div>
			</Card.Content>
		</Card.Root>
	{/snippet}
</Story>

<Story name="Card Sizes">
	{#snippet template()}
		<div class="space-y-4">
			<Card.Root class="w-64">
				<Card.Content>
					<p class="text-sm">Small card (w-64)</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="w-96">
				<Card.Content>
					<p class="text-sm">Medium card (w-96)</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="w-full max-w-2xl">
				<Card.Content>
					<p class="text-sm">Large card (w-full max-w-2xl)</p>
				</Card.Content>
			</Card.Root>
		</div>
	{/snippet}
</Story>
