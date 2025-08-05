<script lang="ts">
	import { writable } from 'svelte/store';
	import * as m from '$lib/paraglide/messages';
	import { scrollSpy } from '$lib/actions/scrollSpy';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	const openItem = writable<number | null>(null);

	function toggleItem(index: number) {
		openItem.update((current) => (current === index ? null : index));
	}

	const timelineItems = [
		{
			company: m.career_path_item1_company,
			dates: m.career_path_item1_dates,
			text: m.career_path_item1_text,
			linkText: m.career_path_item1_link,
			linkUrl: 'https://converticube.com/'
		},
		{
			company: m.career_path_item2_company,
			dates: m.career_path_item2_dates,
			text: m.career_path_item2_text,
			linkText: m.career_path_item2_link,
			linkUrl: '#cases'
		},
		{
			company: m.career_path_item3_company,
			dates: m.career_path_item3_dates,
			text: m.career_path_item3_text,
			linkText: m.career_path_item3_link,
			linkUrl: '#cases'
		}
	];

	onMount(() => {
		if (!browser) return;
		gsap.registerPlugin(ScrollTrigger);

		// Анимация "прорастания" линии
		gsap.from('.timeline-line-progress', {
			scaleY: 0,
			scrollTrigger: {
				trigger: '.timeline',
				start: 'top center',
				end: 'bottom bottom',
				scrub: 1
			}
		});

		// Анимация появления элементов
		const items = gsap.utils.toArray('.timeline-item');
		items.forEach((item) => {
			gsap.from(item as HTMLElement, {
				opacity: 0,
				x: -50,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: item as HTMLElement,
					start: 'top 80%',
					toggleActions: 'play none none none'
				}
			});
		});
	});
</script>

<section id="careerpath" use:scrollSpy>
	<div class="container">
		<h2 class="section-title">
			{@html m.career_path_title()}
		</h2>

		<div class="timeline">
			<div class="timeline-line">
				<div class="timeline-line-progress"></div>
			</div>

			{#each timelineItems as item, index}
				<div class="timeline-item">
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
									<a
										href={item.linkUrl}
										target="_blank"
										rel="noopener noreferrer"
										data-cursor-hover
									>
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
		gap: 2rem;
	}

	.timeline-line {
		position: absolute;
		left: 11px;
		top: 1rem;
		bottom: 1rem;
		width: 2px;
		background-color: var(--light-gray);
		transform: translateX(-50%);
	}
	.timeline-line-progress {
		width: 100%;
		height: 100%;
		background-color: var(--yellow);
		transform-origin: top;
	}

	.timeline-item {
		position: relative;
		padding-left: 3rem;
	}
	.timeline-dot {
		position: absolute;
		left: 11px;
		top: 1rem;
		width: 14px;
		height: 14px;
		background-color: var(--yellow);
		border-radius: 50%;
		transform: translateX(-50%);
		border: 3px solid var(--dark-gray);
		box-shadow: 0 0 10px var(--yellow-glow);
	}

	.timeline-content {
		background-color: var(--dark-gray);
		border: 1px solid var(--light-gray);
		border-radius: var(--border-radius);
		box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05);
		transition: border-color 0.3s ease;
		overflow: hidden;
	}
	.timeline-content:hover {
		border-color: var(--yellow);
	}

	.timeline-header {
		display: flex;
		align-items: center;
		width: 100%;
		background: none;
		border: none;
		text-align: left;
		padding: 1rem 1.5rem;
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
		padding: 0 1.5rem 1.5rem;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--color-text);
		opacity: 0.9;
	}
	.timeline-body a {
		color: var(--yellow);
		text-decoration: none;
		font-weight: 600;
	}
</style>
