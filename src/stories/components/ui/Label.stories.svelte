<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	const { Story } = defineMeta({
		title: 'Components/UI/Label',
		component: Label,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div class="space-y-2">
			<Label>Default Label</Label>
		</div>
	{/snippet}
</Story>

<Story name="With Input">
	{#snippet template()}
		<div class="w-80 space-y-2">
			<Label for="username">Username</Label>
			<Input id="username" type="text" placeholder="Enter your username" />
		</div>
	{/snippet}
</Story>

<Story name="Form Example">
	{#snippet template()}
		<form class="w-80 space-y-4">
			<div class="space-y-2">
				<Label for="form-email">Email Address</Label>
				<Input id="form-email" type="email" placeholder="Enter your email" />
			</div>
			<div class="space-y-2">
				<Label for="form-password">Password</Label>
				<Input id="form-password" type="password" placeholder="Enter your password" />
			</div>
			<div class="space-y-2">
				<Label for="form-bio">Bio</Label>
				<textarea
					id="form-bio"
					placeholder="Tell us about yourself"
					class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				></textarea>
			</div>
		</form>
	{/snippet}
</Story>

<Story name="Required Field">
	{#snippet template()}
		<div class="w-80 space-y-2">
			<Label for="required-field">
				Required Field
				<span class="text-destructive">*</span>
			</Label>
			<Input id="required-field" type="text" placeholder="This field is required" required />
		</div>
	{/snippet}
</Story>

<Story name="Label Styling">
	{#snippet template()}
		<div class="w-80 space-y-6">
			<div class="space-y-2">
				<Label for="default-style">Default Style</Label>
				<Input id="default-style" type="text" placeholder="Input field" />
			</div>
			<div class="space-y-2">
				<Label for="medium-style" class="text-base font-semibold">Medium Style</Label>
				<Input id="medium-style" type="text" placeholder="Input field" />
			</div>
			<div class="space-y-2">
				<Label for="large-style" class="text-lg font-bold">Large Style</Label>
				<Input id="large-style" type="text" placeholder="Input field" />
			</div>
			<div class="space-y-2">
				<Label for="colored-style" class="text-primary font-medium">Colored Style</Label>
				<Input id="colored-style" type="text" placeholder="Input field" />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Checkbox & Radio Labels">
	{#snippet template()}
		<div class="space-y-6">
			<div class="space-y-3">
				<h4 class="font-medium">Checkbox Options</h4>
				<div class="space-y-2">
					<div class="flex items-center space-x-2">
						<input
							id="terms"
							type="checkbox"
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<Label for="terms">I agree to the terms and conditions</Label>
					</div>
					<div class="flex items-center space-x-2">
						<input
							id="newsletter"
							type="checkbox"
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<Label for="newsletter">Subscribe to newsletter</Label>
					</div>
				</div>
			</div>

			<div class="space-y-3">
				<h4 class="font-medium">Radio Options</h4>
				<div class="space-y-2">
					<div class="flex items-center space-x-2">
						<input
							id="option1"
							name="options"
							type="radio"
							class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<Label for="option1">Option 1</Label>
					</div>
					<div class="flex items-center space-x-2">
						<input
							id="option2"
							name="options"
							type="radio"
							class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<Label for="option2">Option 2</Label>
					</div>
					<div class="flex items-center space-x-2">
						<input
							id="option3"
							name="options"
							type="radio"
							class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
						<Label for="option3">Option 3</Label>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
