// components/Pricing.js
import { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import styles from '../styles/Pricing.module.css';

export default function Pricing() {
const [formData, setFormData] = useState({
nombres: '',
apellidos: '',
identificacion: '',
correo: '',
celular: '',
contactoCorreo: true,
contactoWhatsApp: true,
recibirInfo: false,
privacidad: false,
terminos: false,
honeypot: '' // Campo oculto anti-spam
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
const [errorMessage, setErrorMessage] = useState('');

const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setFormData(prev => ({
...prev,
[name]: type === 'checkbox' ? checked : value
}));
// Limpiar mensajes de error cuando el usuario empiece a escribir
if (submitStatus === 'error') {
setSubmitStatus(null);
setErrorMessage('');
}
};

const handleSubmit = async (e) => {
e.preventDefault();
setIsSubmitting(true);
setSubmitStatus(null);
setErrorMessage('');

try {
const response = await fetch('/api/contact', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(formData),
});

const data = await response.json();

if (!response.ok) {
throw new Error(data.error || 'Error al enviar el formulario');
}

// Éxito
setSubmitStatus('success');
// Resetear formulario después de 2 segundos
setTimeout(() => {
setFormData({
nombres: '',
apellidos: '',
identificacion: '',
correo: '',
celular: '',
contactoCorreo: true,
contactoWhatsApp: true,
recibirInfo: false,
privacidad: false,
terminos: false,
honeypot: ''
});
setSubmitStatus(null);
}, 5000);

} catch (error) {
setSubmitStatus('error');
setErrorMessage(error.message || 'Ocurrió un error. Por favor, intenta de nuevo.');
} finally {
setIsSubmitting(false);
}
};

return (
<section className={styles.pricing}>
    <div className={styles.container}>
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <div className={styles.header}>
            <h2 className={styles.title}>
                Transforma la <span className={styles.orangeText}>gestión de calidad</span> en tu empresa
            </h2>
            <p className={styles.subtitle}>
                Evaluaciones más eficientes, profesionales y alineadas con tus estándares para impulsar la excelencia y
                la satisfacción del cliente.
            </p>
            <p className={styles.description}>
                Cotiza nuestro servicio según la cantidad de usuarios y el plan mensual que mejor se adapte a tus
                necesidades.
            </p>
          </div>
        </ScrollAnimation>

        <form className={styles.form} onSubmit={handleSubmit}>
            {/* Campo honeypot oculto para bots */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Mensaje de éxito */}
            {submitStatus === 'success' && (
              <div className={styles.messageSuccess}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>¡Formulario enviado correctamente! Nos pondremos en contacto contigo pronto.</span>
              </div>
            )}

            {/* Mensaje de error */}
            {submitStatus === 'error' && (
              <div className={styles.messageError}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <ScrollAnimation animation="fadeInUp" delay={100}>
              <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                      <label htmlFor="nombres">Nombre(s):</label>
                      <input type="text" id="nombres" name="nombres" value={formData.nombres} onChange={handleChange}
                          required disabled={isSubmitting} />
                  </div>

                  <div className={styles.formGroup}>
                      <label htmlFor="apellidos">Apellido(s):</label>
                      <input type="text" id="apellidos" name="apellidos" value={formData.apellidos}
                          onChange={handleChange} required disabled={isSubmitting} />
                  </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={200}>
              <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                      <label htmlFor="identificacion">Identificación:</label>
                      <input type="text" id="identificacion" name="identificacion" value={formData.identificacion}
                          onChange={handleChange} required disabled={isSubmitting} />
                  </div>

                  <div className={styles.formGroup}>
                      <label htmlFor="correo">Correo:</label>
                      <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange}
                          required disabled={isSubmitting} />
                  </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={300}>
              <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                      <label htmlFor="celular">Celular:</label>
                      <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange}
                          required disabled={isSubmitting} />
                  </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={400}>
              <div className={styles.contactPreference}>
                  <p className={styles.preferenceTitle}>¿Cómo prefieres que te contactemos?</p>
                  <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}>
                          <input type="checkbox" name="contactoCorreo" checked={formData.contactoCorreo}
                              onChange={handleChange} disabled={isSubmitting} />
                          <span>Correo</span>
                      </label>
                      <label className={styles.checkboxLabel}>
                          <input type="checkbox" name="contactoWhatsApp" checked={formData.contactoWhatsApp}
                              onChange={handleChange} disabled={isSubmitting} />
                          <span>WhatsApp</span>
                      </label>
                  </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={500}>
              <div className={styles.consentSection}>
                  <label className={styles.checkboxLabel}>
                      <input type="checkbox" name="recibirInfo" checked={formData.recibirInfo} onChange={handleChange} disabled={isSubmitting} />
                      <span>Quiero recibir información vía email y WhatsApp sobre productos y servicios de Cerebiia</span>
                  </label>

                  <label className={styles.checkboxLabel}>
                      <input type="checkbox" name="privacidad" checked={formData.privacidad} onChange={handleChange}
                          required disabled={isSubmitting} />
                      <span>He leído y autorizo el tratamiento de mis datos personales de acuerdo con las finalidades
                          indicadas en el aviso de privacidad y a la política de tratamiento de datos personales.</span>
                  </label>

                  <label className={styles.checkboxLabel}>
                      <input type="checkbox" name="terminos" checked={formData.terminos} onChange={handleChange}
                          required disabled={isSubmitting} />
                      <span>He leído y acepto los Términos y Condiciones del sitio web.</span>
                  </label>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={600}>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className={styles.spinner} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeLinecap="round" opacity="0.3"/>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="32" strokeDashoffset="24" strokeLinecap="round"/>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    Solicitar cotización
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </ScrollAnimation>
        </form>
    </div>
</section>
);
}
