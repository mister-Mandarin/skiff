import type { APIRoute } from 'astro';

// Получаем URL сайта из конфига Astro
const siteUrl = import.meta.env.SITE;

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', siteUrl).href}
`;

export const GET: APIRoute = () => {
    return new Response(robotsTxt, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
};