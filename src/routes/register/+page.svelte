<!-- src/routes/register/+page.svelte -->
<script>
	import { register } from '$lib/stores/auth';
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let errorMessage = '';

	async function handleRegister() {
		try {
			await register(email, password, passwordConfirm);
			// Redirect to the login page after successful registration
			window.location.href = '/login';
		} catch (error) {
			console.error('Registration failed', error);
			errorMessage = 'Registration failed. Please try again.';
		}
	}
</script>

<div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
	{#if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{/if}
	<form class="space-y-4" on:submit|preventDefault={handleRegister}>
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
		<div>
			<label class="block text-sm font-medium mb-1" for="passwordConfirm">Confirm Password</label>
			<input
				id="passwordConfirm"
				type="password"
				bind:value={passwordConfirm}
				placeholder="Confirm Password"
				class="input input-bordered w-full"
			/>
		</div>
		<div class="flex justify-between items-center">
			<button type="submit" class="btn btn-primary">Register</button>
			<a href="/login" class="btn btn-secondary">Login</a>
		</div>
	</form>
</div>
