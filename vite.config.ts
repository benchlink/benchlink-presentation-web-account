import viteLegacyPlugin from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";

import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import {viteSingleFile} from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		svgr(),
		splitVendorChunkPlugin(), // For production build environments only
		viteLegacyPlugin({
			targets: [
				"chrome >= 64",
				"edge >= 79",
				"safari >= 11.1",
				"firefox >= 67",
			],
			// ignoreBrowserslistConfig: true,
			renderLegacyChunks: true,
			/**
			 * Polyfills required by modern browsers
			 *
			 * Since some low-version modern browsers do not support the new syntax
			 * You need to load polyfills corresponding to the syntax to be compatible
			 * At build, all required polyfills are packaged according to the target browser version range
			 * But when the page is accessed, only the required part is loaded depending on the browser version
			 *
			 * Two configuration methods:
			 *
			 * 1. true
			 *  - Automatically load all required polyfills based on the target browser version range
			 *  - Demerit: will introduce polyfills that are not needed by modern browsers in higher versions,
			 *    as well as more aggressive polyfills.
			 *
			 * 2、string[]
			 *  - Add low-version browser polyfills as needed
			 *  - Demerit: It needs to be added manually, which is inflexible;
			 *    it will be discovered after the production is deployed, resulting in production failure! ! !
			 */
			// modernPolyfills: ["es/global-this"]
			//  or
			modernPolyfills: true,
		}),
		viteSingleFile({ useRecommendedBuildConfig: false })
	],
	server: {
		host: true,
		open: true,
		port: 3000,
	},
	build: {
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				manualChunks: undefined,
				inlineDynamicImports: false,
				format: "iife"
			},
		},
	},
});
