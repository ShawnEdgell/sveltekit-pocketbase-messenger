<!-- src/routes/+layout.svelte -->
<script>
	import { user, logout } from '$lib/stores/auth';
	import '../app.css';
</script>

<div class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
	<nav class="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-8">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold">MyApp</h1>
			<div>
				{#if $user}
					<a href="/messages" class="btn btn-primary mr-2">Messages</a>
					<button on:click={logout} class="btn btn-secondary">Logout</button>
				{:else}
					<a href="/login" class="btn btn-primary">Login</a>
					<a href="/register" class="btn btn-secondary">Register</a>
				{/if}
			</div>
		</div>
	</nav>

	<main class="w-full max-w-md bg-white shadow-md rounded-lg p-4">
		<slot></slot>
	</main>
</div>
