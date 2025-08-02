import { browser } from '$app/environment';
import type { Action, ActionReturn } from 'svelte/action';

type AnimateInParams = {
	delay?: number;
	duration?: number;
	y?: number;
	visible?: boolean;
};

export const animateIn: Action<HTMLElement, AnimateInParams | undefined> = (node, params) => {
	let actionInstance: ActionReturn<AnimateInParams | undefined>;

	if (!browser) {
		return {
			update: () => {},
			destroy: () => {}
		};
	}

	// Динамически импортируем модуль и указываем его точный тип
	const promise = import('./animateIn.client').then(
		(module: {
			default: (
				node: HTMLElement,
				params: AnimateInParams | undefined
			) => ActionReturn<AnimateInParams | undefined>;
		}) => {
			if (node) {
				actionInstance = module.default(node, params);
			}
		}
	);

	return {
		update(newParams) {
			promise.then(() => {
				actionInstance?.update?.(newParams);
			});
		},
		destroy() {
			promise.then(() => {
				actionInstance?.destroy?.();
			});
		}
	};
};

export default animateIn;
