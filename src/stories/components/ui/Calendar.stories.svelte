<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Calendar } from '$lib/components/ui/calendar';
	import { today, getLocalTimeZone, isWeekend } from '@internationalized/date';

	const { Story } = defineMeta({
		title: 'Components/UI/Calendar',
		component: Calendar,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			captionLayout: {
				control: 'select',
				options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years']
			},
			buttonVariant: {
				control: 'select',
				options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
			},
			weekdayFormat: {
				control: 'select',
				options: ['narrow', 'short', 'long']
			},
			locale: {
				control: 'select',
				options: ['en-US', 'ja-JP', 'fr-FR', 'de-DE', 'es-ES']
			},
			disableDaysOutsideMonth: {
				control: 'boolean'
			}
		}
	});

	// Helper functions for date examples
	const todayDate = today(getLocalTimeZone());
	const placeholderDate = todayDate.subtract({ days: 10 }); // Use a date that's not today
	const nextMonth = todayDate.add({ months: 1 });
	const lastWeek = todayDate.subtract({ weeks: 1 });
</script>

<Story name="Default (Single Date)">
	{#snippet template()}
		<div class="space-y-4">
			<h3 class="text-lg font-semibold">Single Date Selection</h3>
			<Calendar
				type="single"
				captionLayout="label"
				placeholder={placeholderDate}
				class="rounded-md border shadow"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Multiple Selection">
	{#snippet template()}
		<div class="space-y-4">
			<h3 class="text-lg font-semibold">Multiple Date Selection</h3>
			<Calendar type="multiple" placeholder={placeholderDate} class="rounded-md border shadow" />
		</div>
	{/snippet}
</Story>

<Story name="Dropdown Navigation">
	{#snippet template()}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-2">
				<h4 class="font-medium">Month & Year Dropdowns</h4>
				<Calendar
					type="single"
					captionLayout="dropdown"
					placeholder={placeholderDate}
					class="rounded-md border shadow"
				/>
			</div>
			<div class="space-y-2">
				<h4 class="font-medium">Month Dropdown Only</h4>
				<Calendar
					type="single"
					captionLayout="dropdown-months"
					placeholder={placeholderDate}
					class="rounded-md border shadow"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Button Variants">
	{#snippet template()}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="space-y-2">
				<h4 class="font-medium">Default Buttons</h4>
				<Calendar
					type="single"
					buttonVariant="default"
					placeholder={placeholderDate}
					class="rounded-md border shadow"
				/>
			</div>
			<div class="space-y-2">
				<h4 class="font-medium">Outline Buttons</h4>
				<Calendar
					type="single"
					buttonVariant="outline"
					placeholder={placeholderDate}
					class="rounded-md border shadow"
				/>
			</div>
			<div class="space-y-2">
				<h4 class="font-medium">Ghost Buttons</h4>
				<Calendar
					type="single"
					buttonVariant="ghost"
					placeholder={placeholderDate}
					class="rounded-md border shadow"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Disabled Dates">
	{#snippet template()}
		<div class="flex flex-col items-center space-y-4 p-4">
			<h3 class="text-lg font-semibold text-center">Calendar with Disabled Weekends</h3>
			<Calendar
				type="single"
				placeholder={placeholderDate}
				isDateDisabled={(date) => isWeekend(date, 'en-US')}
				class="rounded-md border shadow"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Min/Max Date Range">
	{#snippet template()}
		<div class="flex flex-col items-center space-y-4 p-4">
			<h3 class="text-lg font-semibold text-center">Limited Date Range</h3>
			<p class="text-sm text-muted-foreground text-center max-w-md">
				Only dates from last week to next month are selectable
			</p>
			<Calendar
				type="single"
				placeholder={placeholderDate}
				minValue={lastWeek}
				maxValue={nextMonth}
				class="rounded-md border shadow"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Locale Variations">
	{#snippet template()}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="space-y-2">
				<h4 class="font-medium">Japanese Locale</h4>
				<Calendar
					type="single"
					locale="ja-JP"
					placeholder={placeholderDate}
					captionLayout="dropdown"
					class="rounded-md border shadow"
				/>
			</div>
			<div class="space-y-2">
				<h4 class="font-medium">English Locale</h4>
				<Calendar
					type="single"
					locale="en-US"
					placeholder={placeholderDate}
					captionLayout="dropdown"
					class="rounded-md border shadow"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Pre-selected Dates">
	{#snippet template()}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<div class="space-y-2">
				<h4 class="font-medium">Pre-selected Single Date</h4>
				<Calendar
					type="single"
					value={todayDate}
					placeholder={placeholderDate}
					class="rounded-md border shadow"
				/>
			</div>
			<div class="space-y-2">
				<h4 class="font-medium">Pre-selected Multiple Dates</h4>
				<Calendar
					type="multiple"
					value={[todayDate, todayDate.add({ days: 3 }), todayDate.add({ days: 7 })]}
					placeholder={placeholderDate}
					class="rounded-md border shadow"
				/>
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Custom Styling">
	{#snippet template()}
		<div class="space-y-4">
			<h3 class="text-lg font-semibold">Custom Styled Calendar</h3>
			<Calendar
				type="single"
				placeholder={placeholderDate}
				captionLayout="dropdown"
				buttonVariant="outline"
				class="rounded-lg border-2 border-primary/20 shadow-lg bg-gradient-to-br from-background to-muted/30"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Mobile View" globals={{ viewport: { value: 'mobile1', isRotated: false } }}>
	{#snippet template()}
		<div class="w-full max-w-sm mx-auto space-y-4">
			<h3 class="text-lg font-semibold text-center">Mobile Calendar</h3>
			<Calendar
				type="single"
				placeholder={placeholderDate}
				captionLayout="dropdown"
				class="rounded-md border shadow w-full"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Tablet View" globals={{ viewport: { value: 'tablet', isRotated: false } }}>
	{#snippet template()}
		<div class="w-full max-w-md mx-auto space-y-4">
			<h3 class="text-lg font-semibold text-center">Tablet Calendar (Multiple Selection)</h3>
			<Calendar
				type="multiple"
				placeholder={placeholderDate}
				captionLayout="dropdown"
				class="rounded-md border shadow"
			/>
		</div>
	{/snippet}
</Story>

<Story name="Accessibility Example">
	{#snippet template()}
		<div class="flex flex-col items-center space-y-4 p-4">
			<h3 class="text-lg font-semibold text-center">Accessible Calendar</h3>
			<p class="text-sm text-muted-foreground text-center max-w-md">
				This calendar includes proper ARIA labels and keyboard navigation support
			</p>
			<Calendar
				type="single"
				placeholder={placeholderDate}
				captionLayout="dropdown"
				class="rounded-md border shadow focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
			/>
			<div class="text-xs text-muted-foreground space-y-1 max-w-md text-center">
				<p>• Use Tab/Shift+Tab to navigate between elements</p>
				<p>• Use Arrow keys to navigate between dates</p>
				<p>• Use Enter/Space to select dates</p>
				<p>• Use Page Up/Down to navigate months</p>
			</div>
		</div>
	{/snippet}
</Story>
