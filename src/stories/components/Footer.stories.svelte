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

<Story name="Mobile View" parameters={{ viewport: { defaultViewport: 'mobile1' } }} />

<Story name="Tablet View" parameters={{ viewport: { defaultViewport: 'tablet' } }} />
