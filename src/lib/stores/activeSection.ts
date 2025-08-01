// src/lib/stores/activeSection.ts
import { writable } from 'svelte/store';

// Создаем хранилище, которое будет содержать id активной секции (например, 'about')
export const activeSection = writable<string | null>(null);
