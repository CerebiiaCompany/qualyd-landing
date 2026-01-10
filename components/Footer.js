import styles from '../styles/Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Columna izquierda - Logo y redes sociales */}
          <div className={styles.logoSection}>
            <div className={styles.logoContainer}>
              <Image
                src="/logos.png"
                alt="Cerebiia Calidad"
                width={180}
                height={50}
                priority
                className={styles.logo}
              />
            </div>
            <p className={styles.slogan}>
              Inspiramos transformación con humanidad.
            </p>
            <p className={styles.copyright}>
              Copyright © 2026 Cerebiia Calidad | Powered by Cerebiia
            </p>
            
            {/* Social Media Icons */}
            <div className={styles.socialMedia}>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </a>
              
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2"/>
                  <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Cerebiia SaaS */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Cerebiia SaaS</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>Calidad</a></li>
              <li><a href="#" className={styles.footerLink}>RRHH</a></li>
              <li><a href="#" className={styles.footerLink}>Data 1581</a></li>
            </ul>
          </div>

          {/* Enlaces Legales */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Enlaces Legales</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>Política de Privacidad</a></li>
              <li><a href="#" className={styles.footerLink}>Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <ul className={styles.footerLinks}>
              <li className={styles.contactItem}>
                Calle 6 #12E-45, Barrio Colsag, Cúcuta, Colombia
              </li>
              <li className={styles.contactItem}>
                <a href="https://wa.me/573138488257" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                  +57 313 8488257
                </a>
              </li>
              <li className={styles.contactItem}>
                <a href="mailto:contacto@cerebiia.com" className={styles.footerLink}>
                  contacto@cerebiia.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
