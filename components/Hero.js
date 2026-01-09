// components/Hero.js
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Hero.module.css";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Marcar que la carga inicial terminó después de la animación
    if (isInitialLoad) {
      timeoutRef.current = setTimeout(() => {
        setIsInitialLoad(false);
      }, 800); // Tiempo de la animación inicial
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInitialLoad]);

  useEffect(() => {
    // No hacer nada durante la carga inicial
    if (isInitialLoad) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Si estamos en la parte superior, siempre mostrar el navbar
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        // Si scrolleamos hacia abajo, ocultar
        // Si scrolleamos hacia arriba, mostrar
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle para mejorar el rendimiento
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [lastScrollY, isInitialLoad]);

  return (
    <section className={styles.hero}>
      {/* Header/Navbar */}
      <header className={`${styles.header} ${isVisible ? styles.headerVisible : styles.headerHidden}`}>
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logo}>
            <img
              src="/logos.png"
              alt="Cerebiia Transcript"
              className={styles.logoImg}
            />
          </div>

          {/* Navegación centrada */}
          <div className={styles.navContainer}>
            <nav className={styles.nav}>
              <a href="#inicio" className={styles.navLink}>
                Inicio
              </a>
              <a href="#servicios" className={styles.navLink}>
                Servicios
              </a>
              <a href="#servicios" className={styles.navLink}>
                Funciones
              </a>
              <a href="#contacto" className={styles.navLink}>
                Contacto
              </a>
            </nav>
          </div>

          {/* Botones a la derecha */}
          <div className={styles.buttonsContainer}>
            <button
              onClick={() =>
                (window.location.href = "https://calidad.cerebiia.com/")
              }
              className={styles.loginBtn}
            >
              Inicio de sesión
            </button>
            <button
              onClick={() =>
                (window.location.href = "#contacto")
              }
              className={styles.quoteBtn}
            >
              Cotizar
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className={styles.heroContent}>
        <div className={styles.heroContainer}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <span className={styles.orangeText}>Optimiza la calidad y</span>
              <br />
              <span className={styles.blueText}>el desempeño de tu organización</span>
            </h1>

            <p className={styles.subtitle}>
              <strong>Cerebiia Calidad</strong> es una plataforma web de <strong>control de calidad</strong> diseñada para <strong>gestionar, supervisar y optimizar</strong> los procesos operativos y de atención al cliente. Permite registrar, evaluar y analizar el desempeño de los agentes en tiempo real, impulsando decisiones basadas en datos y fortaleciendo la <strong>productividad del equipo</strong>.
            </p>

            <button
              onClick={() =>
                (window.location.href = "#contacto")
              }
              className={styles.ctaBtn}
            >
              Solicitar demo
            </button>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.heroImage}>
              <img
                src="/imagen.png"
                alt="Hombre apuntando hacia el texto"
                className={styles.heroImageImg}
              />
              {/* Línea horizontal azul */}
              <div className={styles.bottomLine}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
