import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',
				text: 'var(--color-text)',
				accent: 'var(--color-accent)'
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'sans-serif'],
				display: ['var(--font-display)', 'sans-serif']
			}
		}
	},
	plugins: []
} satisfies Config;
