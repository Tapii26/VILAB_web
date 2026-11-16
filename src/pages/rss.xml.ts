import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config/site';
import { getPublished } from '../utils/content';

/** Feed RSS con noticias y filtraciones: /rss.xml */
export async function GET(context: APIContext) {
  const noticias = (await getPublished('noticias')).map((p) => ({ ...p.data, link: `/noticias/${p.id}/` }));
  const filtraciones = (await getPublished('filtraciones')).map((p) => ({ ...p.data, link: `/filtraciones/${p.id}/` }));

  const items = [...noticias, ...filtraciones]
    .sort((a, b) => b.fecha.valueOf() - a.fecha.valueOf())
    .slice(0, 50)
    .map((p) => ({ title: p.titulo, description: p.descripcion, pubDate: p.fecha, link: p.link }));

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items,
    customData: `<language>${SITE.lang}</language>`,
  });
}
