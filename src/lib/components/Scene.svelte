<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import vertexShader from '$lib/shaders/vertex.glsl?raw';
	import fragmentShader from '$lib/shaders/fragment.glsl?raw';
	import { isLoading } from '$lib/stores/loader';

	type Props = {
		scrollY: number;
	};
	let { scrollY = 0 }: Props = $props();
	let canvasEl: HTMLCanvasElement;
	const mousePosition = new THREE.Vector2();

	// 👇 Переменные для управления анимацией
	let animationFrameId: number;
	let isTabVisible = true;

	onMount(() => {
		if (!browser) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			90,
			window.innerWidth / window.innerHeight,
			0.1,
			100
		);
		camera.position.z = 1;

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			antialias: true,
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const count = 100;
		const particlesGeometry = new THREE.BufferGeometry();
		const positions = new Float32Array(count * count * 3);

		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
				const index = (i * count + j) * 3;
				positions[index] = (i / count) * 20 - 10;
				positions[index + 1] = (j / count) * 20 - 10;
				positions[index + 2] = (Math.random() - 0.5) * 2;
			}
		}

		particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		const uniforms = {
			u_time: { value: 0.0 },
			u_mouse: { value: new THREE.Vector2() }
		};
		const particlesMaterial = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms,
			transparent: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});
		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		particles.rotation.x = -Math.PI / 4;
		scene.add(particles);

		const clock = new THREE.Clock();

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate); // 👈 Сохраняем ID

			const elapsedTime = clock.getElapsedTime();
			uniforms.u_time.value = elapsedTime;
			particles.rotation.y = scrollY * 0.0005;
			particles.position.z = -scrollY * 0.0005;

			camera.position.x += (mousePosition.x * 0.5 - camera.position.x) * 0.02;
			camera.position.y += (-mousePosition.y * 0.5 - camera.position.y) * 0.02;
			camera.lookAt(scene.position);

			renderer.render(scene, camera);
		};

		animate(); // 👈 Запускаем анимацию в первый раз

		const handleResize = () => {
			/* ... без изменений ... */
		};
		const handleMouseMove = (event: MouseEvent) => {
			/* ... без изменений ... */
		};

		// 👇 Логика для остановки/возобновления анимации
		const handleVisibilityChange = () => {
			if (document.hidden) {
				isTabVisible = false;
				cancelAnimationFrame(animationFrameId); // Останавливаем цикл
			} else {
				isTabVisible = true;
				animate(); // Возобновляем
			}
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('visibilitychange', handleVisibilityChange); // 👈 Добавляем слушатель

		setTimeout(() => {
			isLoading.set(false);
		}, 200);

		onDestroy(() => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('visibilitychange', handleVisibilityChange); // 👈 Убираем слушатель
			cancelAnimationFrame(animationFrameId); // 👈 На всякий случай останавливаем при размонтировании
		});
	});
</script>

<canvas bind:this={canvasEl} class="scene-canvas"></canvas>

<style>
	.scene-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		background-color: transparent;
	}
</style>
