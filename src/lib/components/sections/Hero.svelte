<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';

	// Эта функция будет плавно прокручивать страницу к следующему блоку
	const scrollToNextSection = () => {
		// Находим текущую секцию по ее id
		const currentSection = document.querySelector('#hero');
		if (currentSection) {
			// Находим следующую секцию, идущую сразу за текущей
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
			{@html m.hero_title_new()}
		</h1>
		<p class="subtitle" use:animateIn={{ from: { y: 30, opacity: 0, delay: 0.2 } }}>
			{@html m.hero_subtitle_new()}
		</p>
		<div
			class="achievement"
			use:animateIn={{ from: { y: 30, opacity: 0, delay: 0.3 } }}
		>
			{@html m.hero_achievement()}
		</div>
		<button
			class="cta-button"
			use:animateIn={{ from: { y: 30, opacity: 0, delay: 0.4 } }}
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
		flex-direction: column; /* Выравниваем контент по центру и по вертикали */
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		text-align: center;
		padding-top: 5rem; /* Добавляем отступ сверху, чтобы было место для хедера */
		padding-bottom: 5rem;
	}
	.container {
		max-width: 800px;
		padding: 0 2rem;
		display: flex; /* Используем flex для удобного расположения элементов */
		flex-direction: column;
		align-items: center;
		gap: 1.5rem; /* Добавляем отступ между элементами */
	}
	.title {
		font-size: clamp(2.5rem, 8vw, 4rem); /* Адаптивный размер шрифта */
		font-weight: 700;
		line-height: 1.1;
		color: var(--color-text);
		margin: 0; /* Убираем стандартный отступ */
	}
	.subtitle {
		font-size: clamp(1.125rem, 4vw, 1.25rem); /* Адаптивный размер шрифта */
		color: var(--color-text);
		opacity: 0.8;
		max-width: 600px; /* Ограничиваем ширину для лучшей читаемости */
		margin: 0;
	}
	/* Стили для нового блока с достижением */
	.achievement {
		font-size: clamp(1rem, 4vw, 1.1rem);
		font-weight: 700;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		background-color: rgba(253, 224, 71, 0.1); /* Желтый с прозрачностью */
		color: #fde047; /* Ярко-желтый цвет, как в вашем дизайне */
		border: 1px solid rgba(253, 224, 71, 0.2);
	}
	/* Стили для новой кнопки */
	.cta-button {
		font-family: var(--font-display);
		font-weight: 500;
		background-color: var(--color-accent);
		color: var(--color-background);
		padding: 0.75rem 1.5rem;
		border-radius: 9999px;
		border: none;
		cursor: pointer;
		transition: transform 0.2s ease;
		margin-top: 1rem; /* Добавляем отступ сверху */
	}
	.cta-button:hover {
		transform: scale(1.05);
	}
</style>