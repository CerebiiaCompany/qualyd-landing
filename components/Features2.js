// components/Features2.js
import styles from '../styles/Features2.module.css';
import Image from 'next/image';

export default function Features2() {
  return (
    <section className={styles.features2}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Contenido de texto */}
          <div className={styles.textContent}>
            <div className={styles.badge}>
              Calidad en tus proyectos
            </div>
            
            <h2 className={styles.title}>
              ¿Por qué usar Cerebiia Calidad?
            </h2>
            
            <p className={styles.description}>
              Nuestro software de gestión de calidad responde a los desafíos principales de las operaciones de control y aseguramiento de calidad. Es personalizable y fácil de usar.
            </p>

            {/* Lista de características */}
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <Image
                    src="/img5.png"
                    alt="Estandariza"
                    width={48}
                    height={48}
                  />
                </div>
                <div className={styles.featureText}>
                  <h3>Estandariza</h3>
                  <p>la manera en que los colaboradores trabajan para garantizar la calidad de todos los productos o servicios.</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <Image
                    src="/img6.png"
                    alt="Asegura"
                    width={48}
                    height={48}
                  />
                </div>
                <div className={styles.featureText}>
                  <h3>Asegura</h3>
                  <p>la trazabilidad de tus procesos. Así ahorras tiempo a la hora de auditorías y puedes detectar problemas a tiempo.</p>
                </div>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.iconWrapper}>
                  <Image
                    src="/img7.png"
                    alt="Mejora"
                    width={48}
                    height={48}
                  />
                </div>
                <div className={styles.featureText}>
                  <h3>Mejora</h3>
                  <p>el seguimiento de indicadores de calidad. Kizeo Forms te proporciona datos confiables en tiempo real.</p>
                </div>
              </div>
            </div>

            <button className={styles.ctaButton}>
              Más información
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Imagen */}
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <Image
                src="/chica.png"
                alt="Hombre usando smartphone para transcripción"
                width={600}
                height={500}
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
