# rotating-cache

Quick-and-dirty rotating cache for JS/TS. Caches a fixed amount of entries, and is pretty fast!

## Installation

```bash
# Any of the following
npm install rotating-cache
yarn add rotating-cache
bun add rotating-cache
```

## Usage

#### TypeScript

```ts
import createCache from 'rotating-cache';

const lookup = createCache<string, string>({
	computation: str => str.split('').reverse().join(''),
});

lookup('abc'); // 'cba', computed
lookup('bca'); // 'acb', computed
lookup('abc'); // 'cba', cached
lookup('bca'); // 'acb', cached
```

#### JavaScript (ESM)

```js
import createCache from 'rotating-cache';

const lookup = createCache({
	computation: str => str.split('').reverse().join(''),
});
```

#### JavaScript (CJS)

```js
const createCache = require('rotating-cache');

const lookup = createCache({
	computation: str => str.split('').reverse().join(''),
});
```

### Caching

`createCache` accepts `hash` and `cacheSize` as props. `hash` will take the given value and calculate a unique identifier from it (defaults to `String`) while `cacheSize` is the total size of cached entries.

While caching, each entry is checked in two parallel caches. The older cache will be cycled out and replaced with the newer cache every time the newer cache is full.
