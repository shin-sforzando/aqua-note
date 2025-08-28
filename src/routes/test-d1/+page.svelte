<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container">
	<h1>D1 Database Connection Test (with HMR!)</h1>

	<div class="status {data.d1Status}">
		<h2>Status: {data.d1Status}</h2>
		<p>{data.message}</p>
		<p class="timestamp">Checked at: {data.timestamp}</p>
	</div>

	{#if data.d1Status === 'connected'}
		<div class="success">✅ D1 database binding is working correctly!</div>
	{:else}
		<div class="error">❌ D1 database connection failed</div>
	{/if}
</div>

<style>
	.container {
		max-width: 600px;
		margin: 2rem auto;
		padding: 2rem;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}

	h1 {
		color: #333;
		margin-bottom: 2rem;
	}

	.status {
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	.status.connected {
		background-color: #d4edda;
		border: 1px solid #c3e6cb;
		color: #155724;
	}

	.status.error {
		background-color: #f8d7da;
		border: 1px solid #f5c6cb;
		color: #721c24;
	}

	.timestamp {
		font-size: 0.9rem;
		opacity: 0.8;
		margin-top: 0.5rem;
	}

	.success {
		font-size: 1.2rem;
		color: #28a745;
		font-weight: bold;
	}

	.error {
		font-size: 1.2rem;
		color: #dc3545;
		font-weight: bold;
	}
</style>
