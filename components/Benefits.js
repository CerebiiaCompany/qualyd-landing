// components/Benefits.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Benefits.module.css';

const Benefits = () => {
  const [currentSlide, setCurrentSlide] = useState(2); // Iniciar con la tarjeta del medio (índice 2 de 5)

  const benefits = [
    {
      icon: '/img4.png',
      iconBg: '#1134A3',
      title: 'Fortalecimiento del control de calidad interno.',
      description: 'Estandariza los procesos de evaluación y retroalimentación, asegurando que cada agente o colaborador cumpla con los parámetros definidos por la empresa.'
    },
    {
      icon: '/img1.png',
      iconBg: '#1134A3',
      title: 'Decisiones basadas en datos reales.',
      description: 'Centraliza la información de calidad y desempeño, ofreciendo reportes y análisis que respaldan decisiones estratégicas para cada área operativa.'
    },
    {
      icon: '/img2.png',
      iconBg: '#FF6801',
      title: 'Reducción de tiempos operativos y errores humanos.',
      description: 'Automatiza la supervisión de campañas (procesos) y agentes (colaboradores), optimizando el seguimiento de las actividades diarias y reduciendo los errores derivados de la gestión manual.'
    },
    {
      icon: '/img3.png',
      iconBg: '#1134A3',
      title: 'Mejora continua en la atención al cliente.',
      description: 'Facilita la evaluación constante del desempeño, permitiendo detectar oportunidades de mejora y garantizar interacciones más eficientes y profesionales.'
    },
    {
      icon: '/img5.png',
      iconBg: '#1134A3',
      title: 'Aumento de la productividad y satisfacción del cliente.',
      description: 'Mejora la coordinación entre supervisores y equipos, elevando el rendimiento general y promoviendo experiencias positivas para el usuario final.'
    }
  ];

  // Auto-play del slider - cambia la tarjeta activa cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [benefits.length]);

  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.orangeText}>Beneficios</span>{' '}
            <span className={styles.darkText}>Clave para Tu Empresa</span>
          </h2>
          <p className={styles.subtitle}>
            Fortalece tus procesos de evaluación y control de calidad con una plataforma que impulsa la eficiencia operativa, la mejora continua y una atención al cliente de alto nivel.
          </p>
        </div>

        <div className={styles.sliderContainer}>
          <div 
            className={styles.slider}
            style={{ 
              transform: `translateX(calc(50% - ${currentSlide * (100 / 3)}% - ${currentSlide * 20}px - 16.666%))` 
            }}
          >
            {benefits.map((benefit, index) => {
              const isActive = index === currentSlide;
              
              // Calcular posición relativa (izquierda, centro, derecha)
              let position = 'side';
              const prevIndex = currentSlide === 0 ? benefits.length - 1 : currentSlide - 1;
              const nextIndex = currentSlide === benefits.length - 1 ? 0 : currentSlide + 1;
              
              if (index === prevIndex) {
                position = 'left';
              } else if (index === currentSlide) {
                position = 'center';
              } else if (index === nextIndex) {
                position = 'right';
              }
              
              return (
                <div 
                  key={index} 
                  className={`${styles.slide} ${styles[position]}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <div className={styles.benefitCard}>
                    <div 
                      className={styles.icon}
                      style={{ 
                        backgroundColor: isActive ? '#FF6801' : '#1134A3' 
                      }}
                    >
                      <Image
                        src={benefit.icon}
                        alt={benefit.title}
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                    <p className={styles.benefitDescription}>{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Puntos de paginación */}
        <div className={styles.pagination}>
          {[...Array(5)].map((_, index) => {
            // El punto del medio (índice 2) está activo cuando currentSlide es 2 (centro)
            // Los puntos 0-1 están activos cuando currentSlide es 0-1
            // Los puntos 3-4 están activos cuando currentSlide es 3-4
            const isActive = index === currentSlide;
            
            return (
              <button
                key={index}
                className={`${styles.paginationDot} ${
                  isActive ? styles.active : ''
                }`}
                onClick={() => {
                  setCurrentSlide(index);
                }}
                aria-label={`Ir a slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
