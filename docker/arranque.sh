#!/bin/sh
# Arranque del contenedor: configura el envío de correo con las variables de entorno
# de Easypanel (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) y lanza Apache.
set -e

if [ -n "$SMTP_USER" ] && [ -n "$SMTP_PASS" ]; then
  cat > /etc/msmtprc <<EOF
defaults
auth on
tls on
tls_starttls off
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile -

account default
host ${SMTP_HOST:-smtp.hostinger.com}
port ${SMTP_PORT:-465}
from ${SMTP_USER}
user ${SMTP_USER}
password ${SMTP_PASS}
EOF
  chown root:www-data /etc/msmtprc
  chmod 640 /etc/msmtprc
else
  echo "Aviso: faltan SMTP_USER/SMTP_PASS; el formulario de contacto no podrá enviar correos."
fi

exec apache2-foreground
