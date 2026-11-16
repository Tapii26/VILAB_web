import { getCollection, type CollectionEntry } from 'astro:content';
import { GUIDE_SECTIONS } from '../config/site';

type Coleccion = 'noticias' | 'filtraciones' | 'guia';

/** Artículos publicados (sin borradores en producción), del más reciente al más antiguo */
export async function getPublished<C extends Coleccion>(coleccion: C): Promise<CollectionEntry<C>[]> {
  const items = (await getCollection(coleccion, ({ data }) => import.meta.env.DEV || !data.borrador)) as CollectionEntry<C>[];
  return items.sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
}

/** Vídeos de YouTube, del más reciente al más antiguo */
export async function getVideos() {
  return (await getCollection('videos')).sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
}

/** Imágenes de la galería en el orden de galeria.yaml */
export async function getGaleria() {
  return getCollection('galeria');
}

/** Los `n` elementos para un carrusel: primero los marcados como destacados, luego el resto */
export function paraCarrusel<T>(items: T[], esDestacado: (item: T) => boolean, n = 4) {
  return [...items.filter(esDestacado), ...items.filter((i) => !esDestacado(i))].slice(0, n);
}

/** Separa el id de un artículo de la guía ("vehiculos/infernus") en sección y slug */
export function splitGuideId(id: string) {
  const [seccion, ...resto] = id.split('/');
  return { seccion, slug: resto.join('/') };
}

/** Escala interna de probabilidad de las filtraciones: el número no se muestra, solo el texto */
export const PROBABILIDAD = ['Muy probable', 'Probable', 'Poco probable', 'Improbable', 'Nada probable'] as const;

export function textoProbabilidad(n: number) {
  return PROBABILIDAD[n - 1];
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

/**
 * Enlace de cada sección de la guía, para no pasar por una página intermedia innecesaria:
 * - con un solo artículo → directamente a ese artículo
 * - con varios o ninguno → a la página de la sección (/guia/<slug>/), que lista los artículos o dice «Próximamente»
 * Devuelve { slug: href }. Úsalo en todos los enlaces a secciones de la guía.
 */
export async function enlacesGuia(): Promise<Record<string, string>> {
  const entradas = await getPublished('guia');
  const porSeccion: Record<string, string[]> = {};
  for (const e of entradas) (porSeccion[splitGuideId(e.id).seccion] ??= []).push(e.id);
  return Object.fromEntries(GUIDE_SECTIONS.map((s) => {
    const ids = porSeccion[s.slug] ?? [];
    return [s.slug, ids.length === 1 ? `/guia/${ids[0]}/` : `/guia/${s.slug}/`];
  }));
}

/** Convierte un enlace /guia/<seccion>/ en su destino real (ver enlacesGuia). Otros enlaces no cambian. */
export function resolverEnlaceGuia(href: string, enlaces: Record<string, string>) {
  const m = href.match(/^\/guia\/([^/]+)\/$/);
  return (m && enlaces[m[1]]) || href;
}
