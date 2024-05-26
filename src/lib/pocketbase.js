// src/lib/pocketbase.js
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090'); // Ensure this URL matches your PocketBase server URL
export default pb;
