import { useMemo, useState } from 'react';
import styles from '../styles/Pricing.module.css';

const DURACIONES = [
  { key: '1', label: '1 mes', meses: 1, desc: 0 },
  { key: '3', label: '3 meses', meses: 3, desc: 0.05 },   // 5% off
  { key: '12', label: '12 meses', meses: 12, desc: 0.15 }, // 15% off
];

const PRECIO_BASE_MENSUAL = 30000; // COP
const PRECIO_USER_MENSUAL = 5000;  // COP

export default function Pricing() {
  const [duracion, setDuracion] = useState(DURACIONES[0].key);

  const plan = useMemo(() => DURACIONES.find(d => d.key === duracion), [duracion]);

  const precioPlanMes = useMemo(() => {
    const p = PRECIO_BASE_MENSUAL * (1 - plan.desc);
    return Math.round(p / 100) * 100;
  }, [plan]);

  const precioUsuarioMes = useMemo(() => PRECIO_USER_MENSUAL * (1 - plan.desc), [plan]);

  return (
    <section className={styles.pricing}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Transforma tu gestión de calidad hoy
            <br />
            <span className={styles.subTitle}>
              Sin complicaciones, con <span className={styles.accent}>resultados inmediatos.</span>
            </span>
          </h2>

          <div className={styles.selectorRow}>
            <label htmlFor="duracion" className={styles.label}>Duración de la suscripción</label>
            <select
              id="duracion"
              className={styles.select}
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            >
              {DURACIONES.map(d => (
                <option key={d.key} value={d.key}>{d.label}</option>
              ))}
            </select>
            {plan.desc > 0 && (
              <span className={styles.badgeAhorro}>-{Math.round(plan.desc*100)}% ahorro</span>
            )}
          </div>
        </header>

        <div className={styles.cards}>
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Plan mensual</h3>
              <span className={styles.cardTag}>Ideal para comenzar</span>
            </div>

            <div className={styles.priceBlock}>
              <span className={styles.from}>A partir de</span>
              <div className={styles.price}>
                ${precioPlanMes.toLocaleString('es-CO')} <span className={styles.period}>COP / mes</span>
              </div>
            </div>

            <button className={styles.cta}>
              Más información
              <svg width="16" height="16" viewBox="0 0 24 24" className={styles.ctaIcon}>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </button>

            <ul className={styles.featuresList}>
              <i className="fa-solid fa-check-circle"></i> Acceso completo al software de calidad. <br></br>
              <i className="fa-solid fa-check-circle"></i> Incluye 5 usuarios activos. <br></br>
              <i className="fa-solid fa-check-circle"></i> Formularios de evaluación personalizables. <br></br>
              <i className="fa-solid fa-check-circle"></i> Reportes e indicadores en tiempo real. <br></br>
              <i className="fa-solid fa-check-circle"></i> Soporte técnico prioritario. <br></br>
              <i className="fa-solid fa-check-circle"></i> Renovación automática cada mes. <br></br>
            </ul>
          </article>

          <article className={`${styles.card} ${styles.cardAddUsers}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Añadir usuarios</h3>
            </div>

            <div className={styles.addCircle}><i class="fa-solid fa-plus"></i></div>

            <div className={styles.priceBlockAlt}>
              <div className={styles.price}>
                ${precioUsuarioMes.toLocaleString('es-CO')} <span className={styles.period}>COP</span>
              </div>
              <div className={styles.note}>por usuario / mes</div>
            </div>

            <div className={styles.dots}>…</div>
          </article>
        </div>
      </div>
    </section>
  );
}
