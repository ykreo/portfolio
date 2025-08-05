<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="preloader-backdrop" transition:fade={{ duration: 500 }}>
	<div class="logo-container" transition:fade={{ duration: 300, delay: 100 }}>
		<span class="logo-text">YKREO</span>
	</div>
</div>

<style>
	.preloader-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--color-background);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logo-container {
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text);
	}
	.logo-text {
		animation: breathe 2s ease-in-out infinite;
	}
	@keyframes breathe {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}
</style>
