<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';
</script>

<section id="about" use:scrollSpy>
	<div class="container">
		<h2 class="section-title" use:animateIn>{m.menu_about()}</h2>
		<div class="content" use:animateIn={{ y: 30, delay: 0.2 }}>
			<div class="about-text">
				{@html m.about_description()}
			</div>
			<div class="skills">
				<h3 class="skills-title glow-text">{@html m.about_skills_title()}</h3>
				<div class="tags">
					<span>Motion Design</span>
					<span>Frontend Development</span>
					<span>SvelteKit</span>
					<span>Three.js</span>
					<span>GSAP</span>
					<span>Advertising</span>
					<span>UI/UX Animation</span>
					<span>Figma</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	section {
		padding: 5rem 0;
	}
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 2rem;
	}
	.section-title {
		font-size: clamp(2.5rem, 8vw, 3rem);
		font-weight: 700;
		margin-bottom: 3rem;
		text-align: center;
	}
	.content {
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}
	.about-text {
		font-size: clamp(1.1rem, 4vw, 1.25rem);
		line-height: 1.8;
		opacity: 0.9;
		text-align: justify;
	}
	.skills-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		font-family: var(--font-display);
		text-align: center;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}
	.tags span {
		font-size: 0.9rem;
		padding: 0.5rem 1rem;
		/* Применяем наши стили */
		background-color: var(--dark-gray);
		border: 1px solid var(--light-gray);
		color: var(--color-text);
		border-radius: var(--border-radius);
		transition: all 0.2s ease;
	}
	.tags span:hover {
		transform: translateY(-2px);
		border-color: var(--yellow);
		color: var(--yellow);
	}
</style>
