// @ts-check
import { defineConfig } from 'astro/config';
import { webcore } from 'webcoreui/integration'

import purgecss from 'astro-purgecss';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: 'https://www.skif.ru/',
  integrations: [webcore(), purgecss()],
  adapter: node({ mode: 'standalone' }),
});