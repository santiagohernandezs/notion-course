import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import { astroImageTools } from 'astro-imagetools'
import { defineConfig } from 'astro/config'

import robotsTxt from 'astro-robots-txt'

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		react(),
		astroImageTools,
		robotsTxt({
			policy: [
				{
					userAgent: '*',
					allow: '/',
					disallow: '/api',
					crawlDelay: 10
				},
				{
					userAgent: 'Googlebot',
					allow: '/',
					disallow: '/api',
					crawlDelay: 10
				}
			],
			sitemap: false
		})
	],
	output: 'server',
	adapter: vercel(),
	redirects: {
		'/in': '/inscribete'
	},
	devToolbar: {
		enabled: false
	}
})
