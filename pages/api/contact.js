// pages/api/contact.js

// Rate limiting simple en memoria (en producción usar Redis o similar)
const submissions = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const MAX_SUBMISSIONS_PER_WINDOW = 3; // Máximo 3 envíos por IP cada 15 minutos

// Función para limpiar entradas antiguas
const cleanOldEntries = () => {
  const now = Date.now();
  for (const [ip, data] of submissions.entries()) {
    if (now - data.firstSubmission > RATE_LIMIT_WINDOW) {
      submissions.delete(ip);
    }
  }
};

// Función para verificar rate limiting
const checkRateLimit = (ip) => {
  cleanOldEntries();
  const now = Date.now();
  const userData = submissions.get(ip);

  if (!userData) {
    submissions.set(ip, {
      count: 1,
      firstSubmission: now,
      lastSubmission: now,
    });
    return true;
  }

  // Si ha pasado el tiempo de ventana, resetear
  if (now - userData.firstSubmission > RATE_LIMIT_WINDOW) {
    submissions.set(ip, {
      count: 1,
      firstSubmission: now,
      lastSubmission: now,
    });
    return true;
  }

  // Si está dentro de la ventana y no ha excedido el límite
  if (userData.count < MAX_SUBMISSIONS_PER_WINDOW) {
    userData.count++;
    userData.lastSubmission = now;
    return true;
  }

  return false;
};

// Función para obtener IP del cliente
const getClientIP = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : req.headers['x-real-ip'] || req.connection.remoteAddress;
  return ip || 'unknown';
};

// Función para validar email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para sanitizar input
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  // Remover caracteres peligrosos y limitar longitud
  return str
    .trim()
    .replace(/[<>]/g, '') // Remover < y > para prevenir XSS
    .slice(0, 500); // Limitar longitud
};

// Función para escapar HTML (prevenir XSS en emails)
const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
};

// Función para validar teléfono (formato básico)
const isValidPhone = (phone) => {
  // Permite números, espacios, guiones, paréntesis y el signo +
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  return phoneRegex.test(phone);
};

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const ip = getClientIP(req);

    // Verificar rate limiting
    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        error: 'Has enviado demasiados formularios. Por favor, espera unos minutos antes de intentar de nuevo.',
      });
    }

    // Extraer datos del body
    const {
      nombres,
      apellidos,
      identificacion,
      correo,
      celular,
      contactoCorreo,
      contactoWhatsApp,
      recibirInfo,
      privacidad,
      terminos,
      honeypot, // Campo oculto anti-spam
    } = req.body;

    // Verificar honeypot (si tiene valor, es un bot)
    if (honeypot) {
      return res.status(200).json({ success: true }); // Devolver éxito silencioso
    }

    // Validaciones de campos requeridos
    if (!nombres || !apellidos || !identificacion || !correo || !celular) {
      return res.status(400).json({
        error: 'Todos los campos obligatorios deben ser completados.',
      });
    }

    // Validar privacidad y términos
    if (!privacidad || !terminos) {
      return res.status(400).json({
        error: 'Debes aceptar la política de privacidad y los términos y condiciones.',
      });
    }

    // Validar formato de email
    if (!isValidEmail(correo)) {
      return res.status(400).json({
        error: 'El correo electrónico no tiene un formato válido.',
      });
    }

    // Validar formato de teléfono
    if (!isValidPhone(celular)) {
      return res.status(400).json({
        error: 'El número de celular no tiene un formato válido.',
      });
    }

    // Validar longitud de campos
    if (nombres.length < 2 || nombres.length > 100) {
      return res.status(400).json({
        error: 'El nombre debe tener entre 2 y 100 caracteres.',
      });
    }

    if (apellidos.length < 2 || apellidos.length > 100) {
      return res.status(400).json({
        error: 'Los apellidos deben tener entre 2 y 100 caracteres.',
      });
    }

    if (identificacion.length < 5 || identificacion.length > 50) {
      return res.status(400).json({
        error: 'La identificación debe tener entre 5 y 50 caracteres.',
      });
    }

    // Sanitizar inputs
    const sanitizedData = {
      nombres: sanitizeInput(nombres),
      apellidos: sanitizeInput(apellidos),
      identificacion: sanitizeInput(identificacion),
      correo: sanitizeInput(correo).toLowerCase(), // Normalizar email a minúsculas
      celular: sanitizeInput(celular),
      contactoCorreo: Boolean(contactoCorreo),
      contactoWhatsApp: Boolean(contactoWhatsApp),
      recibirInfo: Boolean(recibirInfo),
    };

    // Verificar variables de entorno de Mailgun
    const mailgunDomain = process.env.MAILGUN_DOMAIN;
    const mailgunSecret = process.env.MAILGUN_SECRET;
    const mailgunEndpoint = process.env.MAILGUN_ENDPOINT || 'api.mailgun.net';
    const fromAddress = process.env.MAIL_FROM_ADDRESS || 'contacto@cerebiia.com';
    const fromName = process.env.MAIL_FROM_NAME || 'Sitio Web Cerebiia';
    const toEmail = process.env.CONTACT_EMAIL || 'contacto@cerebiia.com';

    if (!mailgunDomain || !mailgunSecret) {
      console.error('Variables de entorno de Mailgun no configuradas');
      return res.status(500).json({
        error: 'Error de configuración del servidor. Por favor, contacta al administrador.',
      });
    }

    // Preparar contenido del email
    const contactoPreferencia = [];
    if (sanitizedData.contactoCorreo) contactoPreferencia.push('Correo');
    if (sanitizedData.contactoWhatsApp) contactoPreferencia.push('WhatsApp');

    const emailContent = `
Nueva solicitud de cotización desde el sitio web

Datos del contacto:
--------------------
Nombre(s): ${sanitizedData.nombres}
Apellido(s): ${sanitizedData.apellidos}
Identificación: ${sanitizedData.identificacion}
Correo: ${sanitizedData.correo}
Celular: ${sanitizedData.celular}

Preferencias de contacto: ${contactoPreferencia.join(', ') || 'Ninguna'}

Información adicional:
- Desea recibir información: ${sanitizedData.recibirInfo ? 'Sí' : 'No'}
- Aceptó política de privacidad: Sí
- Aceptó términos y condiciones: Sí

---
Este correo fue enviado desde el formulario de contacto del sitio web.
IP del remitente: ${ip}
Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
    `;

    // Escapar datos para prevenir XSS en el HTML del email
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1134A3;">Nueva solicitud de cotización</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #2d3748; margin-top: 0;">Datos del contacto:</h3>
          <p><strong>Nombre(s):</strong> ${escapeHtml(sanitizedData.nombres)}</p>
          <p><strong>Apellido(s):</strong> ${escapeHtml(sanitizedData.apellidos)}</p>
          <p><strong>Identificación:</strong> ${escapeHtml(sanitizedData.identificacion)}</p>
          <p><strong>Correo:</strong> <a href="mailto:${escapeHtml(sanitizedData.correo)}">${escapeHtml(sanitizedData.correo)}</a></p>
          <p><strong>Celular:</strong> <a href="tel:${escapeHtml(sanitizedData.celular)}">${escapeHtml(sanitizedData.celular)}</a></p>
          <p><strong>Preferencias de contacto:</strong> ${escapeHtml(contactoPreferencia.join(', ') || 'Ninguna')}</p>
        </div>
        <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Desea recibir información:</strong> ${sanitizedData.recibirInfo ? 'Sí' : 'No'}</p>
          <p><strong>Aceptó política de privacidad:</strong> Sí</p>
          <p><strong>Aceptó términos y condiciones:</strong> Sí</p>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          Este correo fue enviado desde el formulario de contacto del sitio web.<br>
          IP del remitente: ${escapeHtml(ip)}<br>
          Fecha: ${escapeHtml(new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }))}
        </p>
      </div>
    `;

    // Preparar datos para Mailgun API
    const formData = new URLSearchParams();
    formData.append('from', `"${fromName}" <${fromAddress}>`);
    formData.append('to', toEmail);
    formData.append('reply-to', sanitizedData.correo);
    formData.append('subject', `Nueva Solicitud de Cotización - ${sanitizedData.nombres} ${sanitizedData.apellidos}`);
    formData.append('text', emailContent);
    formData.append('html', emailHTML);

    // Enviar email usando Mailgun API
    const mailgunUrl = `https://${mailgunEndpoint}/v3/${mailgunDomain}/messages`;
    const auth = Buffer.from(`api:${mailgunSecret}`).toString('base64');

    const mailgunResponse = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!mailgunResponse.ok) {
      const errorText = await mailgunResponse.text();
      console.error('Error de Mailgun:', errorText);
      throw new Error('Error al enviar el correo a través de Mailgun');
    }

    return res.status(200).json({
      success: true,
      message: 'Formulario enviado correctamente. Nos pondremos en contacto contigo pronto.',
    });
  } catch (error) {
    console.error('Error al enviar formulario:', error);

    // No exponer detalles del error al cliente
    return res.status(500).json({
      error: 'Ocurrió un error al enviar el formulario. Por favor, intenta de nuevo más tarde o contáctanos directamente.',
    });
  }
}
