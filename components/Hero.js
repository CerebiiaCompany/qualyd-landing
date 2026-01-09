// components/Hero.js
import { useState, useEffect, useRef } from "react";
import styles from "../styles/Hero.module.css";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const timeoutRef = useRef(null);
  const textContentRef = useRef(null);
  const imageContentRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Marcar que la carga inicial terminó después de la animación
    if (isInitialLoad) {
      timeoutRef.current = setTimeout(() => {
        setIsInitialLoad(false);
      }, 700); // Tiempo de la animación inicial del navbar
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInitialLoad]);

  // Animaciones basadas en scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer para animaciones al entrar en viewport
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animateIn);
        }
      });
    }, observerOptions);

    if (textContentRef.current) {
      observer.observe(textContentRef.current);
    }
    if (imageContentRef.current) {
      observer.observe(imageContentRef.current);
    }

    return () => {
      if (textContentRef.current) {
        observer.unobserve(textContentRef.current);
      }
      if (imageContentRef.current) {
        observer.unobserve(imageContentRef.current);
      }
    };
  }, []);

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
          <div 
            ref={textContentRef}
            className={`${styles.textContent} ${styles.fadeInUp}`}
            style={{
              transform: `translateY(${Math.min(scrollY * 0.3, 50)}px)`,
              opacity: 1 - Math.min(scrollY / 300, 0.3)
            }}
          >
            <h1 className={styles.title}>
              <span className={`${styles.orangeText} ${styles.titleWord1}`}>Optimiza la calidad y</span>
              <br />
              <span className={`${styles.blueText} ${styles.titleWord2}`}>el desempeño de tu organización</span>
            </h1>

            <p className={`${styles.subtitle} ${styles.subtitleFade}`}>
              <strong>Cerebiia Calidad</strong> es una plataforma web de <strong>control de calidad</strong> diseñada para <strong>gestionar, supervisar y optimizar</strong> los procesos operativos y de atención al cliente. Permite registrar, evaluar y analizar el desempeño de los agentes en tiempo real, impulsando decisiones basadas en datos y fortaleciendo la <strong>productividad del equipo</strong>.
            </p>

            <button
              onClick={() =>
                (window.location.href = "#contacto")
              }
              className={`${styles.ctaBtn} ${styles.buttonFade}`}
            >
              Solicitar demo
            </button>
          </div>

          <div 
            ref={imageContentRef}
            className={`${styles.imageContent} ${styles.fadeInRight}`}
            style={{
              transform: `translateX(${Math.min(scrollY * 0.2, 30)}px) translateY(${Math.min(scrollY * 0.1, 20)}px)`,
              opacity: 1 - Math.min(scrollY / 400, 0.2)
            }}
          >
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
