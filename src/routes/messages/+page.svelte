<script>
	import { onMount } from 'svelte';
	import { messages, sendMessage, fetchMessages } from '$lib/stores/messages';
	import { user } from '$lib/stores/auth';
	let newMessage = '';
	let errorMessage = '';

	async function handleSendMessage() {
		try {
			await sendMessage(newMessage);
			newMessage = ''; // Clear the input after sending
		} catch (error) {
			console.error('Failed to send message', error);
			errorMessage = 'Failed to send message. Please try again.';
		}
	}

	onMount(() => {
		fetchMessages();
	});
</script>

{#if $user}
	<div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
		{#if errorMessage}
			<p class="text-red-500">{errorMessage}</p>
		{/if}
		<ul class="mb-4">
			{#each $messages as message}
				<li class="mb-2"><strong>{message.sender_id}:</strong> {message.content}</li>
			{/each}
		</ul>

		<form class="flex" on:submit|preventDefault={handleSendMessage}>
			<input
				type="text"
				bind:value={newMessage}
				placeholder="Type a message"
				class="input input-bordered flex-grow mr-2"
			/>
			<button type="submit" class="btn btn-primary">Send</button>
		</form>
	</div>
{:else}
	<p class="text-center">
		Please <a href="/login" class="text-blue-500 underline">log in</a> to view messages.
	</p>
{/if}
