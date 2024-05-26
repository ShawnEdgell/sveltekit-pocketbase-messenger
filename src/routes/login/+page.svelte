<!-- src/routes/login/+page.svelte -->
<script>
	import { login } from '$lib/stores/auth';
	let email = '';
	let password = '';
	let errorMessage = '';

	async function handleLogin() {
		try {
			await login(email, password);
			// Redirect to the messages page after successful login
			window.location.href = '/messages';
		} catch (error) {
			console.error('Login failed', error);
			errorMessage = 'Login failed. Please check your credentials and try again.';
		}
	}
</script>

<div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
	{#if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{/if}
	<form class="space-y-4" on:submit|preventDefault={handleLogin}>
		<div>
			<label class="block text-sm font-medium mb-1" for="email">Email</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="Email"
				class="input input-bordered w-full"
			/>
		</div>
		<div>
			<label class="block text-sm font-medium mb-1" for="password">Password</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				placeholder="Password"
				class="input input-bordered w-full"
			/>
		</div>
		<div class="flex justify-between items-center">
			<button type="submit" class="btn btn-primary">Login</button>
			<a href="/register" class="btn btn-secondary">Register</a>
		</div>
	</form>
</div>
