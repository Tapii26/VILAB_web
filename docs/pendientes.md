# Pendientes internos (no se publica)

> **16/11/2026:** textos legales aplicados desde `Textos_legales_blog_GTA_VI.docx`. La política de cookies ya
> refleja YouTube (aviso bajo cada vídeo, consentimiento al pulsar «reproducir») y las miniaturas se sirven desde
> nuestro servidor. Las notas de abajo quedan como historial y para cuando se añada analítica o publicidad.

## Cookies: revisar con el compañero responsable

La política actual (`src/pages/legal/cookies.astro`) dice que la web **no usa cookies**. Eso ya no es
del todo cierto por los vídeos de YouTube. Puntos a tener en cuenta al redactar la política definitiva:

### 1. Vídeos de YouTube (Multimedia)
- Páginas afectadas: `/multimedia/` y `/multimedia/videos/` (y cualquier página futura que use `VideoCard`).
- Mientras el usuario **no pulsa reproducir**, solo se carga la miniatura desde `i.ytimg.com` (servidor de
  imágenes de YouTube). No se carga el reproductor.
- Al **pulsar reproducir** se inserta el reproductor de `youtube-nocookie.com` (modo de privacidad mejorada
  de YouTube). Aun así, YouTube/Google **puede guardar cookies o datos en el navegador** al reproducir.
- Decidir: ¿basta con informarlo en la política o hay que pedir consentimiento antes de reproducir
  (por ejemplo, un aviso en el propio vídeo: «Al reproducir, YouTube puede usar cookies»)?
- Nota: la carga de miniaturas desde `i.ytimg.com` envía la IP del visitante a Google. Valorar si es
  necesario mencionarlo o descargar las miniaturas a la propia web.

### 2. Lo que la web NO usa a día de hoy
- No hay analítica (Google Analytics, etc.) ni publicidad (AdSense, etc.).
- No hay fuentes de Google Fonts ni otros recursos de terceros, salvo YouTube.
- El formulario de contacto (`public/contacto.php`) no crea cookies: solo envía un email.
- Las preferencias del navegador (si las hubiera) no se guardan.

### 3. Si en el futuro se añade analítica o publicidad
- Hará falta un **banner de consentimiento** antes de cargarlas, y actualizar la política.
- Con publicidad, revisar también la política de Rockstar sobre su material (uso «no comercial»):
  https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz

## Publicidad en la web (decidido 12/11/2026: sí a anuncios poco invasivos, no a afiliados)

Antes de activar anuncios (p. ej. Google AdSense):
- **Banner de consentimiento obligatorio** antes de cargar ningún anuncio (LSSI art. 22.2, guía de cookies de la AEPD).
  Google exige además, en Europa, una plataforma de consentimiento certificada (CMP con IAB TCF).
- Actualizar **política de cookies y de privacidad** (qué empresas ponen cookies y para qué).
- **Aviso legal** con los datos del titular (LSSI art. 10): ya estaba pendiente.
- Los anuncios deben verse claramente como publicidad (etiqueta «Publicidad»).
- Ingresos a declarar; consultar con gestor si hace falta alta en IAE / autónomos.
- **Rockstar:** su política solo permite usar su material sin fines comerciales. Con anuncios, la web
  pasa a ser comercial → pedir permiso a copyright@take2games.com antes de activar los anuncios, o reducir el uso de sus imágenes.
  Google AdSense también exige tener derechos sobre el contenido de las páginas con anuncios.
- La sección de tiendas sigue siendo legal: enlaces normales, sin comisión. No mezclarla con los anuncios.
