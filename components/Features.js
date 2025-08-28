// components/Features.js
import Image from 'next/image';
import Head from 'next/head';
import styles from '../styles/Features.module.css';

export default function Features() {
  return (
    <>
      <Head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </Head>
     
      <section className={styles.features}>
        <div className={styles.container}>
          
          {/* Header con texto verde y líneas */}
          <div className={styles.header}>
            <div className={styles.headerLine}>
              <div className={styles.line}></div>
              <h2 className={styles.headerText}>
                ¿Qué funciones tiene?
              </h2>
              <div className={styles.line}></div>
            </div>
          </div>

          {/* Primera sección */}
          <div className={styles.featureRow}>
            {/* Columna texto */}
            <div className={styles.featureTextCol}>
              <div className={styles.featureIcon}>
                <Image
                  src="/img8.png"
                  alt="Icono campaña"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.featureTitle}>
                Crea tus campañas y<br />formularios de gestión de calidad
              </h3>
              <p className={styles.featureDescription}>
                Prepara tus formularios como y reportes de no conformidad. 
                Compártelos con tu equipo. Puedes enviarlos de manera individual 
                a cada colaborador para realizar una retroalimentación activa de mejoramiento.
              </p>
            </div>

            {/* Columna imagen */}
            <div className={styles.featureImageCol}>
              <Image
                src="/image3.png"
                alt="Vista de formulario de gestión de calidad"
                width={600}
                height={400}
                className={styles.featureImage2}
              />
            </div>
          </div>

          <div className={styles.featureRow}>
            {/* Columna imagen */}
            <div className={styles.featureImageCol}>
              <div className={styles.featureImageWrap}>
                <Image
                  src="/image 14.png"
                  alt="Indicador de satisfacción de campañas"
                  width={580}
                  height={420}
                  className={styles.featureImage3}
                  priority
                />
              </div>
            </div>

            {/* Columna texto (derecha) */}
            <div className={styles.featureTextCol}>
              <div className={styles.featureIcon}>
                <Image
                  src="/img12.png"
                  alt="Icono análisis"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.featureTitle}>
                Recibe y analiza en<br/>tiempo real los datos
              </h3>
              <p className={styles.featureDescription}>
                Recibe informes de las actividades de producción. Tendrás todos los
                informes disponibles desde la plataforma web para una toma de decisiones
                basada en información confiable.
              </p>
            </div>
          </div>

          {/* === Nueva sección: Examina estadísticas === */}
          <div className={styles.featureRow}>
            {/* Columna texto */}
            <div className={styles.featureTextCol}>
              <div className={styles.featureIcon}>
                <Image
                  src="/img13.png"
                  alt="Icono estadísticas"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.featureTitle}>
                Examina estadísticas<br />de los procesos de calidad
              </h3>
              <p className={styles.featureDescription}>
                Visualiza estadísticas detalladas sobre las revisiones y alertas de calidad
                para saber cuándo se realizan las inspecciones y los tipos de defectos más comunes.
              </p>
            </div>

            {/* Columna imagen */}
            <div className={styles.featureImageCol}>
              <Image
                src="/img14b.png"
                alt="Vista de estadísticas de calidad"
                width={580}
                height={420}
                className={styles.featureImage}
              />
            </div>
          </div>

          <div className={styles.featureRow}>
            {/* Columna imagen */}
            <div className={styles.featureImageCol}>
              <div className={styles.featureImageWrap}>
                <Image
                  src="/img16b.png"
                  alt="Indicador de satisfacción de campañas"
                  width={580}
                  height={420}
                  className={styles.featureImage2}
                  priority
                />
              </div>
            </div>

            {/* Columna texto */}
            <div className={styles.featureTextCol}>
              <div className={styles.featureIcon}>
                <Image src="/img15.png" alt="Icono de alertas" width={48} height={48} />
              </div>

              <h3 className={styles.featureTitle}>
                Recibe alertas de calidad
              </h3>

              <p className={styles.featureDescription}>
                Podrás recibir alertas o notificaciones de problemas críticos en el proceso de calidad de tu empresa,
                para poder atenderlos, retroalimentarlos y resolverlos de forma oportuna.
              </p>
            </div>
          </div>

          {/* Última sección */}
          <div className={styles.featureRow}>
            {/* Columna texto */}
            <div className={styles.featureTextCol}>
              <div className={styles.featureIcon}>
                <Image
                  src="/img17.png"
                  alt="Icono campaña"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.featureTitle}>
                Crea usuarios y <br />asigna roles
              </h3>
              <p className={styles.featureDescription}>
                Puedes crear los usuarios que desees y poder organizar qué rol cumplirá dentro de tu organización de calidad
                para conformar tu equipo y desempeñar un excelente proceso de calidad.
              </p>
            </div>

            {/* Columna imagen */}
            <div className={styles.featureImageCol}>
              <Image
                src="/img18.png"
                alt="Vista de formulario de gestión de calidad"
                width={600}
                height={400}
                className={styles.featureImage2}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
