<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<main class="flex-grow">
		{@render children?.()}
	</main>
	<footer class="w-full py-8 text-center text-sm text-gray-600">
		<p>&copy; 2025 Aqua Note. All rights reserved.</p>
		<p class="mt-2">
			<a
				href="https://github.com/shin-sforzando/aqua-note"
				class="text-blue-600 hover:text-blue-700 underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
			</a>
		</p>
	</footer>
</div>
