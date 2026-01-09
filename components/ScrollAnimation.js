// components/ScrollAnimation.js
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/ScrollAnimation.module.css';

const ScrollAnimation = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0,
  threshold = 0.1,
  reAnimate = false // Permite re-animación al hacer scroll hacia arriba
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasAnimated || reAnimate) {
              setIsVisible(true);
              setHasAnimated(true);
            }
          } else if (!entry.isIntersecting && reAnimate) {
            // Re-animación al hacer scroll hacia arriba
            setIsVisible(false);
            setHasAnimated(false);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, hasAnimated, reAnimate]);

  return (
    <div
      ref={elementRef}
      className={`${styles.scrollAnimation} ${styles[animation]} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
