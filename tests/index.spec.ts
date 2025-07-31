import { describe, test, vi, expect } from 'vitest';
import createCache from '../src';

describe('createCache', () => {
	test('basic cache lookup', () => {
		const computation = vi.fn(() => 1);
		const lookup = createCache<string, number>({ computation });

		expect(lookup('abc')).toBe(1);
		expect(computation).toHaveBeenCalledTimes(1);
		expect(computation).toHaveBeenCalledWith('abc');

		expect(lookup('abc')).toBe(1);
		expect(computation).toHaveBeenCalledTimes(1);

		expect(lookup('cba')).toBe(1);
		expect(computation).toHaveBeenCalledTimes(2);
		expect(computation).toHaveBeenCalledWith('cba');
	});

	test('cache rotating by size', () => {
		const computation = vi.fn(() => 1);
		const lookup = createCache<string, number>({ computation, cacheSize: 3 });

		lookup('abc1');
		expect(computation).toHaveBeenCalledTimes(1);
		expect(computation).toHaveBeenCalledWith('abc1');

		lookup('abc1');
		expect(computation).toHaveBeenCalledTimes(1);

		lookup('abc2');
		expect(computation).toHaveBeenCalledTimes(2);

		lookup('abc2');
		expect(computation).toHaveBeenCalledTimes(2);
		lookup('abc3');
		expect(computation).toHaveBeenCalledTimes(3);
		lookup('abc4');
		expect(computation).toHaveBeenCalledTimes(4);

		lookup('abc3');
		expect(computation).toHaveBeenCalledTimes(4);
		lookup('abc1');
		expect(computation).toHaveBeenCalledTimes(5);
	});
});
