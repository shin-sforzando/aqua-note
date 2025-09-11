<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Footer from '$lib/components/Footer.svelte';

	const { Story } = defineMeta({
		title: 'Components/Footer',
		component: Footer,
		parameters: {
			layout: 'fullscreen'
		},
		tags: ['autodocs']
	});
</script>

<Story name="Default" />

<Story name="Mobile View" globals={{ viewport: { value: 'mobile1', isRotated: false } }} />

<Story name="Tablet View" globals={{ viewport: { value: 'tablet', isRotated: false } }} />
