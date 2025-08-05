<script lang="ts">
	import '../app.css';
	import Scene from '$lib/components/Scene.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import FloatingControls from '$lib/components/FloatingControls.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { activeSection } from '$lib/stores/activeSection';
	import { fade } from 'svelte/transition';
	import { isCursorVisible } from '$lib/stores/cursor';
	import { isLoading } from '$lib/stores/loader';
	import * as m from '$lib/paraglide/messages';

	let { children } = $props();
	let scrollY = $state(0);
	const isScrolled = $derived(scrollY > 10);

	// --- ИСПРАВЛЕННЫЙ КОД: Динамический заголовок ---
	let title = $state('');
	const baseTitle = 'YKREO';

	// Этот $effect будет автоматически перезапускаться при изменении $page или $activeSection
	$effect(() => {
		const pathname = $page.url.pathname;

		// Сбрасываем активную секцию, если мы ушли с главной страницы
		if (pathname !== '/') {
			activeSection.set(null);
		}

		if (pathname === '/') {
			switch ($activeSection) {
				case 'about':
					title = `${m.menu_about()} | ${baseTitle}`;
					break;
				case 'careerpath':
					title = `${m.career_path_title()} | ${baseTitle}`;
					break;
				case 'keyprojects':
					title = `${m.key_projects_title()} | ${baseTitle}`;
					break;
				case 'myarsenal':
					title = `${m.arsenal_title()} | ${baseTitle}`;
					break;
				case 'contacts':
					title = `${m.menu_contacts()} | ${baseTitle}`;
					break;
				default:
					title = `${baseTitle}`;
			}
		} else if (pathname.startsWith('/works')) {
			title = `${m.menu_portfolio()} | ${baseTitle}`;
		} else {
			title = baseTitle;
		}
	});
	// --- КОНЕЦ ИСПРАВЛЕННОГО КОДА ---

	onMount(() => {
		scrollY = window.scrollY;
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			if ($isCursorVisible) {
				document.body.classList.add('custom-cursor-enabled');
			} else {
				document.body.classList.remove('custom-cursor-enabled');
			}
		}
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if $isLoading}
	<Preloader />
{/if}

{#if $isCursorVisible}
	<Cursor />
{/if}

<Scene {scrollY} />
<Header {isScrolled} />
<FloatingControls />

<div class="site-wrapper">
	<main>
		{#key $page.url.pathname}
			<div
				class="page-transition"
				in:fade={{ duration: 250, delay: 250 }}
				out:fade={{ duration: 250 }}
			>
				{@render children()}
			</div>
		{/key}
	</main>

	<Footer />
</div>

<style>
	.site-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		display: grid;
		grid-template-columns: 1fr;
		position: relative;
		flex-grow: 1;
	}

	main > :global(.page-transition) {
		grid-area: 1 / 1;
	}

	:global(body.custom-cursor-enabled *) {
		cursor: none !important;
	}
</style>
