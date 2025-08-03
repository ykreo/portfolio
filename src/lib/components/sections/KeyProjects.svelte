<script lang="ts">
	import { writable } from 'svelte/store';
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';

	const expandedCase = writable<number | null>(null);

	function toggleCase(index: number) {
		expandedCase.update((current) => (current === index ? null : index));
	}

	const cases = [
		{
			title: m.key_projects_case1_title,
			problemTitle: m.key_projects_case1_problem_title,
			problemText: m.key_projects_case1_problem_text,
			solutionTitle: m.key_projects_case1_solution_title,
			solutionText: m.key_projects_case1_solution_text,
			resultTitle: m.key_projects_case1_result_title,
			resultText: m.key_projects_case1_result_text
		},
		{
			title: m.key_projects_case2_title,
			problemTitle: m.key_projects_case2_problem_title,
			problemText: m.key_projects_case2_problem_text,
			solutionTitle: m.key_projects_case2_solution_title,
			solutionText: m.key_projects_case2_solution_text,
			resultTitle: m.key_projects_case2_result_title,
			resultText: m.key_projects_case2_result_text
		}
	];
</script>

<section id="cases" use:scrollSpy>
	<div class="container">
		<h2 class="section-title" use:animateIn>
			{@html m.key_projects_title()}
		</h2>
		<div class="cases-wrapper">
			{#each cases as caseItem, index}
				<div class="case-card" use:animateIn={{ y: 50, delay: 0.2 * index }}>
					<button class="case-header" on:click={() => toggleCase(index)} data-cursor-hover>
						<h3>{@html caseItem.title()}</h3>
						<div class="expand-icon" class:expanded={$expandedCase === index}></div>
					</button>

					{#if $expandedCase === index}
						<div class="case-body">
							<div class="text-content">
								<h4>{caseItem.problemTitle()}</h4>
								<p>{@html caseItem.problemText()}</p>

								<h4>{caseItem.solutionTitle()}</h4>
								<p>{@html caseItem.solutionText()}</p>

								<h4>{caseItem.resultTitle()}</h4>
								<p>{@html caseItem.resultText()}</p>
							</div>
						</div>
					{/if}
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
		margin-bottom: 4rem;
	}
	.cases-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.case-card {
		background-color: var(--dark-gray);
		border: 1px solid var(--light-gray);
		border-radius: var(--border-radius);
		overflow: hidden;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.case-card:hover {
		border-color: var(--yellow);
		box-shadow: 0 0 20px var(--yellow-glow);
	}
	.case-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		color: inherit;
		font: inherit;
	}
	.case-header h3 {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.2;
	}
	.expand-icon {
		width: 28px;
		height: 28px;
		position: relative;
		flex-shrink: 0;
		margin-left: 1rem;
		background-color: var(--light-gray);
		border-radius: 50%;
	}
	.expand-icon::before,
	.expand-icon::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 14px;
		height: 2px;
		background-color: var(--white);
		transition: transform 0.3s ease;
		transform-origin: center;
	}
	.expand-icon::before {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	.expand-icon::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}
	.expand-icon.expanded::after {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	.case-body {
		padding: 0 1.5rem 1.5rem 1.5rem;
	}
	.text-content h4 {
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
		color: var(--yellow);
	}
	.text-content p {
		line-height: 1.7;
		opacity: 0.9;
		margin: 0;
	}
	.text-content p:not(:last-child) {
		margin-bottom: 1.5rem;
	}
</style>
