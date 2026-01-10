// pages/api/contact.js
import nodemailer from 'nodemailer';

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
  return str.trim().slice(0, 500); // Limitar longitud
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

    // Sanitizar inputs
    const sanitizedData = {
      nombres: sanitizeInput(nombres),
      apellidos: sanitizeInput(apellidos),
      identificacion: sanitizeInput(identificacion),
      correo: sanitizeInput(correo),
      celular: sanitizeInput(celular),
      contactoCorreo: Boolean(contactoCorreo),
      contactoWhatsApp: Boolean(contactoWhatsApp),
      recibirInfo: Boolean(recibirInfo),
    };

    // Configurar transporter de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verificar conexión
    await transporter.verify();

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

    // Configurar el email
    const mailOptions = {
      from: `"Sitio Web Cerebiia" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contacto@cerebiia.com',
      replyTo: sanitizedData.correo,
      subject: `Nueva Solicitud de Cotización - ${sanitizedData.nombres} ${sanitizedData.apellidos}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1134A3;">Nueva solicitud de cotización</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">Datos del contacto:</h3>
            <p><strong>Nombre(s):</strong> ${sanitizedData.nombres}</p>
            <p><strong>Apellido(s):</strong> ${sanitizedData.apellidos}</p>
            <p><strong>Identificación:</strong> ${sanitizedData.identificacion}</p>
            <p><strong>Correo:</strong> <a href="mailto:${sanitizedData.correo}">${sanitizedData.correo}</a></p>
            <p><strong>Celular:</strong> <a href="tel:${sanitizedData.celular}">${sanitizedData.celular}</a></p>
            <p><strong>Preferencias de contacto:</strong> ${contactoPreferencia.join(', ') || 'Ninguna'}</p>
          </div>
          <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Desea recibir información:</strong> ${sanitizedData.recibirInfo ? 'Sí' : 'No'}</p>
            <p><strong>Aceptó política de privacidad:</strong> Sí</p>
            <p><strong>Aceptó términos y condiciones:</strong> Sí</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Este correo fue enviado desde el formulario de contacto del sitio web.<br>
            IP del remitente: ${ip}<br>
            Fecha: ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
          </p>
        </div>
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

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
