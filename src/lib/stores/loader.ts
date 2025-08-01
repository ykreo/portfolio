// src/lib/stores/loader.ts
import { writable } from 'svelte/store';

// true - страница загружается, false - загрузка завершена
export const isLoading = writable(true);
