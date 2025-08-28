// components/Benefits.js
import styles from '../styles/Whatsapp.module.css';

const Whatsapp = () => {
  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Transcripciones  Profesionales para Empresas.
          </h2>
         
        </div>
         <button className={styles.ctaButton}>
              Más información
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
        
      </div>
    </section>
  )
  }

export default Whatsapp;
