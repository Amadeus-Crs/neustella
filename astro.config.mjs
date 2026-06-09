// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 部署配置：请替换为你的仓库名
  // 如果仓库名是 username.github.io，则 base 设为 '/'
  site: 'https://Amadeus-Crs.github.io',
  base: '/neustella',

  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});
