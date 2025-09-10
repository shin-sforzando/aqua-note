<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Header from '$lib/components/Header.svelte';

	const { Story } = defineMeta({
		title: 'Components/Header',
		component: Header,
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['autodocs']
	});
</script>

<Story name="Default" />

<Story name="Mobile View" globals={{ viewport: { value: 'mobile1', isRotated: false } }} />

<Story name="Tablet View" globals={{ viewport: { value: 'tablet', isRotated: false } }} />
