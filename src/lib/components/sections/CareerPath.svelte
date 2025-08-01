<script lang="ts">
	import { writable } from 'svelte/store';
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';

	// Cоздаем хранилище, чтобы отслеживать, какой элемент таймлайна открыт
	const openItem = writable<number | null>(null);

	function toggleItem(index: number) {
		openItem.update((current) => (current === index ? null : index));
	}

	// Данные для таймлайна
	const timelineItems = [
		{
			company: m.career_path_item1_company,
			dates: m.career_path_item1_dates,
			text: m.career_path_item1_text,
			linkText: m.career_path_item1_link,
			linkUrl: 'https://converticube.com/' // Пример ссылки
		},
		{
			company: m.career_path_item2_company,
			dates: m.career_path_item2_dates,
			text: m.career_path_item2_text,
			linkText: m.career_path_item2_link,
			linkUrl: '#cases' // Пример якоря на будущий блок кейсов
		},
		{
			company: m.career_path_item3_company,
			dates: m.career_path_item3_dates,
			text: m.career_path_item3_text,
			linkText: m.career_path_item3_link,
			linkUrl: '#cases' // Пример якоря на будущий блок кейсов
		}
	];
</script>

<section id="career" use:scrollSpy>
	<div class="container">
		<h2 class="section-title" use:animateIn>
			{@html m.career_path_title()}
		</h2>

		<div class="timeline">
			{#each timelineItems as item, index}
				<div class="timeline-item" use:animateIn={{ from: { y: 30, opacity: 0, delay: 0.1 * index } }}>
					<div class="timeline-dot"></div>
					<div class="timeline-content">
						<button class="timeline-header" on:click={() => toggleItem(index)} data-cursor-hover>
							<h3 class="company">{item.company()}</h3>
							<span class="dates">{item.dates()}</span>
							<div class="icon" class:open={$openItem === index}>›</div>
						</button>

						{#if $openItem === index}
							<div class="timeline-body">
								<p>{@html item.text()}</p>
								{#if item.linkText && item.linkUrl}
									<a href={item.linkUrl} target="_blank" rel="noopener noreferrer" data-cursor-hover>
										{@html item.linkText()}
									</a>
								{/if}
							</div>
						{/if}
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
		max-width: 800px;
		margin: 0 auto;
		padding: 0 2rem;
	}
	.section-title {
		text-align: center;
		font-size: clamp(2rem, 6vw, 2.5rem);
		font-weight: 700;
		margin-bottom: 4rem;
	}
	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	/* Стилизуем линию таймлайна */
	.timeline::before {
		content: '';
		position: absolute;
		left: 11px;
		top: 1rem;
		bottom: 1rem;
		width: 2px;
		background-color: var(--color-border);
		transform: translateX(-50%);
	}
	.timeline-item {
		position: relative;
		padding-left: 3rem; /* Отступ для контента от линии */
	}
	.timeline-dot {
		position: absolute;
		left: 11px;
		top: 1rem;
		width: 12px;
		height: 12px;
		background-color: var(--color-accent);
		border-radius: 50%;
		transform: translateX(-50%);
		border: 2px solid var(--color-background);
	}
	.timeline-header {
		display: flex;
		align-items: center;
		width: 100%;
		background: none;
		border: none;
		text-align: left;
		padding: 0;
		cursor: pointer;
	}
	.company {
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
	}
	.dates {
		margin-left: 1rem;
		font-size: 0.9rem;
		color: var(--color-text);
		opacity: 0.7;
	}
	.icon {
		margin-left: auto;
		font-size: 1.5rem;
		transition: transform 0.2s ease;
		transform: rotate(90deg);
	}
	.icon.open {
		transform: rotate(270deg);
	}
	.timeline-body {
		padding-top: 1rem;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-text);
		opacity: 0.9;
	}
	.timeline-body a {
		color: var(--color-accent);
		text-decoration: none;
		font-weight: 600;
	}
</style>