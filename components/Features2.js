// components/Features2.js
import styles from '../styles/Features2.module.css';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

export default function Features2() {
  return (
    <section className={styles.features2}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Contenido de texto */}
          <ScrollAnimation animation="fadeInLeft" delay={0}>
            <div className={styles.textContent}>
              <div className={styles.badge}>
                Eleva la eficiencia y la calidad en cada proceso.
              </div>
              
              <h2 className={styles.title}>
                ¿Por qué elegir Cerebiia Calidad?
              </h2>
              
              <p className={styles.description}>
                Cerebiia Calidad es una solución integral diseñada para optimizar los procesos de control y evaluación en áreas de servicio al cliente y equipos operativos. Su enfoque basado en datos permite una supervisión más precisa, una retroalimentación efectiva y una toma de decisiones inteligente que fortalece el desempeño de tus equipos.
              </p>

              {/* Lista de características */}
              <div className={styles.featuresList}>
                <div className={styles.featureItem}>
                  <div className={styles.iconWrapper}>
                    <Image
                      src="/img5.png"
                      alt="Supervisión"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className={styles.featureText}>
                    <h3>Supervisión y control de procesos o colaboradores</h3>
                    <p>Monitorea el desempeño diario, detecta oportunidades de mejora y reduce errores operativos.</p>
                  </div>
                </div>

                <div className={styles.featureItem}>
                  <div className={styles.iconWrapper}>
                    <Image
                      src="/img6.png"
                      alt="Evaluación"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className={styles.featureText}>
                    <h3>Evaluación y análisis de calidad</h3>
                    <p>Registra, califica y analiza, fortaleciendo los procesos de retroalimentación y formación interna.</p>
                  </div>
                </div>
              </div>

              <button className={styles.ctaButton}>
                Ver tutorial
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </ScrollAnimation>

          {/* Imagen */}
          <ScrollAnimation animation="fadeInRight" delay={150}>
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <Image
                  src="/chica.png"
                  alt="Mujer usando laptop"
                  width={600}
                  height={500}
                  className={styles.image}
                  priority
                />
                {/* Línea azul horizontal */}
                <div className={styles.bottomLine}></div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
