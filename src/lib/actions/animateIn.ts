// src/lib/actions/animateIn.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { browser } from '$app/environment';
import { activeSection } from '$lib/stores/activeSection';

// Регистрируем плагин ScrollTrigger, если мы в браузере
if (browser) {
	gsap.registerPlugin(ScrollTrigger);
}

interface AnimateInOptions {
	from?: gsap.TweenVars;
	to?: gsap.TweenVars;
}

export function animateIn(node: HTMLElement, options?: AnimateInOptions) {
	// Параметры анимации по умолчанию
	const from: gsap.TweenVars = options?.from ?? { y: 30, opacity: 0 };
	const to: gsap.TweenVars = options?.to ?? {
		y: 0,
		opacity: 1,
		duration: 0.8,
		ease: 'power3.out'
	};

	// Создаем анимацию, которая сработает, когда элемент появится в поле зрения
	gsap.fromTo(node, from, {
		...to,
		scrollTrigger: {
			trigger: node,
			start: 'top 90%', // Анимация начнется, когда верх элемента достигнет 90% высоты экрана
			toggleActions: 'play none none none' // Проиграть один раз и больше не повторять
		}
	});
}
export function scrollSpy(node: HTMLElement) {
	if (!browser) return;

	// IntersectionObserver - это API браузера для отслеживания видимости элементов
	const observer = new IntersectionObserver(
		(entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				// Когда секция становится видимой, обновляем наше хранилище ее id
				activeSection.set(node.id);
			}
		},
		{
			rootMargin: '-50% 0px -50% 0px' // Секция считается активной, когда она находится в центре экрана
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
