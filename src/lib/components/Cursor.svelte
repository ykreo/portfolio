<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let cursorEl: SVGElement;
	let isHovering = $state(false);
	let isDown = $state(false);

	onMount(() => {
		if (!browser) return;

		// Устанавливаем начальную точку трансформации SVG
		gsap.set(cursorEl, { transformOrigin: '0 0' });

		const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		const mouse = { x: pos.x, y: pos.y };
		const speed = 0.4; // Скорость "догоняния" курсора

		// Используем quickSetter для максимальной производительности
		const xSet = gsap.quickSetter(cursorEl, 'x', 'px');
		const ySet = gsap.quickSetter(cursorEl, 'y', 'px');

		gsap.ticker.add(() => {
			const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
			pos.x += (mouse.x - pos.x) * dt;
			pos.y += (mouse.y - pos.y) * dt;
			xSet(pos.x);
			ySet(pos.y);
		});

		// Отслеживаем движение мыши
		const onMouseMove = (event: MouseEvent) => {
			mouse.x = event.clientX;
			mouse.y = event.clientY;
		};

		// Проверяем, находится ли курсор над интерактивным элементом
		const onMouseOver = (event: MouseEvent) => {
			if ((event.target as Element).closest('[data-cursor-hover]')) {
				isHovering = true;
			}
		};
		const onMouseOut = (event: MouseEvent) => {
			if ((event.target as Element).closest('[data-cursor-hover]')) {
				isHovering = false;
			}
		};
		
		// Отслеживаем нажатие кнопки мыши
		const onMouseDown = () => (isDown = true);
		const onMouseUp = () => (isDown = false);

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('mouseover', onMouseOver, true);
		window.addEventListener('mouseout', onMouseOut, true);

		// Очистка при размонтировании компонента
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mousedown', onMouseDown);
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('mouseover', onMouseOver, true);
			window.removeEventListener('mouseout', onMouseOut, true);
		};
	});

	// Анимация размера и состояния курсора
	$effect(() => {
		if (browser && cursorEl) {
			gsap.to(cursorEl, {
				scale: isDown ? 0.8 : isHovering ? 1.2 : 1, // Уменьшаем при клике, увеличиваем при наведении
				duration: 0.3,
				ease: 'power3.out'
			});
		}
	});
</script>

<svg
	bind:this={cursorEl}
	class="custom-cursor"
	class:is-hovering={isHovering}
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M1,1 L1,19 L7,15 L12,15 Z"
		class:is-hovering={isHovering}
	/>
</svg>

<style>

	.custom-cursor {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 9999;
		/* Убираем лишние стили от круга */
		overflow: visible; 
	}
	
	.custom-cursor path {
		fill: rgba(255, 255, 255, 0.8);
		stroke: rgba(17, 17, 17, 0.5); /* Добавим легкую обводку для контраста */
		stroke-width: 1;
		transition: fill 0.3s ease;
	}
	
	/* При наведении на интерактивный элемент, меняем цвет заливки */
	.custom-cursor path.is-hovering {
		fill: var(--color-accent);
	}
</style>