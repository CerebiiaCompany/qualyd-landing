import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Features from "../components/Features";
import Features2 from "../components/Features2";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import ScrollAnimation from "../components/ScrollAnimation";

export default function Home() {
  return (
    <div>
      <section id="inicio">
        <Hero />
      </section>

      <section id="beneficios">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <Benefits />
        </ScrollAnimation>
      </section>

      <section id="servicios">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <Features />
        </ScrollAnimation>
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <Features2 />
        </ScrollAnimation>
      </section>

      <section id="precios">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <Pricing />
        </ScrollAnimation>
      </section>

      <section id="contacto">
        <ScrollAnimation animation="fadeInUp" delay={0}>
          <Footer />
        </ScrollAnimation>
      </section>
    </div>
  );
}
