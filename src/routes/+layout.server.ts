// src/routes/+layout.server.ts
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	const session = cookies.get('session');
	const { pathname } = url;

	// Если у пользователя нет сессии и он НЕ на странице входа,
	// перенаправляем его на страницу входа.
	if (!session && pathname !== '/login') {
		redirect(307, '/login');
	}

	// Если у пользователя есть сессия, но он зачем-то зашел на страницу входа,
	// отправляем его на главную.
	if (session && pathname === '/login') {
		redirect(307, '/');
	}

	// Возвращаем информацию о статусе входа,
	// чтобы ее можно было использовать на клиенте, если понадобится.
	return {
		loggedIn: !!session
	};
};
