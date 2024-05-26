declare module 'pocketbase' {
    export interface AuthModel {
      id: string;
      email: string;
      [key: string]: unknown; // Add more properties as needed
    }
  
    export interface AuthStore {
      model: AuthModel | null;
      onChange(callback: () => void): void;
      clear(): void;
    }
  
    export interface Collection<T = Record<string, unknown>> {
      authWithPassword(email: string, password: string): Promise<void>;
      create(data: T): Promise<T>;
      update(id: string, data: Partial<T>): Promise<T>;
      subscribe(event: string, callback: (e: unknown) => void): void;
      getFullList(batchSize?: number, queryParams?: Record<string, unknown>): Promise<T[]>;
      getList(page: number, perPage: number, queryParams?: Record<string, unknown>): Promise<{ items: T[] }>;
    }
  
    export default class PocketBase {
      constructor(url: string);
      authStore: AuthStore;
      collection<T = Record<string, unknown>>(collectionName: string): Collection<T>;
    }
  }
  