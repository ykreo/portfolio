<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
</script>

<div class="container">
	<h2 class="section-title" use:animateIn>{m.menu_about()}</h2>
	<div class="content" use:animateIn={{ from: { y: 30, opacity: 0, delay: 0.2 } }}>
		<div class="about-text">
			{@html m.about_description()}
		</div>
		<div class="skills">
			<h3 class="skills-title">{@html m.about_skills_title()}</h3>
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


<style>
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
		gap: 3rem;
	}
	.about-text {
		font-size: clamp(1rem, 4vw, 1.125rem);
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
		gap: 0.75rem;
		justify-content: center;
	}
	.tags span {
		font-size: 0.875rem;
		padding: 0.5rem 1rem;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: var(--color-text);
		border-radius: 9999px;
	}
</style>