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
	

	let { children } = $props();
	let scrollY = $state(0);
	const isScrolled = $derived(scrollY > 10);

	onMount(() => {
		scrollY = window.scrollY;
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		if ($page.url.pathname !== '/') {
			activeSection.set(null);
		}
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

{#if $isLoading}
	<Preloader />
{/if}

{#if $isCursorVisible}
	<Cursor />
{/if}

<Scene {scrollY} />
<Header {isScrolled} />
<FloatingControls />


<main>
	{#key $page.url.pathname}
		<div class="page-transition" in:fade={{ duration: 250, delay: 250 }} out:fade={{ duration: 250 }}>
			{@render children()}
		</div>
	{/key}
</main>

<Footer />

<style>

	main {
		display: grid;
		grid-template-columns: 1fr;
		position: relative;
	}

	main > :global(.page-transition) {
		grid-area: 1 / 1;
	}

	:global(body.custom-cursor-enabled *) {
		cursor: none !important;
	}
</style>