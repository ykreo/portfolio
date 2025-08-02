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
	.card {
		position: relative;
		border-radius: 0.5rem;
		overflow: hidden;
		cursor: pointer;
		aspect-ratio: 3 / 2;
		/* Новые стили для фона-заглушки */
		background-size: cover;
		background-position: center;
		background-color: rgba(255, 255, 255, 0.05); /* Фон на случай, если нет LQIP */
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition:
			transform 0.4s ease,
			opacity 0.5s ease-in-out; /* Добавляем переход для прозрачности */
		/* Изначально изображение невидимо */
		opacity: 0;
	}

	/* Когда изображение загружено, делаем его видимым */
	.thumbnail.loaded {
		opacity: 1;
	}

	.overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1rem;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
		transform: translateY(100%);
		transition: transform 0.4s ease;
	}

	.card:hover .overlay {
		transform: translateY(0);
	}
	.card:hover .thumbnail {
		transform: scale(1.1);
	}

	.title {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--color-text);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tags span {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		background-color: var(--color-accent);
		color: var(--color-background);
		border-radius: 9999px;
	}
</style>
