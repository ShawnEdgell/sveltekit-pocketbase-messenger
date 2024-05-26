<!-- src/routes/+page.svelte -->
<script>
	import { user } from '$lib/stores/auth';
</script>

<div class="text-center">
	{#if $user}
		<p class="text-lg">Welcome, <span class="font-bold">{$user.email}</span>!</p>
	{:else}
		<p class="text-lg">Please <a href="/login" class="text-blue-500 underline">log in</a>.</p>
	{/if}
</div>
