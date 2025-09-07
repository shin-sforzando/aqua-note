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

<Story name="Mobile View" parameters={{ viewport: { defaultViewport: 'mobile1' } }} />

<Story name="Tablet View" parameters={{ viewport: { defaultViewport: 'tablet' } }} />
