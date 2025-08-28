// components/Benefits.js
import Image from 'next/image';
import styles from '../styles/Benefits.module.css';

const Benefits = () => {
  const benefits = [
    {
      img: '/img1.png',
      title: 'Automatización de procesos',
      description: 'Elimina el papeleo y reduce errores humanos con flujos de trabajo 100% digitales.'
    },
    {
      img: '/img2.png',
      title: 'Trazabilidad completa',
      description: 'Rastrea todo incidente de calidad hasta su origen con registros automatizados y timestamp.'
    },
    {
      img: '/img3.png',
      title: 'Decisiones basadas en datos',
      description: 'Dashboard interactivo con KPIs clave para tomar acciones estratégicas.'
    },
    {
      img: '/img4.png',
      title: 'Alertas inteligentes',
      description: 'Recibe notificaciones en tiempo real ante desviaciones de tus estándares de calidad.'
    }
  ];

  return (
    <section className={styles.benefits}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.greenText}>Beneficios</span> Clave para<br />
            Tu Empresa
          </h2>
          <p className={styles.subtitle}>
            Estandariza el control permanente de calidad y centraliza toda la información en una plataforma para detectar problemas a tiempo y tomar acciones correctivas rápidamente.
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.icon}>
                <Image
                  src={benefit.img}
                  alt={benefit.title}
                  width={65}
                  height={65}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <section className={styles.callToAction}>
  <p>
    Gestionar las buenas prácticas de calidad en tu organización
    <br />
    <span>¡nunca fue tan fácil!</span>
  </p>
</section>

    </section>
  );
};

export default Benefits;
