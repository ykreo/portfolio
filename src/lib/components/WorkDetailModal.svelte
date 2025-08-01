<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	let {
		title,
		description,
		category,
		contentUrl,
		tags,
		onClose,
		onPrev,
		onNext,
		isFirst,
		isLast
	}: {
		title: string;
		description: string;
		category: 'video' | 'static';
		contentUrl: string;
		tags: string[];
		onClose: () => void;
		onPrev: () => void;
		onNext: () => void;
		isFirst: boolean;
		isLast: boolean;
	} = $props();

	let backdropEl: HTMLDivElement;
	const handleGlobalKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			onClose();
		}
		if (event.key === 'ArrowLeft' && !isFirst) {
			onPrev();
		}
		if (event.key === 'ArrowRight' && !isLast) {
			onNext();
		}
	};

	const handleBackdropClick = (event: MouseEvent) => {
		if (event.target === backdropEl) {
			onClose();
		}
	};

	const handleBackdropKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			if (event.target === backdropEl) {
				event.preventDefault();
				onClose();
			}
		}
	};

	onMount(() => {
		window.addEventListener('keydown', handleGlobalKeydown);
		document.body.style.overflow = 'hidden';
		backdropEl?.focus();
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleGlobalKeydown);
		document.body.style.overflow = 'auto';
	});
</script>

<div
	class="backdrop"
	role="dialog"
	aria-modal="true"
	tabindex="-1"
	bind:this={backdropEl}
	onclick={handleBackdropClick}
	onkeydown={handleBackdropKeydown}
>
	<button
		class="nav-button prev"
		onclick={onPrev}
		disabled={isFirst}
		aria-label="Previous work"
		data-cursor-hover
	>
		<ChevronLeft size={32} />
	</button>

	<div class="modal" role="document">
		<button class="close-button" onclick={onClose} aria-label="Close modal" data-cursor-hover
			>&times;</button
		>

		<div class="content-wrapper">
			{#if category === 'video'}
				<video
					src={contentUrl}
					controls
					autoplay
					loop
					class="content-media"
					controlslist="nodownload" 
					oncontextmenu={(e) => e.preventDefault()}
				>
					<track kind="captions" />
					Ваш браузер не поддерживает видео.
				</video>
			{:else}
				<img
					src={contentUrl}
					alt={title}
					class="content-media protected-image"
					oncontextmenu={(e) => e.preventDefault()}
				/>
				{/if}
		</div>

		<div class="details">
			<h2 class="title">{title}</h2>
			<p class="description">{description}</p>
			{#if tags}
				<div class="tags">
					{#each tags as tag}
						<span>{tag}</span>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<button
		class="nav-button next"
		onclick={onNext}
		disabled={isLast}
		aria-label="Next work"
		data-cursor-hover
	>
		<ChevronRight size={32} />
	</button>
</div>

<style>
  /* Стили остаются такими же */
  .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1001;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
    }

    .modal {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 90vw;
        height: 90vh;
        max-width: 1200px;
        background-color: var(--color-background);
        border-radius: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
    }

    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 50%;
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        z-index: 10;
        transition: background-color 0.2s ease;
    }
    .close-button:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    .content-wrapper {
        flex-shrink: 1;
        flex-grow: 1;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .content-media {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

	.protected-image {
		pointer-events: none; /* Делает изображение "невидимым" для курсора */
	}

    .details {
        padding: 1.5rem 2rem;
        overflow-y: auto;
        flex-shrink: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .title {
        font-size: clamp(1.25rem, 5vw, 2rem);
        margin-bottom: 1rem;
    }
    .description {
        opacity: 0.8;
        margin-bottom: 1.5rem;
        font-size: clamp(0.875rem, 3vw, 1rem);
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

    .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.3);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        z-index: 1002;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }
    .nav-button:hover:not(:disabled) {
        background: rgba(0, 0, 0, 0.6);
    }
    .nav-button:disabled {
        opacity: 0.2;
        cursor: not-allowed;
    }
    .nav-button.prev {
        left: 1rem;
    }
    .nav-button.next {
        right: 1rem;
    }

    @media (max-width: 768px) {
        .modal {
            width: 100vw;
            height: 100vh;
            border-radius: 0;
        }
        .nav-button {
            width: 40px;
            height: 40px;
            top: auto;
            bottom: 1.5rem;
            transform: none;
        }
        .nav-button.prev {
            left: 1rem;
        }
        .nav-button.next {
            right: 1rem;
        }
        .details {
            padding: 1.5rem 1rem;
        }
    }
</style>