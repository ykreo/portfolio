<script lang="ts">
	// 👇 1. ИСПРАВЛЕНИЕ: Убрали несуществующий тип из импорта
	import { locales, setLocale, getLocale } from '$lib/paraglide/runtime';
	import { isCursorVisible } from '$lib/stores/cursor';
	import { Globe, MousePointer, EyeOff } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let isLangMenuOpen = $state(false);
	let activeLang = $state(getLocale());

	const toggleCursor = () => {
		$isCursorVisible = !$isCursorVisible;
	};

	// 👇 2. ИСПРАВЛЕНИЕ: Используем встроенный в TypeScript способ получения типа из массива
	const switchLocale = (lang: (typeof locales)[number]) => {
		setLocale(lang);
		activeLang = lang;
		isLangMenuOpen = false;
	};
</script>

<div class="floating-controls">
	<div class="control-group">
		{#if isLangMenuOpen}
			<div class="lang-options" transition:fly={{ y: 10, duration: 200 }}>
				{#each locales as lang}
					<button
						onclick={() => switchLocale(lang)}
						class="lang-button"
						class:active={lang === activeLang}
						title="Switch to {lang.toUpperCase()}"
					>
						{lang.toUpperCase()}
					</button>
				{/each}
			</div>
		{/if}
		<button
	class="control-button"
	onclick={() => (isLangMenuOpen = !isLangMenuOpen)}
	aria-label="Toggle language menu"
	data-cursor-hover >
	<Globe size={20} />
</button>
	</div>

	<div class="control-group">
		<button class="control-button" onclick={toggleCursor} aria-label="Toggle custom cursor" data-cursor-hover>
			{#if $isCursorVisible}
				<MousePointer size={20} />
			{:else}
				<EyeOff size={20} />
			{/if}
		</button>
	</div>
</div>

<style>
	/* Стили остаются без изменений */
	.floating-controls {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: flex-end;
	}

	.control-group {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.control-button {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: var(--color-text);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
	}

	.control-button:hover {
		background-color: rgba(255, 255, 255, 0.2);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.lang-options {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		background-color: rgba(30, 30, 30, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.15);
		padding: 0.5rem;
		border-radius: 12px;
		margin-bottom: 0.5rem;
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
	}

	.lang-button {
		padding: 0.5rem 0.75rem;
		border: none;
		background-color: transparent;
		color: var(--color-text);
		cursor: pointer;
		border-radius: 8px;
		transition: all 0.2s ease;
		opacity: 0.8;
		font-size: 0.875rem;
		min-width: 60px;
	}

	.lang-button:hover {
		opacity: 1;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.lang-button.active {
		opacity: 1;
		font-weight: 700;
		background-color: var(--color-accent);
		color: var(--color-background);
	}
</style>