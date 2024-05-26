import { writable } from 'svelte/store';
import pb from '$lib/pocketbase';
import { mapToMessages } from '$lib/utils';

// Define the Message type
export interface Message {
  id: string;
  sender_id: string;
  content: string;
  timestamp: string; // Using string for ISO 8601 format
}

// Define the Event type for PocketBase subscription
interface PocketBaseEvent {
  action: string;
  record: Message;
}

// Initialize the writable store with an empty array of messages
export const messages = writable<Message[]>([]);

// Fetch all messages from the PocketBase collection
export async function fetchMessages() {
  try {
    const records = await pb.collection('messages').getFullList(200, {
      sort: '-timestamp', // Sort messages by timestamp in descending order
    });
    messages.set(mapToMessages(records));
  } catch (error) {
    console.error('Failed to fetch messages', error);
  }
}

// Subscribe to real-time updates for new messages if in the browser
if (typeof window !== 'undefined') {
  pb.collection('messages').subscribe('*', function (e: unknown) {
    const event = e as PocketBaseEvent; // Type casting the event
    messages.update((currentMessages) => [...currentMessages, event.record]);
  });
}

// Send a new message to the PocketBase collection
export async function sendMessage(content: string): Promise<void> {
  const userModel = pb.authStore.model;
  if (!userModel) {
    throw new Error('User not authenticated');
  }

  try {
    await pb.collection('messages').create({
      sender_id: userModel.id,
      content,
      timestamp: new Date().toISOString(), // Using ISO 8601 format
    });
  } catch (error) {
    console.error('Failed to send message', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
