<script lang="ts">
	import type { SanityImage } from '$lib/types';
	import imageUrlBuilder from '@sanity/image-url';
	import { client } from '$lib/sanityClient';

	const builder = imageUrlBuilder(client);

	let {
		title,
		tags,
		thumbnailUrl
	}: {
		title: string;
		tags: string[] | undefined; // Добавим undefined, так как тегов может и не быть
		thumbnailUrl: SanityImage;
	} = $props();

	// --- НОВЫЙ КОД ДЛЯ LQIP ---
	let imageLoaded = $state(false);
	// Получаем размытую заглушку из метаданных изображения
	const lqip = thumbnailUrl.metadata?.lqip;
	// --- КОНЕЦ НОВОГО КОДА ---
</script>

<div class="card" data-cursor-hover style:background-image={lqip ? `url(${lqip})` : 'none'}>
	<img
		src={builder.image(thumbnailUrl).width(600).height(400).url()}
		alt={title}
		class="thumbnail"
		class:loaded={imageLoaded}
		onload={() => (imageLoaded = true)}
		loading="lazy"
		decoding="async"
	/>
	<div class="overlay">
		<h3 class="title">{title}</h3>
		{#if tags}
			<div class="tags">
				{#each tags as tag}
					<span>{tag}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	/* Основной контейнер карточки */
	.card {
		position: relative;
		overflow: hidden;
		border-radius: var(--border-radius);
		background-color: var(--dark-gray);
		border: 1px solid var(--light-gray);
		/* Добавляем плавные переходы для всех анимаций */
		transition:
			transform 0.4s ease,
			box-shadow 0.4s ease,
			border-color 0.4s ease;
		background-size: cover;
		background-position: center;
	}

	/* Эффект при наведении на карточку */
	.card:hover {
		transform: translateY(-5px) scale(1.02);
		border-color: var(--yellow);
		box-shadow:
			0 10px 30px rgba(0, 0, 0, 0.4),
			0 0 25px var(--yellow-glow); /* Добавляем тень и наше свечение */
	}

	/* Изображение-превью */
	.thumbnail {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition:
			opacity 0.5s ease-in-out,
			transform 0.4s ease;
		opacity: 0; /* Скрываем основное изображение, пока оно не загрузится */
	}

	/* Показываем изображение после загрузки */
	.thumbnail.loaded {
		opacity: 1;
	}

	/* Увеличиваем изображение при наведении на карточку */
	.card:hover .thumbnail {
		transform: scale(1.1);
	}

	/* Слой с текстом поверх изображения */
	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: 1.5rem;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
		opacity: 0; /* Скрываем оверлей по умолчанию */
		transition: opacity 0.4s ease;
	}

	/* Показываем оверлей при наведении */
	.card:hover .overlay {
		opacity: 1;
	}

	/* Заголовок проекта */
	.title {
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 600;
		line-height: 1.2;
		color: var(--white);
		transform: translateY(20px); /* Сдвигаем для анимации */
		transition:
			color 0.3s ease,
			transform 0.4s ease;
	}

	/* Анимация и подсветка заголовка при наведении */
	.card:hover .title {
		color: var(--yellow);
		transform: translateY(0);
	}

	/* Контейнер для тегов */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
		transform: translateY(20px); /* Сдвигаем для анимации */
		transition: transform 0.4s ease 0.1s; /* Добавляем небольшую задержку */
	}

	.card:hover .tags {
		transform: translateY(0);
	}

	/* Стили для каждого тега */
	.tags span {
		font-size: 0.75rem;
		padding: 0.25rem 0.6rem;
		border-radius: 9999px;
		background-color: rgba(255, 255, 255, 0.1);
		color: var(--white);
		font-weight: 500;
	}
</style>
