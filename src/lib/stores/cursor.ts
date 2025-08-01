// src/lib/stores/cursor.ts
import { writable } from 'svelte/store';

// true - кастомный курсор включен, false - выключен (используется системный)
export const isCursorVisible = writable<boolean>(true);
