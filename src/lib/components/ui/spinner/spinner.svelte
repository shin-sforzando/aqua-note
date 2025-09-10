<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const spinnerVariants = tv({
		base: 'animate-spin rounded-full border-solid',
		variants: {
			variant: {
				default: 'border-gray-200 border-t-primary',
				water: 'border-cyan-100 border-t-cyan-500'
			},
			size: {
				sm: 'h-4 w-4 border-2',
				md: 'h-6 w-6 border-2',
				lg: 'h-8 w-8 border-4',
				xl: 'h-12 w-12 border-4'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'md'
		}
	});

	export type SpinnerVariant = VariantProps<typeof spinnerVariants>['variant'];
	export type SpinnerSize = VariantProps<typeof spinnerVariants>['size'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		size = 'md',
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: SpinnerVariant;
		size?: SpinnerSize;
	} = $props();
</script>

<div
	bind:this={ref}
	class={cn('inline-block', spinnerVariants({ variant, size }), className)}
	role="status"
	aria-label="Loading"
	{...restProps}
>
	<span class="sr-only">Loading...</span>
</div>
