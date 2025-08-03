<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	// Импортируем иконки для категорий
	import { Bot, Palette, Briefcase } from 'lucide-svelte';

	// Структурированная модель данных для навыков
	const skillCategories = [
		{
			title: 'Управление и Стратегия',
			icon: Briefcase,
			skills: [
				{ name: m.arsenal_skill1_name, description: m.arsenal_skill1_desc },
				{ name: m.arsenal_skill4_name, description: m.arsenal_skill4_desc },
				{ name: m.arsenal_skill5_name, description: m.arsenal_skill5_desc },
				{ name: m.arsenal_skill7_name, description: m.arsenal_skill7_desc }
			]
		},
		{
			title: 'Креатив и Дизайн',
			icon: Palette,
			skills: [
				{ name: m.arsenal_skill3_name, description: m.arsenal_skill3_desc },
				{ name: m.arsenal_skill6_name, description: m.arsenal_skill6_desc }
			]
		},
		{
			title: 'Технологии и AI',
			icon: Bot,
			skills: [{ name: m.arsenal_skill2_name, description: m.arsenal_skill2_desc }]
		}
	];

	onMount(() => {
		if (!browser) return;

		// Анимация пульсации для иконок
		gsap.to('.category-icon', {
			scale: 1.1,
			duration: 1.5,
			ease: 'sine.inOut',
			stagger: {
				each: 0.2,
				repeat: -1,
				yoyo: true
			}
		});
	});
</script>

<section id="arsenal" use:scrollSpy>
	<div class="container">
		<h2 class="section-title" use:animateIn>
			{@html m.arsenal_title()}
		</h2>
		<div class="categories-grid">
			{#each skillCategories as category, i}
				<div class="category-card" use:animateIn={{ y: 50, delay: i * 0.1 }}>
					<div class="category-header">
						<div class="category-icon">
							<svelte:component this={category.icon} size={24} />
						</div>
						<h3 class="category-title">{category.title}</h3>
					</div>
					<div class="skills-list">
						{#each category.skills as skill}
							{#if skill.name()}
								<div class="skill-item" data-cursor-hover>
									<span>{skill.name()}</span>
									{#if skill.description()}
										<div class="skill-tooltip">
											{@html skill.description()}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
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
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 2rem;
	}
	.section-title {
		text-align: center;
		font-size: clamp(2rem, 6vw, 2.5rem);
		font-weight: 700;
		margin-bottom: 4rem;
	}
	.categories-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}
	.category-card {
		background-color: var(--dark-gray);
		border: 1px solid var(--light-gray);
		border-radius: var(--border-radius);
		padding: 2rem;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.category-card:hover {
		border-color: var(--yellow);
		box-shadow: 0 0 20px var(--yellow-glow);
	}
	.category-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--light-gray);
	}
	.category-icon {
		color: var(--yellow);
		background-color: rgba(253, 224, 71, 0.1);
		padding: 0.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.category-title {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
	}
	.skills-list {
		display: flex;
		flex-direction: column;
		gap: 0rem;
	}
	.skill-item {
		position: relative;
		font-size: 1rem;
		opacity: 0.9;
		width: 100%;
		padding: 0.75rem 0;
		border-bottom: 1px solid var(--light-gray);
	}
	.skills-list > :last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
	.skills-list > :first-child {
		padding-top: 0;
	}
	.skill-tooltip {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		bottom: 120%;
		left: 0;
		transform: translateY(10px);
		width: 250px;
		background-color: var(--black);
		border: 1px solid var(--light-gray);
		padding: 1rem;
		border-radius: var(--border-radius);
		font-size: 0.9rem;
		line-height: 1.5;
		transition: all 0.3s ease;
		z-index: 10;
		pointer-events: none;
	}
	.skill-item:hover .skill-tooltip {
		visibility: visible;
		opacity: 1;
		transform: translateY(0);
	}
</style>
