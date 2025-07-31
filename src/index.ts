const DEFAULT_CACHE_SIZE = 1000;

export default function createCache<V, T>({
	computation,
	hash = (value: V) => String(value),
	cacheSize = DEFAULT_CACHE_SIZE,
}: {
	computation: (value: V) => T;
	hash?: (value: V) => string;
	cacheSize?: number;
}): (value: V) => T {
	const cache: Record<'main' | 'past', Record<string, T>> = {
		main: {},
		past: {},
	};

	const perCacheLimit = Math.floor((cacheSize + 1) / 2);

	function rotateIfNeeded(): void {
		if (Object.keys(cache.main).length >= perCacheLimit) {
			[cache.main, cache.past] = [{}, cache.main];
		}
	}

	return (value: V): T => {
		const lookup = hash(value);
		const mainLookup = cache.main[lookup];
		if (mainLookup) return mainLookup;

		const pastLookup = cache.past[lookup];
		if (pastLookup) {
			cache.main[lookup] = pastLookup;
			rotateIfNeeded();
			return pastLookup;
		}

		const computed = computation(value);
		cache.main[lookup] = computed;

		rotateIfNeeded();
		return computed;
	};
}
