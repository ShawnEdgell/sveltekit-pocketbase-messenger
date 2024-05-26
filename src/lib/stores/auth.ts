import { writable } from 'svelte/store';
import pb from '$lib/pocketbase';

// Define the User type
interface User {
  id: string;
  email: string;
  username?: string;
  name?: string;
  created: string;
  updated: string;
  [key: string]: unknown;
}

export const user = writable<User | null>(pb.authStore.model as User | null);

pb.authStore.onChange(() => {
  user.set(pb.authStore.model as User | null);
});

export async function login(email: string, password: string): Promise<void> {
  try {
    await pb.collection('users').authWithPassword(email, password);
    user.set(pb.authStore.model as User);
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  pb.authStore.clear();
  user.set(null);
}

export async function register(email: string, password: string, passwordConfirm: string): Promise<void> {
  try {
    await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
    });
    // Optionally log the user in automatically after registration
    await login(email, password);
  } catch (error) {
    console.error('Registration failed', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

export async function updateUser(data: Partial<User>): Promise<void> {
  try {
    if (pb.authStore.model) {
      const updatedUser = await pb.collection('users').update(pb.authStore.model.id, data);
      user.set(updatedUser as User);
    } else {
      throw new Error('No user logged in');
    }
  } catch (error) {
    console.error('Update failed', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
