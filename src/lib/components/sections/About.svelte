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
</style>
