/**
 * CONFIGURACIÓN CENTRAL DE VI LAB GAMING
 * --------------------------------
 * Todo lo que sea "global" de la web se cambia SOLO aquí:
 * nombre, dominio, fecha de lanzamiento, menú y secciones de la guía.
 */

export const SITE = {
  name: 'VI LAB GAMING',
  // Dominio principal (sin barra final). vilabgaming.com y vilabgaming.online redirigen aquí desde Hostinger.
  url: 'https://vilabgaming.es',
  title: 'VI LAB GAMING — Noticias, filtraciones y guía de GTA 6',
  description:
    'Todo sobre GTA 6 en español: noticias, filtraciones, fecha de lanzamiento, trucos, coleccionables, vehículos, armas y guía completa del modo historia.',
  lang: 'es',
  locale: 'es_ES',
  // Imagen por defecto para compartir en redes (1200x630). Colocar en public/img/
  defaultImage: '/img/og-default.jpg',
  // Fecha de lanzamiento de GTA VI (hora peninsular). Verificar con fuentes oficiales.
  launchDate: '2026-11-19T00:00:00+01:00',
  social: {
    // Rellenar cuando existan, se mostrarán en el pie automáticamente
    x: '',
    instagram: '',
    youtube: '',
    tiktok: '',
  },
} as const;

/**
 * Banner principal de la portada.
 * Las imágenes van en src/assets/banners/ (JPG/PNG originales, se optimizan solas al generar la web).
 * Para cambiar el banner: copiar la imagen a esa carpeta y poner aquí su nombre.
 */
export const HERO = {
  imagen: 'jason-lucia-playa.jpg',
  // Versión vertical para móviles (opcional: si se deja vacío se usa la principal recortada)
  imagenMovil: 'jason-lucia-playa-movil.jpg',
  alt: 'Jason y Lucia en una playa de Vice City al atardecer',
  credito: 'Rockstar Games',
};

/** Menú principal (cabecera) */
export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Noticias', href: '/noticias/' },
  { label: 'Filtraciones', href: '/filtraciones/' },
  { label: 'Guía', href: '/guia/' },
  { label: 'Multimedia', href: '/multimedia/' },
  { label: 'Comprar', href: '/donde-comprar/' },
  { label: 'FAQ', href: '/preguntas-frecuentes/' },
  { label: 'Contacto', href: '/contacto/' },
] as const;

/**
 * Accesos rápidos (barra bajo el banner de la portada).
 * `icono` es uno de los definidos en src/components/Icono.astro.
 */
export const QUICK_NAV = [
  { label: 'Novedades', href: '/noticias/', icono: 'rayo' },
  { label: 'Trucos', href: '/guia/trucos/', icono: 'mando' },
  { label: 'Mapa', href: '/guia/mapa/', icono: 'mapa' },
  { label: 'Personajes', href: '/guia/personajes/', icono: 'persona' },
  { label: 'Vehículos', href: '/guia/vehiculos/', icono: 'coche' },
  { label: 'Ganar dinero', href: '/guia/dinero/', icono: 'dinero' },
  { label: 'Coleccionables', href: '/guia/coleccionables/', icono: 'estrella' },
  { label: 'Comprar', href: '/donde-comprar/', icono: 'carrito' },
] as const;

/**
 * Secciones de la guía. Cada `slug` corresponde a una carpeta en
 * src/content/guia/<slug>/ y genera la página /guia/<slug>/
 * Para añadir una sección nueva: añadirla aquí, crear su carpeta y poner su imagen de portada en
 * src/assets/guia/<slug>.jpg (si no hay imagen, la tarjeta sale solo con color).
 * `icono`: clave de src/components/Icono.astro · `grupo`: bloque de /guia/ (GUIDE_GROUPS).
 */
export const GUIDE_SECTIONS = [
  { slug: 'mapa', title: 'Mapa de Leonida', description: 'Zonas, Vice City y puntos de interés del mapa.', icono: 'mapa', grupo: 'mundo' },
  { slug: 'historia', title: 'Modo Historia', description: 'Guía paso a paso de todas las misiones de la historia.', icono: 'libro', grupo: 'mundo' },
  { slug: 'personajes', title: 'Personajes', description: 'Lucia, Jason y el resto de personajes de GTA VI.', icono: 'persona', grupo: 'mundo' },
  { slug: 'vehiculos', title: 'Vehículos', description: 'Ubicación de vehículos y coches especiales.', icono: 'coche', grupo: 'equipo' },
  { slug: 'armas', title: 'Armas', description: 'Todas las armas, dónde conseguirlas y sus estadísticas.', icono: 'diana', grupo: 'equipo' },
  { slug: 'propiedades', title: 'Propiedades', description: 'Inmuebles y negocios que puedes comprar.', icono: 'casa', grupo: 'equipo' },
  { slug: 'trucos', title: 'Trucos', description: 'Todos los trucos y códigos de GTA 6.', icono: 'mando', grupo: 'completar' },
  { slug: 'dinero', title: 'Cómo ganar dinero', description: 'Los mejores métodos para hacerte rico en GTA VI.', icono: 'dinero', grupo: 'completar' },
  { slug: 'coleccionables', title: 'Coleccionables', description: 'Ubicación de todos los coleccionables.', icono: 'estrella', grupo: 'completar' },
  { slug: 'logros', title: 'Logros y trofeos', description: 'Lista completa de logros y trofeos y cómo conseguirlos.', icono: 'trofeo', grupo: 'completar' },
] as const;

/** Bloques de la portada de la guía (/guia/). `color` = token CSS de global.css */
export const GUIDE_GROUPS = [
  { id: 'mundo', title: 'Conoce Leonida', description: 'El mapa, la historia y sus protagonistas.', icono: 'brujula', color: 'var(--guia-mundo)' },
  { id: 'equipo', title: 'Equípate', description: 'Coches, armas y propiedades confirmados.', icono: 'llave', color: 'var(--guia-equipo)' },
  { id: 'completar', title: 'Llega al 100 %', description: 'Trucos, dinero, coleccionables y logros.', icono: 'trofeo', color: 'var(--guia-completar)' },
] as const;

export type GuideSectionSlug = (typeof GUIDE_SECTIONS)[number]['slug'];

/** Enlaces del pie de página */
export const LEGAL_LINKS = [
  { label: 'Aviso legal', href: '/legal/aviso-legal/' },
  { label: 'Privacidad', href: '/legal/privacidad/' },
  { label: 'Cookies', href: '/legal/cookies/' },
  { label: 'Derechos de autor', href: '/legal/derechos-de-autor/' },
] as const;

/**
 * Datos legales (LSSI-CE art. 10, RGPD). Fuente: Textos_legales_blog_GTA_VI.docx.
 * Se usan en las páginas de /legal/ y en el aviso del formulario de contacto.
 */
export const LEGAL = {
  titulares: ['Juan José Tapiador Gómez', 'Enrique Tato González-Camino'],
  nif: ['06017730-X', '54209104-J'],
  // Responsable del tratamiento de datos personales (RGPD)
  responsable: { nombre: 'Juan José Tapiador Gómez', nif: '06017730-X' },
  domicilio: 'Calle Mauricio Legendre, 21, 7ºC, 28046 Madrid',
  email: 'jjtapiador1@gmail.com',
  dominios: ['vilabgaming.es', 'vilabgaming.com', 'vilabgaming.online'],
  // País del servidor de Hostinger
  servidor: 'Francia',
  // Fecha de la última revisión de los textos legales (AAAA-MM-DD)
  actualizado: '2026-11-16',
} as const;
