export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
	let timer: number;
	return function (...args: Parameters<T>) {
		window.clearTimeout(timer);
		timer = window.setTimeout(() => fn(...args), delay); // Use spread instead of apply
	};
}
