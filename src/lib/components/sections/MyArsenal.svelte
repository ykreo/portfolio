<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';

	// Определяем навыки и их описания из файлов локализации
	const skills = [
		{ name: m.arsenal_skill1_name, description: m.arsenal_skill1_desc, position: { top: '15%', left: '20%' } },
		{ name: m.arsenal_skill2_name, description: m.arsenal_skill2_desc, position: { top: '25%', left: '75%' } },
		{ name: m.arsenal_skill3_name, description: m.arsenal_skill3_desc, position: { top: '50%', left: '10%' } },
		{ name: m.arsenal_skill4_name, description: m.arsenal_skill4_desc, position: { top: '70%', left: '80%' } },
		{ name: m.arsenal_skill5_name, description: m.arsenal_skill5_desc, position: { top: '85%', left: '30%' } },
		{ name: m.arsenal_skill6_name, description: m.arsenal_skill6_desc, position: { top: '40%', left: '50%' } },
		{ name: m.arsenal_skill7_name, description: m.arsenal_skill7_desc, position: { top: '65%', left: '45%' } },
	];
</script>

<section id="arsenal" use:scrollSpy>
	<div class="container">
		<h2 class="section-title" use:animateIn>
			{@html m.arsenal_title()}
		</h2>
		<div class="skills-map" use:animateIn={{ from: { scale: 0.8, opacity: 0, delay: 0.2 } }}>
			{#each skills as skill, i}
				<div class="skill-node" style="top: {skill.position.top}; left: {skill.position.left};">
					<div class="skill-point" data-cursor-hover></div>
					<div class="skill-label">
						<span>{skill.name()}</span>
						<div class="skill-tooltip">
							{@html skill.description()}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding: 5rem 0;
	}
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 0 2rem;
	}
	.section-title {
		text-align: center;
		font-size: clamp(2rem, 6vw, 2.5rem);
		font-weight: 700;
		margin-bottom: 5rem; /* Увеличим отступ для наглядности карты */
	}
	.skills-map {
		position: relative;
		width: 100%;
		height: 400px; /* Задаем высоту для контейнера "карты" */
	}
	.skill-node {
		position: absolute;
		display: flex;
		align-items: center;
		transform: translate(-50%, -50%); /* Центрируем узел */
	}
	.skill-point {
		width: 12px;
		height: 12px;
		background-color: var(--color-accent);
		border-radius: 50%;
		box-shadow: 0 0 10px var(--color-accent);
	}
	.skill-label {
		position: relative;
		padding-left: 1rem;
		font-weight: 500;
		cursor: default;
	}
	/* Стили для всплывающей подсказки */
	.skill-tooltip {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		bottom: 150%; /* Появляется над текстом */
		left: 50%;
		transform: translateX(-50%);
		width: 220px;
		background-color: var(--color-background-secondary);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		padding: 1rem;
		border-radius: 0.5rem;
		font-size: 0.9rem;
		line-height: 1.5;
		transition: opacity 0.3s, visibility 0.3s;
		z-index: 10;
		pointer-events: none; /* Чтобы не мешал наведению */
	}
	.skill-label:hover .skill-tooltip {
		visibility: visible;
		opacity: 1;
	}
</style>