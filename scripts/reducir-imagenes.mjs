/**
 * Reduce a 2400 px de ancho como máximo las imágenes JPG/PNG de src/ que sean más grandes.
 * Se ejecuta solo antes de `npm run build`. Así la web generada no pesa de más:
 * la web nunca muestra imágenes de más de 2400 px (el visor de la galería).
 * Los originales a tamaño completo se guardan en recursos/imagenes/.
 */
import { readdir, rename } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const MAX = 2400;
const CARPETA = 'src';

async function* imagenes(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, e.name);
    if (e.isDirectory()) yield* imagenes(ruta);
    else if (['.jpg', '.jpeg', '.png'].includes(extname(e.name).toLowerCase())) yield ruta;
  }
}

let reducidas = 0;
for await (const ruta of imagenes(CARPETA)) {
  const { width } = await sharp(ruta).metadata();
  if (!width || width <= MAX) continue;
  const tmp = `${ruta}.tmp`;
  const img = sharp(ruta).resize({ width: MAX });
  await (extname(ruta).toLowerCase() === '.png' ? img.png() : img.jpeg({ quality: 88, mozjpeg: true })).toFile(tmp);
  await rename(tmp, ruta);
  reducidas++;
  console.log(`  reducida ${ruta} (${width} → ${MAX} px)`);
}
console.log(`Imágenes: ${reducidas} reducidas a ${MAX} px como máximo.`);
