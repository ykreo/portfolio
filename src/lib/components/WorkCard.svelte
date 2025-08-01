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
        tags: string[];
        thumbnailUrl: SanityImage;
    } = $props();
</script>

<div class="card" data-cursor-hover>
    <img
        src={builder.image(thumbnailUrl).width(600).height(400).url()}
        alt={title}
        class="thumbnail"
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
    /* Стили остаются такими же */
    .card {
        position: relative;
        border-radius: 0.5rem; /* 8px */
        overflow: hidden;
        cursor: pointer;
        aspect-ratio: 3 / 2; /* Сохраняем пропорции 3:2 */
    }

    .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
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
        font-size: 1.25rem; /* 20px */
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
        font-size: 0.75rem; /* 12px */
        padding: 0.25rem 0.5rem;
        background-color: var(--color-accent);
        color: var(--color-background);
        border-radius: 9999px;
    }
</style>