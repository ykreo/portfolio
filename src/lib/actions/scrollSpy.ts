// src/lib/actions/scrollSpy.ts
import { browser } from '$app/environment';
import { activeSection } from '$lib/stores/activeSection';

export function scrollSpy(node: HTMLElement) {
	if (!browser) return;

	// IntersectionObserver - это API браузера для отслеживания видимости элементов.
	// Он позволяет эффективно определять, когда элемент входит в область просмотра.
	const observer = new IntersectionObserver(
		(entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				// Когда секция становится видимой, мы обновляем наше хранилище (store),
				// записывая в него id этой секции.
				activeSection.set(node.id);
			}
		},
		{
			// Секция будет считаться "активной", когда ее центр находится в центре экрана.
			// `rootMargin: '-50% 0px -50% 0px'` создает горизонтальную линию
			// ровно посередине вьюпорта для срабатывания.
			rootMargin: '-50% 0px -50% 0px'
		}
	);

	// Начинаем следить за элементом, к которому применена эта Action.
	observer.observe(node);

	// Функция destroy вызывается, когда элемент удаляется со страницы.
	// Она нужна для очистки и предотвращения утечек памяти.
	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}
