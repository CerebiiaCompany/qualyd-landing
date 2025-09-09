// components/Hero.js
import Image from "next/image";
import styles from "../styles/Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Fondo con ondas */}
      <div className={styles.backgroundWaves}>
        <Image
          src="/imagen.png"
          alt="Background waves"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Header/Navbar */}
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Nueva estructura para móviles: Logo y botón en la misma fila */}
          <div className={styles.headerTopRow}>
            <div className={styles.logo}>
              <Image
                src="/logo.png"
                alt="Cerebiia Transcript"
                width={150}
                height={40}
                priority
              />
            </div>
            <button
              onClick={() =>
                (window.location.href = "https://tu-url-externa.com")
              }
              className={styles.loginBtn}
            >
              Inicio de sesión
            </button>
          </div>

          {/* Elementos originales para desktop */}
          <div className={styles.logo}>
            <Image
              src="/logos.png"
              alt="Cerebiia Transcript"
              width={150}
              height={40}
              priority
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
              <a href="#precios" className={styles.navLink}>
                Precios
              </a>
              <a href="#contacto" className={styles.navLink}>
                Contacto
              </a>
            </nav>
          </div>

          {/* Botón de login a la derecha */}
          <button
            onClick={() =>
              (window.location.href = "https://calidad.cerebiia.com/")
            }
            className={styles.loginBtn}
          >
            Inicio de sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <div className={styles.heroContent}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              <span className={styles.greenText}>Automatiza</span>
              <span className={styles.darkText}> el control</span>
              <br />
              <span className={styles.darkText}> de calidad en tu</span>
              <br />
              <span className={styles.darkText}>empresa</span>
            </h1>

            <p className={styles.subtitle}>
              Protege la reputación de tu marca y mejora la satisfacción del
              cliente con calidad certificada, procesos impecables, cumple
              normas ISO, reduce errores y ahorra tiempo.
            </p>

            <button
              onClick={() =>
                (window.location.href = "https://calidad.cerebiia.com/")
              }
              className={styles.ctaBtn}
            >
              Descubre nuestros servicios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
