<script lang="ts">
	import { locales, setLocale, getLocale } from '$lib/paraglide/runtime';

	let activeLang = $state(getLocale());
</script>

<div class="language-switcher">
	{#each locales as lang}
		<button
			onclick={() => {
				setLocale(lang);
				activeLang = lang;
			}}
			class="lang-button"
			class:active={lang === activeLang}
			title="Switch to {lang.toUpperCase()}"
		>
			{lang.toUpperCase()}
		</button>
	{/each}
</div>

<style>
	.language-switcher {
		display: flex;
		gap: 0.5rem;
		background-color: rgba(255, 255, 255, 0.1);
		padding: 0.25rem;
		border-radius: 9999px;
	}
	.lang-button {
		padding: 0.25rem 0.5rem;
		border: none;
		background-color: transparent;
		color: var(--color-text); /* <-- Исправление */
		cursor: pointer;
		border-radius: 9999px;
		transition: all 0.2s ease;
		opacity: 0.7;
	}
	.lang-button:hover {
		opacity: 1;
		background-color: rgba(255, 255, 255, 0.2);
	}
	.lang-button.active {
		opacity: 1;
		font-weight: 700;
		background-color: var(--color-accent); /* <-- Исправление */
		color: var(--color-background); /* <-- Исправление */
	}
</style>
