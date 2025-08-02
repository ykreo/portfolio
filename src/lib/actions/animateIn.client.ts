import { cubicOut } from 'svelte/easing';
import type { ActionReturn } from 'svelte/action';

type AnimateInParams = {
	delay?: number;
	duration?: number;
	y?: number;
	visible?: boolean;
};

const clientAnimateIn = (
	node: HTMLElement,
	params: AnimateInParams | undefined
): ActionReturn<AnimateInParams | undefined> => {
	let { delay = 0, duration = 250, y = 10, visible = true } = params || {};

	if (!visible) {
		return {
			update: () => {},
			destroy: () => {}
		};
	}

	const style = getComputedStyle(node);
	const opacity = +style.opacity;

	node.style.opacity = '0';
	node.style.transform = `translateY(${y}px)`;

	const tick = (t: number) => {
		const progress = Math.max(0, Math.min(1, t));
		const eased = cubicOut(progress);
		node.style.opacity = String(eased * opacity);
		node.style.transform = `translateY(${y - eased * y}px)`;
	};

	let startTime: number | null = null;
	let frame: number;

	const animate = (timestamp: number) => {
		if (startTime === null) startTime = timestamp;
		const elapsed = timestamp - startTime;
		const progress = elapsed / duration;

		if (progress < 1) {
			tick(progress);
			frame = requestAnimationFrame(animate);
		} else {
			tick(1);
		}
	};

	const timeout = setTimeout(() => {
		frame = requestAnimationFrame(animate);
	}, delay);

	return {
		destroy() {
			if (frame) cancelAnimationFrame(frame);
			if (timeout) clearTimeout(timeout);
		},
		update(newParams: AnimateInParams | undefined) {
			const updatedParams = newParams || {};
			delay = updatedParams.delay ?? delay;
			duration = updatedParams.duration ?? duration;
			y = updatedParams.y ?? y;
			visible = updatedParams.visible ?? visible;
		}
	};
};

export default clientAnimateIn;
