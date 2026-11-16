// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: SITE.url,
  // Genera /noticias/mi-articulo/index.html → URLs limpias en Hostinger (Apache)
  build: { format: 'directory' },
  // Imágenes adaptables: también las que van dentro del texto de los artículos (Markdown)
  // se generan en varios tamaños y el navegador descarga solo la que necesita.
  // Tamaños limitados para que la web generada no pese demasiado (el texto mide como máximo ~820 px).
  // `domains`: las miniaturas de YouTube se descargan al generar la web y se sirven desde nuestro servidor,
  // así el navegador no contacta con Google hasta que el usuario pulsa «reproducir» (privacidad / cookies).
  image: { layout: 'constrained', breakpoints: [640, 960, 1280, 1640], domains: ['i.ytimg.com'] },
  // Las páginas legales y la 404 no se incluyen en el sitemap
  integrations: [sitemap({ filter: (page) => !page.includes('/legal/') && !page.includes('/404') })],
});
