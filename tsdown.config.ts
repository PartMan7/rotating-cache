import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: ['./src/index.ts'],
	platform: 'neutral',
	format: ['esm', 'cjs'],
	dts: {
		isolatedDeclarations: true,
	},
});
