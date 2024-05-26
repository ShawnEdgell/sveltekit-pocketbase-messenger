// src/lib/stores/auth.ts
import { writable } from 'svelte/store';
import pb from '$lib/pocketbase';

// Define the User type
interface User {
  id: string;
  email: string;
  [key: string]: unknown;
}

export const user = writable<User | null>(pb.authStore.model);

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
  } catch (error) {
    console.error('Registration failed', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
