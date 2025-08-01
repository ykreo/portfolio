// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { SITE_PASSWORD } from '$env/static/private';
import * as m from '$lib/paraglide/messages';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (password === SITE_PASSWORD) {
			cookies.set('session', 'loggedIn', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30 // 30 дней
			});
			redirect(303, '/');
		}

		return fail(401, { error: m.login_error() });
	}
};
