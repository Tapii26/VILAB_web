/**
 * Definición de las colecciones de contenido.
 *
 * Cada artículo es UNA CARPETA con su texto y sus imágenes:
 *   src/content/noticias/nuevo-trailer/index.md   → /noticias/nuevo-trailer/
 *   src/content/noticias/nuevo-trailer/portada.jpg  (imagen: ./portada.jpg)
 *
 * Las carpetas y archivos que empiezan por "_" (p. ej. _plantilla/) se ignoran.
 */
import { defineCollection, type SchemaContext } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const PATTERN = ['**/*.md', '!**/_*', '!**/_*/**'];

// Campos comunes a cualquier artículo
const articulo = ({ image }: SchemaContext) =>
  z.object({
    titulo: z.string(),
    // Meta description para Google: ideal entre 120 y 160 caracteres
    descripcion: z.string().max(170),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    // Imagen principal, relativa a la carpeta del artículo: ./portada.jpg
    imagen: image().optional(),
    imagenAlt: z.string().optional(),
    // Autor de la imagen, se muestra como «Imagen: …». Obligatorio en imágenes de Rockstar
    imagenCredito: z.string().optional(),
    etiquetas: z.array(z.string()).default([]),
    // true = no se publica (solo visible con `npm run dev`)
    borrador: z.boolean().default(false),
  });

const noticias = defineCollection({
  loader: glob({ pattern: PATTERN, base: './src/content/noticias' }),
  schema: articulo,
});

const filtraciones = defineCollection({
  loader: glob({ pattern: PATTERN, base: './src/content/filtraciones' }),
  schema: (ctx) =>
    articulo(ctx).extend({
      // Escala interna (en la web solo se ve la palabra, con color de semáforo):
      // 1 = Muy probable · 2 = Probable · 3 = Poco probable · 4 = Improbable · 5 = Nada probable
      probabilidad: z.number().int().min(1).max(5),
      // Historial: pendiente (se muestra en Filtraciones) → confirmado / descartado (pasa a su sección)
      estado: z.enum(['pendiente', 'confirmado', 'descartado']).default('pendiente'),
      // Cuándo y cómo se confirmó o descartó (solo si estado no es pendiente)
      fechaResolucion: z.coerce.date().optional(),
      resolucion: z.string().optional(),
      fuente: z.string().optional(),
    }),
});

// La primera carpeta (historia, vehiculos, armas...) determina la sección de la guía
const guia = defineCollection({
  loader: glob({ pattern: PATTERN, base: './src/content/guia' }),
  schema: (ctx) =>
    articulo(ctx).extend({
      // Orden dentro de su sección (misión 1, 2, 3...)
      orden: z.number().default(0),
    }),
});

// Multimedia: vídeos de YouTube (lista en src/content/videos.yaml)
const videos = defineCollection({
  loader: file('src/content/videos.yaml'),
  schema: z.object({
    titulo: z.string(),
    // Código de 11 caracteres del enlace de YouTube (watch?v=XXXXXXXXXXX)
    youtube: z.string().regex(/^[\w-]{11}$/),
    fecha: z.coerce.date(),
    duracion: z.string().optional(),
    resumen: z.string(),
    canal: z.string().default('Rockstar Games'),
    destacado: z.boolean().default(false),
  }),
});

// Multimedia: galería de imágenes (imágenes + lista en src/content/galeria/)
const galeria = defineCollection({
  loader: file('src/content/galeria/galeria.yaml'),
  schema: ({ image }) =>
    z.object({
      archivo: image(),
      titulo: z.string(),
      categoria: z.enum(['Arte oficial', 'Personajes', 'Lugares', 'Acción']),
      credito: z.string().default('Rockstar Games'),
      destacada: z.boolean().default(false),
    }),
});

// Dónde comprar: tiendas externas a las que redirigimos (lista en src/content/tiendas.yaml)
const tiendas = defineCollection({
  loader: file('src/content/tiendas.yaml'),
  schema: z.object({
    nombre: z.string(),
    tipo: z.enum(['digital', 'fisica']),
    dominio: z.string(),
    sigla: z.string().max(2),
    ps5: z.string().url().optional(),
    xbox: z.string().url().optional(),
    nota: z.string().optional(),
    orden: z.number().default(0),
  }),
});

export const collections = { noticias, filtraciones, guia, videos, galeria, tiendas };
