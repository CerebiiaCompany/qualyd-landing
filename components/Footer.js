
import styles from '../styles/Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <div className={styles.brain}>
                  <div className={styles.logo}>
        <Image
          src="/logos.png"
          alt="Cerebiia Calidad"
          width={150}
          height={40}
          priority
        />
      </div>
                </div>
              </div>
      
            </div>
            <p className={styles.description}>
              © Cerebiia Calidad, todos los derechos reservados
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

          {/* Cerebiia Transcript */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Cerebiia Transcript</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#inicio" className={styles.footerLink}>Inicio</a></li>
              <li><a href="#nosotros" className={styles.footerLink}>Sobre nosotros</a></li>
              <li><a href="#planes" className={styles.footerLink}>Planes y servicios</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#terminos" className={styles.footerLink}>Términos y condiciones</a></li>
              <li><a href="#privacidad" className={styles.footerLink}>Política de privacidad</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <ul className={styles.footerLinks}>
              <li>
                <a href="mailto:contactotranscript.com" className={styles.footerLink}>
                  contactotranscript.com
                </a>
              </li>
              <li>
                <a href="tel:+57000000000" className={styles.footerLink}>
                  +57 000000000
                </a>
              </li>
              <li className={styles.footerLink}>Cúcuta, Colombia</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
