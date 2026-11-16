# Imagen para publicar VI LAB GAMING en Easypanel (VPS de Hostinger).
# Paso 1: genera la web estática con Astro. Paso 2: la sirve con Apache + PHP
# (necesario para .htaccess y para el formulario de contacto, public/contacto.php).

# ---------- 1) Generar la web ----------
FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build \
 && test -f dist/index.html && test -f dist/.htaccess && test -f dist/contacto.php

# ---------- 2) Servirla ----------
FROM php:8.3-apache

# msmtp: permite que mail() de PHP envíe el correo por el SMTP de tu buzón
# (un contenedor no trae servidor de correo propio).
RUN apt-get update \
 && apt-get install -y --no-install-recommends msmtp ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && a2enmod rewrite headers expires deflate \
 && sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf \
 && echo 'ServerTokens Prod' > /etc/apache2/conf-enabled/seguridad.conf \
 && echo 'ServerSignature Off' >> /etc/apache2/conf-enabled/seguridad.conf \
 && printf 'sendmail_path = "/usr/bin/msmtp -t"\nexpose_php = Off\n' > /usr/local/etc/php/conf.d/vilab.ini

COPY --from=build /app/dist/ /var/www/html/
COPY docker/arranque.sh /usr/local/bin/arranque.sh
RUN chmod +x /usr/local/bin/arranque.sh

EXPOSE 80
CMD ["/usr/local/bin/arranque.sh"]
