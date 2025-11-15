// @ts-check
import { defineConfig } from 'astro/config';
import { webcore } from 'webcoreui/integration'

import purgecss from 'astro-purgecss';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.skif.ru/',
    integrations: [webcore(), purgecss()],
});