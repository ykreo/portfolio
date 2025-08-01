// src/lib/sanityClient.ts
import { createClient } from '@sanity/client';

export const client = createClient({
	projectId: 'v4dhclpw', // 👈 Вставьте ваш Project ID
	dataset: 'production',
	apiVersion: '2025-07-30', // Используйте актуальную дату
	useCdn: false // `false` для разработки, чтобы видеть изменения сразу
});
