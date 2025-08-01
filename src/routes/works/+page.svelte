<script lang="ts">
    import { client } from '$lib/sanityClient';
    import { getLocale } from '$lib/paraglide/runtime';
    import WorkCard from '$lib/components/WorkCard.svelte';
    import WorkDetailModal from '$lib/components/WorkDetailModal.svelte';
    import { animateIn } from '$lib/actions/animateIn';
    import { flip } from 'svelte/animate';
    import type { SanityFile, SanityImage } from '$lib/types'; // Мы создадим этот файл ниже

    type Work = {
        _id: string;
        title: Record<string, string>;
        category: 'video' | 'static';
        tags: string[];
        thumbnailUrl: SanityImage;
        contentUrl: SanityFile;
        description: Record<string, string>;
    }

    // Получаем текущую локаль
    const lang = getLocale();

    // Загружаем данные из Sanity
    const promise = client.fetch<Work[]>(`*[_type == "work"]{
        _id,
        title,
        category,
        tags,
        description,
        "thumbnailUrl": thumbnailUrl.asset->{..., metadata},
        "contentUrl": contentUrl.asset->{url}
    }`);

    type Category = 'video' | 'static';

    let selectedIndex = $state<number | null>(null);
    let selectedCategory = $state<Category | null>(null);
    let selectedTags = $state(new Set<string>());

    // Функция для получения локализованного текста
    const t = (field: Record<string, string> | undefined) => {
        if (!field) return '';
        return field[lang] || field['en'] || ''; // Возвращаем нужный язык или английский по умолчанию
    }

    let works: Work[] = [];
    // Когда данные загрузятся, присваиваем их
    promise.then(data => {
        works = data;
    });

    const availableTags = $derived.by(() => {
        const tags = new Set<string>();
        const worksToScan = selectedCategory
            ? works.filter((w) => w.category === selectedCategory)
            : works;
        for (const work of worksToScan) {
            if(work.tags) {
                for (const tag of work.tags) {
                    tags.add(tag);
                }
            }
        }
        return Array.from(tags).sort();
    });

    const filteredWorks = $derived.by(() => {
        return works.filter((work) => {
            const categoryMatch = !selectedCategory || work.category === selectedCategory;
            if (!categoryMatch) return false;
            if (selectedTags.size === 0) return true;
            if (!work.tags) return false;
            return Array.from(selectedTags).every((tag) => work.tags.includes(tag));
        });
    });

    const selectedWork = $derived(
        selectedIndex !== null ? filteredWorks[selectedIndex] : null
    );

    const handleCategoryClick = (category: Category | null) => {
        selectedCategory = category;
        selectedTags.clear();
    };

    const handleTagClick = (tag: string) => {
    // Создаем новый Set, копируя в него все из старого
    const newTags = new Set(selectedTags);

    // Модифицируем уже новый Set
    if (newTags.has(tag)) {
        newTags.delete(tag);
    } else {
        newTags.add(tag);
    }

    // Присваиваем новый Set нашей переменной состояния.
    // Это и есть тот сигнал, который нужен Svelte!
    selectedTags = newTags;
    };

    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < filteredWorks.length - 1) {
            selectedIndex++;
        }
    };
    const handlePrev = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            selectedIndex--;
        }
    };
</script>

<div class="container">
    <h1 class="page-title" use:animateIn>Портфолио</h1>

    {#await promise}
        <p>Loading...</p>
    {:then}
        <div class="tags-filter" use:animateIn={{ from: { y: 20, opacity: 0, delay: 0.1 } }}>
            <button class="tag" class:active={selectedCategory === null} onclick={() => handleCategoryClick(null)}>
                Все
            </button>
            <button class="tag" class:active={selectedCategory === 'video'} onclick={() => handleCategoryClick('video')}>
                Видео
            </button>
            <button class="tag" class:active={selectedCategory === 'static'} onclick={() => handleCategoryClick('static')}>
                Статика
            </button>
        </div>

        <div class="tags-filter" use:animateIn={{ from: { y: 20, opacity: 0, delay: 0.2 } }}>
            {#each availableTags as tag}
                <button class="tag" class:active={selectedTags.has(tag)} onclick={() => handleTagClick(tag)}>
                    {tag}
                </button>
            {/each}
        </div>

        <div class="gallery-grid">
            {#each filteredWorks as work, index (work._id)}
                <div animate:flip={{ duration: 300 }}>
                    <button
                        type="button"
                        class="card-button"
                        onclick={() => (selectedIndex = index)}
                    >
                        <WorkCard 
                            title={t(work.title)} 
                            tags={work.tags} 
                            thumbnailUrl={work.thumbnailUrl}
                        />
                    </button>
                </div>
            {/each}
        </div>
    {/await}
</div>

{#if selectedWork}
    <WorkDetailModal
        title={t(selectedWork.title)}
        description={t(selectedWork.description)}
        category={selectedWork.category}
        contentUrl={selectedWork.contentUrl.url}
        tags={selectedWork.tags}
        onClose={() => (selectedIndex = null)}
        onPrev={handlePrev}
        onNext={handleNext}
        isFirst={selectedIndex === 0}
        isLast={selectedIndex === filteredWorks.length - 1}
    />
{/if}

<style>
  /* Стили остаются такими же, как были */
  .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 8rem 2rem 4rem;
    }
    .page-title {
        font-size: 2.5rem;
        margin-bottom: 2rem;
        text-align: center;
    }
    .tags-filter {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
    }
    .tags-filter:last-of-type {
        margin-bottom: 3rem;
    }
    .tag {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: transparent;
        color: var(--color-text);
        border-radius: 9999px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.875rem;
    }
    .tag:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
    }
    .tag.active {
        background-color: var(--color-accent);
        color: var(--color-background);
        border-color: var(--color-accent);
        font-weight: 700;
    }
    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }
    .card-button {
        padding: 0;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        width: 100%;
    }
    @media (min-width: 768px) {
        .page-title {
            font-size: 3rem;
        }
    }
</style>