<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	const { Story } = defineMeta({
		title: 'Components/UI/Input',
		component: Input,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			type: {
				control: 'select',
				options: [
					'text',
					'email',
					'password',
					'number',
					'tel',
					'url',
					'search',
					'date',
					'datetime-local',
					'time'
				]
			},
			disabled: {
				control: 'boolean'
			},
			placeholder: {
				control: 'text'
			}
		}
	});

	let inputValue = $state('');
	let emailValue = $state('');
	let passwordValue = $state('');
	let numberValue = $state('');
	let searchValue = $state('');
</script>

<Story name="Default">
	{#snippet template()}
		<div class="w-80 space-y-2">
			<Input placeholder="Enter text..." />
		</div>
	{/snippet}
</Story>

<Story name="With Label">
	{#snippet template()}
		<div class="w-80 space-y-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="Enter your email..." />
		</div>
	{/snippet}
</Story>

<Story name="Input Types">
	{#snippet template()}
		<div class="w-80 space-y-4">
			<div class="space-y-2">
				<Label for="text-input">Text Input</Label>
				<Input id="text-input" type="text" placeholder="Enter text..." bind:value={inputValue} />
				<p class="text-xs text-muted-foreground">Value: {inputValue}</p>
			</div>
			<div class="space-y-2">
				<Label for="email-input">Email Input</Label>
				<Input id="email-input" type="email" placeholder="Enter email..." bind:value={emailValue} />
				<p class="text-xs text-muted-foreground">Value: {emailValue}</p>
			</div>
			<div class="space-y-2">
				<Label for="password-input">Password Input</Label>
				<Input
					id="password-input"
					type="password"
					placeholder="Enter password..."
					bind:value={passwordValue}
				/>
			</div>
			<div class="space-y-2">
				<Label for="number-input">Number Input</Label>
				<Input
					id="number-input"
					type="number"
					placeholder="Enter number..."
					bind:value={numberValue}
				/>
				<p class="text-xs text-muted-foreground">Value: {numberValue}</p>
			</div>
			<div class="space-y-2">
				<Label for="search-input">Search Input</Label>
				<Input id="search-input" type="search" placeholder="Search..." bind:value={searchValue} />
				<p class="text-xs text-muted-foreground">Value: {searchValue}</p>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Date Inputs">
	{#snippet template()}
		<div class="w-80 space-y-4">
			<div class="space-y-2">
				<Label for="date-input">Date Input</Label>
				<Input id="date-input" type="date" />
			</div>
			<div class="space-y-2">
				<Label for="datetime-input">DateTime Local Input</Label>
				<Input id="datetime-input" type="datetime-local" />
			</div>
			<div class="space-y-2">
				<Label for="time-input">Time Input</Label>
				<Input id="time-input" type="time" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="States">
	{#snippet template()}
		<div class="w-80 space-y-4">
			<div class="space-y-2">
				<Label for="default-input">Default</Label>
				<Input id="default-input" placeholder="Default input..." />
			</div>
			<div class="space-y-2">
				<Label for="disabled-input">Disabled</Label>
				<Input id="disabled-input" placeholder="Disabled input..." disabled />
			</div>
			<div class="space-y-2">
				<Label for="value-input">With Value</Label>
				<Input id="value-input" value="Pre-filled value" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Sizing">
	{#snippet template()}
		<div class="w-full max-w-4xl space-y-6">
			<div class="space-y-2">
				<Label for="small-input">Small (w-48 = 192px)</Label>
				<Input id="small-input" placeholder="Small input..." class="w-48" />
				<p class="text-xs text-muted-foreground">Width: 12rem (192px)</p>
			</div>
			<div class="space-y-2">
				<Label for="medium-input">Medium (w-80 = 320px)</Label>
				<Input id="medium-input" placeholder="Medium input..." class="w-80" />
				<p class="text-xs text-muted-foreground">Width: 20rem (320px)</p>
			</div>
			<div class="space-y-2">
				<Label for="large-input">Large (w-96 = 384px)</Label>
				<Input id="large-input" placeholder="Large input..." class="w-96" />
				<p class="text-xs text-muted-foreground">Width: 24rem (384px)</p>
			</div>
			<div class="space-y-2">
				<Label for="full-input">Full Width (w-full = 100%)</Label>
				<Input id="full-input" placeholder="Full width input..." class="w-full max-w-2xl" />
				<p class="text-xs text-muted-foreground">Width: 100% (max-width: 42rem for demo)</p>
			</div>
			<div class="space-y-2">
				<Label for="custom-input">Custom Width (w-64 = 256px)</Label>
				<Input id="custom-input" placeholder="Custom width input..." class="w-64" />
				<p class="text-xs text-muted-foreground">Width: 16rem (256px)</p>
			</div>
		</div>
	{/snippet}
</Story>
