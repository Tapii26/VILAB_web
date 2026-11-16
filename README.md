# VI LAB GAMING

Portal de noticias, filtraciones y guía de GTA VI. Hecho con [Astro](https://astro.build) y publicado como web estática en un VPS de Hostinger (Easypanel).

## Comandos

| Comando           | Qué hace                                                              |
| ----------------- | --------------------------------------------------------------------- |
| `npm install`     | Instala dependencias (solo la primera vez o en un PC nuevo)            |
| `npm run dev`     | Abre la web en local en http://localhost:4321 con recarga automática  |
| `npm run build`   | Genera la web final en la carpeta `dist/`                             |
| `npm run preview` | Muestra en local la versión generada en `dist/`                       |

## Estructura

```
src/
├── config/site.ts       ← Nombre, dominio, FECHA DE LANZAMIENTO, BANNER, menú y secciones de la guía
├── content/             ← TODO EL CONTENIDO (1 carpeta = 1 artículo, con su texto y sus imágenes)
│   ├── noticias/
│   ├── filtraciones/
│   ├── guia/<sección>/  (historia, personajes, mapa, trucos, dinero, coleccionables,
│   │                     vehiculos, armas, propiedades, logros)
│   ├── videos.yaml      ← Lista de vídeos de YouTube de Multimedia
│   └── galeria/         ← Imágenes de Multimedia + galeria.yaml con sus datos
├── assets/banners/      ← Imágenes de banner (se optimizan solas)
├── assets/fondos/       ← Imágenes de fondo de página, p. ej. contacto (componente Fondo.astro)
├── content.config.ts    ← Campos permitidos en cada tipo de artículo
├── layouts/             ← Plantillas: Base (SEO), Page (páginas simples), Article (artículos)
├── components/          ← Cabecera, pie, banner, contador, tarjetas, créditos, migas de pan, SEO
├── pages/               ← Rutas de la web (cada archivo = una URL)
├── styles/global.css    ← Estilos y variables de diseño
└── utils/content.ts     ← Funciones de ayuda (listar publicados, fechas)
public/                  ← Se copia tal cual: favicon, imagen para redes, .htaccess, robots.txt, contacto.php
recursos/                ← Banco de imágenes originales y lista de vídeos. NO se sube a la web.
docs/                    ← Notas internas y pendientes (p. ej. cookies). NO se sube a la web.
scripts/                 ← Utilidades (reducir-imagenes.mjs se ejecuta solo con `npm run build`).
dist/                    ← Se genera con `npm run build`. NO se edita a mano.
```

## Publicar un artículo

Cada artículo es **una carpeta** que contiene su texto (`index.md`) y sus imágenes.

```
src/content/noticias/nuevo-trailer/
├── index.md        ← el texto
└── portada.jpg     ← sus imágenes, del tamaño que sean
```

1. Copia la carpeta `_plantilla` de la sección (`noticias`, `filtraciones` o `guia`) y renómbrala sin el guion bajo.
   El nombre de la carpeta es la URL: `noticias/nuevo-trailer/` → `/noticias/nuevo-trailer/`.
   Usa minúsculas, sin tildes ni espacios.
   En la guía va dentro de su sección: `guia/vehiculos/infernus/` → `/guia/vehiculos/infernus/`.
2. Mete las imágenes dentro de esa carpeta. No hace falta reducirlas: `npm run build` las ajusta a
   2400 px como máximo y las convierte a WebP en varios tamaños. Puedes cogerlas de `recursos/imagenes/`
   (ahí se conservan los originales a tamaño completo).
   Para poner el crédito bajo una imagen del texto, escribe `*Imagen: Rockstar Games*` en la línea siguiente.
3. Rellena los datos de cabecera de `index.md` (`imagen: ./portada.jpg`) y escribe el texto.
4. Si la imagen es de Rockstar, pon `imagenCredito: Rockstar Games`: el pie «Imagen: Rockstar Games» sale solo.
5. Pon `borrador: false` (o borra la línea) cuando esté listo.

Los listados, la portada, el sitemap, el RSS, las etiquetas SEO y la imagen para redes se actualizan solos.

## Cambiar el banner de la portada

1. Copia la imagen (panorámica) a `src/assets/banners/`. Opcional: una versión vertical para móvil.
2. En `src/config/site.ts`, en `HERO`, pon el nombre del archivo, la descripción (`alt`) y el crédito.

## Multimedia: añadir vídeos e imágenes

**Vídeo nuevo:** abre `src/content/videos.yaml`, copia un bloque y rellena título, código de YouTube
(los 11 caracteres tras `watch?v=`), fecha y resumen. Solo vídeos del canal oficial de Rockstar.

**Imagen nueva:** copia la imagen a `src/content/galeria/` y añade una entrada en `galeria.yaml`
con su título, categoría (Arte oficial, Personajes, Lugares o Acción) y crédito.

En ambos casos, `destacado: true` / `destacada: true` hace que aparezca en el carrusel de /multimedia/
(se muestran 4). El crédito y la fuente salen solos.

## Imágenes y créditos

- `recursos/imagenes/CREDITOS.md` indica qué imágenes hay que citar (código `Rockstar Games`) y cuáles no (`PD`).
- `recursos/videos.md` tiene los vídeos oficiales con enlace y resumen (referencia). La web usa `src/content/videos.yaml`.

## Publicar (GitHub → Easypanel)

La web vive en un VPS de Hostinger gestionado con Easypanel, que la construye con el `Dockerfile`:

1. Guarda los cambios en Git y súbelos a la rama `main` (`git add -A`, `git commit -m "..."`, `git push`).
2. Easypanel (servicio de tipo *App*, fuente GitHub, rama `main`, compilación *Dockerfile*) descarga el
   repositorio, ejecuta `npm run build` y sirve `dist/` con Apache + PHP (puerto 80).
   Con el despliegue automático activado lo hace solo en cada `push`; si no, pulsa *Deploy*.
3. El formulario de contacto envía el correo por SMTP. Variables de entorno del servicio en Easypanel:
   `SMTP_USER=web@vilabgaming.es`, `SMTP_PASS=<contraseña del buzón>` y, opcionales,
   `SMTP_HOST` (por defecto `smtp.hostinger.com`) y `SMTP_PORT` (por defecto `465`).
   La contraseña solo se guarda en Easypanel, nunca en el repositorio.

Si un despliegue falla, el registro está en Easypanel → servicio → *Deployments*.

## Antes de la primera publicación

- [x] Dominio real (`vilabgaming.es`) en `src/config/site.ts` y en `public/robots.txt`
- [ ] Crear el buzón `web@vilabgaming.es` en Hostinger (remitente de `public/contacto.php`)
- [ ] Redirigir `vilabgaming.com` y `vilabgaming.online` a `vilabgaming.es` en Hostinger
- [x] Textos legales: datos en `LEGAL` (`src/config/site.ts`), páginas en `src/pages/legal/` (base: `Textos_legales_blog_GTA_VI.docx`)
- [ ] Revisar con Hostinger: centro de datos en la UE y contrato de encargo de tratamiento (DPA)
- [x] Imagen para redes `public/img/og-default.jpg` (1200×630)
- [ ] Verificar la fecha de lanzamiento en `src/config/site.ts`
- [ ] Dar de alta la web en Google Search Console y enviar `sitemap-index.xml`
