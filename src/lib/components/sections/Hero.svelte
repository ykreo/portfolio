<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';

	const scrollToNextSection = () => {
		const currentSection = document.querySelector('#hero');
		if (currentSection) {
			const nextSection = currentSection.nextElementSibling;
			if (nextSection) {
				nextSection.scrollIntoView({ behavior: 'smooth' });
			}
		}
	};
</script>

<section id="hero" class="hero-section" use:scrollSpy>
	<div class="container">
		<h1 class="title" use:animateIn>
			{@html m
				.hero_title_new()
				.replace('Senior Motion Designer', '<span class="glow-text">Senior Motion Designer</span>')}
		</h1>
		<p class="subtitle" use:animateIn={{ y: 30, opacity: 0, delay: 0.2 }}>
			{@html m.hero_subtitle_new()}
		</p>
		<div class="achievement" use:animateIn={{ y: 30, opacity: 0, delay: 0.3 }}>
			{@html m.hero_achievement()}
		</div>
		<button
			class="cta-button"
			use:animateIn={{ y: 30, opacity: 0, delay: 0.4 }}
			on:click={scrollToNextSection}
			data-cursor-hover
		>
			{@html m.hero_cta_button()}
		</button>
	</div>
</section>

<style>
	.hero-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		text-align: center;
		padding-top: 5rem;
		padding-bottom: 5rem;
	}
	.container {
		max-width: 800px;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}
	.title {
		font-size: clamp(2.5rem, 8vw, 4rem);
		font-weight: 700;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0;
	}
	.subtitle {
		font-size: clamp(1.125rem, 4vw, 1.25rem);
		color: var(--color-text);
		opacity: 0.8;
		max-width: 600px;
		margin: 0;
	}

	.achievement {
		font-size: clamp(1rem, 4vw, 1.1rem);
		font-weight: 700;
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius);
		background-color: rgba(253, 224, 71, 0.1);
		color: var(--yellow);
		border: 1px solid rgba(253, 224, 71, 0.2);
		box-shadow: 0 0 15px -5px var(--yellow-glow);
	}

	.cta-button {
		font-family: var(--font-display);
		font-weight: 500;
		padding: 12px 24px;
		border-radius: 9999px;
		cursor: pointer;
		margin-top: 1rem;
		/* Применяем стили из глобального класса .button */
		border: 1px solid var(--light-gray);
		background: linear-gradient(145deg, var(--dark-gray), #111);
		color: var(--white);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.cta-button:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow:
			0 4px 15px rgba(0, 0, 0, 0.3),
			0 0 20px var(--yellow-glow);
	}
</style>
