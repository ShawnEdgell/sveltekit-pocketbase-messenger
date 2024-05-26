<script lang="ts">
	import { onMount } from 'svelte';
	import { user, updateUser } from '$lib/stores/auth';
	import { writable, get } from 'svelte/store';

	let username = writable<string>('');
	let name = writable<string>('');
	let email = writable<string>('');
	let created = writable<string>('');
	let updated = writable<string>('');

	onMount(() => {
		if ($user) {
			email.set($user.email);
			username.set($user.username || '');
			name.set($user.name || '');
			created.set($user.created);
			updated.set($user.updated);
		}
	});

	async function updateProfile() {
		try {
			const updatedUsername = get(username);
			const updatedName = get(name);

			if ($user) {
				await updateUser({
					username: updatedUsername,
					name: updatedName
				});
				alert('Profile updated successfully');
			} else {
				alert('No user logged in');
			}
		} catch (error) {
			console.error('Failed to update profile', error);
			alert('Failed to update profile');
		}
	}
</script>

{#if $user}
	<div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
		<h2 class="text-2xl font-bold mb-4">Profile</h2>
		<form on:submit|preventDefault={updateProfile} class="space-y-4">
			<div>
				<label class="block text-sm font-medium mb-1" for="email">Email</label>
				<input
					id="email"
					type="email"
					bind:value={$email}
					disabled
					class="input input-bordered w-full"
				/>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="username">Username</label>
				<input
					id="username"
					type="text"
					bind:value={$username}
					class="input input-bordered w-full"
				/>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="name">Name</label>
				<input id="name" type="text" bind:value={$name} class="input input-bordered w-full" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="created">Account Created</label>
				<input
					id="created"
					type="text"
					value={new Date($created).toLocaleString()}
					disabled
					class="input input-bordered w-full"
				/>
			</div>
			<div>
				<label class="block text-sm font-medium mb-1" for="updated">Last Updated</label>
				<input
					id="updated"
					type="text"
					value={new Date($updated).toLocaleString()}
					disabled
					class="input input-bordered w-full"
				/>
			</div>
			<button type="submit" class="btn btn-primary">Update Profile</button>
		</form>
	</div>
{:else}
	<p>Please <a href="/login" class="text-blue-500 underline">log in</a> to view your profile.</p>
{/if}
