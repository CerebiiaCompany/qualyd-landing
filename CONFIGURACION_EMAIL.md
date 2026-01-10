# Configuración del Formulario de Contacto

Este documento explica cómo configurar el sistema de envío de correos para el formulario de contacto.

## 📧 Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Host del servidor SMTP
SMTP_HOST=smtp.gmail.com

# Puerto SMTP (587 para TLS, 465 para SSL)
SMTP_PORT=587

# ¿Usar conexión segura? (true para SSL, false para TLS)
SMTP_SECURE=false

# Usuario del servidor SMTP
SMTP_USER=tu-email@ejemplo.com

# Contraseña del servidor SMTP
SMTP_PASSWORD=tu-contraseña

# Correo remitente
SMTP_FROM=contacto@cerebiia.com

# Correo de destino
CONTACT_EMAIL=contacto@cerebiia.com
```

## 🔒 Seguridad Implementada

El formulario incluye múltiples medidas de seguridad para prevenir spam y ataques:

### 1. **Rate Limiting**
- Límite de 3 envíos por IP cada 15 minutos
- Previene ataques de fuerza bruta y spam masivo

### 2. **Campo Honeypot**
- Campo oculto invisible para usuarios humanos
- Los bots suelen llenar este campo y son detectados automáticamente

### 3. **Validación de Entrada**
- Validación de formato de email
- Sanitización de todos los campos
- Límite de longitud de caracteres
- Validación de campos requeridos

### 4. **Manejo Seguro de Errores**
- No expone detalles técnicos al cliente
- Logs de errores en el servidor para debugging

## 📝 Configuración para Diferentes Proveedores

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu-contraseña-de-aplicación
```

**Importante para Gmail:**
1. Activa la verificación en 2 pasos en tu cuenta de Google
2. Genera una "Contraseña de aplicación" en: https://myaccount.google.com/apppasswords
3. Usa esa contraseña en lugar de tu contraseña normal

### Outlook/Office365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-email@outlook.com
SMTP_PASSWORD=tu-contraseña
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=tu-api-key-de-sendgrid
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-usuario@mailgun.org
SMTP_PASSWORD=tu-contraseña-de-mailgun
```

## 🚀 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Crea el archivo `.env.local` con tus credenciales

3. Reinicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Configuración en Producción

### Vercel
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables de entorno
4. Redeploy el proyecto

### Netlify
1. Ve a tu sitio en Netlify
2. Site settings → Environment variables
3. Agrega todas las variables
4. Deploy nuevamente

### Otros hosts
Configura las variables de entorno según la documentación de tu plataforma de hosting.

## 📊 Monitoreo

Los logs de errores se guardan en la consola del servidor. Para producción, considera:
- Integrar con un servicio de logging (Sentry, LogRocket, etc.)
- Monitorear la tasa de envíos fallidos
- Revisar regularmente los logs para detectar intentos de spam

## 🛡️ Recomendaciones Adicionales

1. **CAPTCHA (Opcional pero recomendado)**
   - Considera agregar reCAPTCHA v3 o hCaptcha para mayor seguridad
   - Esto requiere configuración adicional en el frontend y backend

2. **Blacklist de IPs**
   - Implementa un sistema de bloqueo de IPs sospechosas
   - Puedes usar servicios como Cloudflare

3. **Límites más estrictos**
   - Ajusta `MAX_SUBMISSIONS_PER_WINDOW` en `pages/api/contact.js` según tus necesidades

4. **Email de confirmación**
   - Considera enviar un email de confirmación al usuario que llenó el formulario

## ⚠️ Notas Importantes

- **NUNCA** subas el archivo `.env.local` al repositorio
- Mantén tus credenciales seguras
- Usa contraseñas de aplicación para Gmail
- Prueba el formulario después de cada cambio de configuración
