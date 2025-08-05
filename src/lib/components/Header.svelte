<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { activeSection } from '$lib/stores/activeSection';
	import { Menu, X } from 'lucide-svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';

	let { isScrolled = false }: { isScrolled: boolean } = $props();
	let isMobileMenuOpen = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
		}
	});

	const closeMenu = () => {
		isMobileMenuOpen = false;
	};

	// --- НОВЫЙ КОД: Список ссылок для меню ---
	const navLinks = [
		{ href: '/#about', label: m.menu_about, id: 'about' },
		{ href: '/#careerpath', label: m.career_path_title, id: 'careerpath' },
		{ href: '/#keyprojects', label: m.key_projects_title, id: 'keyprojects' },
		{ href: '/#myarsenal', label: m.arsenal_title, id: 'myarsenal' },
		{ href: '/#contacts', label: m.menu_contacts, id: 'contacts' }
	];
	// --- КОНЕЦ НОВОГО КОДА ---
</script>

<header class:header-scrolled={isScrolled}>
	<div class="container">
		<a href="/" class="logo font-display" onclick={closeMenu}>YKREO</a>

		<nav class="desktop-nav">
			{#each navLinks as link}
				<a href={link.href} data-cursor-hover class:active={$activeSection === link.id}>
					{link.label()}
				</a>
			{/each}
			<a
				href="/works"
				class="portfolio-button"
				data-cursor-hover
				class:active={$page.url.pathname.startsWith('/works')}
			>
				{m.menu_portfolio()}
			</a>
		</nav>

		<button
			class="mobile-menu-toggle"
			onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
			aria-label="Toggle menu"
		>
			{#if isMobileMenuOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>
</header>

{#if isMobileMenuOpen}
	<div class="mobile-nav-wrapper" transition:fly={{ duration: 400, x: '100%', easing: quintOut }}>
		<nav class="mobile-nav">
			{#each navLinks as link}
				<a href={link.href} onclick={closeMenu}>{link.label()}</a>
			{/each}
			<a href="/works" onclick={closeMenu}>{m.menu_portfolio()}</a>
		</nav>
	</div>
{/if}

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 1rem 0;
		z-index: 1000;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease,
			backdrop-filter 0.3s ease;
		border-bottom: 1px solid transparent;
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo {
		font-size: 1.5rem;
		font-weight: 700;
		text-decoration: none;
		color: var(--color-text);
		transition: color 0.2s ease;
		font-family: var(--font-display);
		z-index: 1002;
	}
	.logo:hover {
		color: var(--color-accent);
	}
	.desktop-nav {
		display: none;
		align-items: center;
		gap: 1rem;
	}
	.desktop-nav a {
		text-decoration: none;
		color: var(--color-text);
		transition:
			color 0.2s ease,
			background-color 0.2s ease;
		font-size: 0.875rem;
	}
	.desktop-nav a:not(.portfolio-button):hover {
		color: var(--color-accent);
	}
	.desktop-nav a.active {
		color: var(--color-accent);
		font-weight: 700;
	}
	.portfolio-button {
		padding: 0.4rem 0.8rem;
		border: 1px solid var(--color-accent);
		border-radius: 9999px;
		background-color: transparent;
	}
	.portfolio-button:hover,
	.desktop-nav a.portfolio-button.active {
		background-color: var(--color-accent);
		color: var(--color-background);
	}
	.mobile-menu-toggle {
		display: block;
		background: none;
		border: none;
		color: var(--color-text);
		cursor: pointer;
		z-index: 1002;
	}
	.mobile-nav-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-background);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 1001;
	}
	.mobile-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2.5rem;
		text-align: center;
	}
	.mobile-nav a {
		font-family: var(--font-display);
		font-size: 2rem;
		text-decoration: none;
		color: var(--color-text);
	}
	.header-scrolled {
		background-color: rgba(17, 17, 17, 0.8);
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
		border-bottom-color: rgba(255, 255, 255, 0.1);
	}
	@media (min-width: 1200px) {
		/* Увеличил брейкпоинт для лучшего вида */
		header {
			padding: 1.5rem 0;
		}
		.container {
			padding: 0 2rem;
		}
		.desktop-nav {
			display: flex;
			gap: 2rem;
		}
		.portfolio-button {
			padding: 0.5rem 1rem;
		}
		.mobile-menu-toggle {
			display: none;
		}
	}
</style>
