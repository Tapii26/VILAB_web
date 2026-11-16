<?php
/**
 * Procesa el formulario de /contacto/ y envía un email.
 * Lo ejecuta el Apache + PHP del contenedor (Dockerfile); mail() sale por SMTP con msmtp (variables SMTP_* en Easypanel).
 *
 * CONFIGURAR: cambiar $DESTINO por el email donde quieres recibir los mensajes.
 * Recomendado: crear un buzón en Hostinger (p. ej. contacto@tudominio) y usarlo también en $REMITENTE,
 * para que los correos no acaben en spam.
 */

$DESTINO   = 'jjtapiador1@gmail.com';   // Donde llegan los mensajes (email de contacto del aviso legal)
$REMITENTE = 'web@vilabgaming.es';      // Debe ser el mismo buzón que SMTP_USER en Easypanel

function volver(string $estado): void {
    header('Location: /contacto/?estado=' . $estado);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    volver('error');
}

// Honeypot: si el campo oculto viene relleno es un bot → fingimos éxito
if (!empty($_POST['web'])) {
    volver('ok');
}

$nombre     = trim(strip_tags($_POST['nombre'] ?? ''));
$email      = trim($_POST['email'] ?? '');
$asunto     = trim(strip_tags($_POST['asunto'] ?? ''));
$mensaje    = trim(strip_tags($_POST['mensaje'] ?? ''));
$privacidad = ($_POST['privacidad'] ?? '') === '1';

if (
    $nombre === '' || mb_strlen($nombre) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $mensaje === '' || mb_strlen($mensaje) > 5000 ||
    mb_strlen($asunto) > 150 ||
    !$privacidad
) {
    volver('error');
}

// Evita inyección de cabeceras
$nombre = str_replace(["\r", "\n"], ' ', $nombre);
$asunto = str_replace(["\r", "\n"], ' ', $asunto);

$tituloCorreo = '[VI LAB GAMING] ' . ($asunto !== '' ? $asunto : 'Nuevo mensaje de contacto');
$cuerpo  = "Nombre: $nombre\nEmail: $email\n\n$mensaje\n";
$headers = [
    'From: VI LAB GAMING <' . $REMITENTE . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$ok = mail($DESTINO, '=?UTF-8?B?' . base64_encode($tituloCorreo) . '?=', $cuerpo, implode("\r\n", $headers));

volver($ok ? 'ok' : 'error');
