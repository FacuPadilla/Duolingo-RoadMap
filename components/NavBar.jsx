import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar({
  brand = "Learning Roadmap",
  ctaLabel = "Comenzar ahora",
  heroId = "hero",
  ctaTargetId = "roadmap",
}) {
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    // Esperamos un poco para asegurarnos que el DOM esté completamente cargado
    const timer = setTimeout(() => {
      const hero = document.getElementById(heroId);

      if (!hero) {
        console.warn(`Elemento con id "${heroId}" no encontrado`);
        setHeroInView(false);
        return;
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          setHeroInView(entry.isIntersecting);
        },
        {
          threshold: 0.3, // Bajé el threshold para que sea más sensible
          rootMargin: "-20px 0px 0px 0px", // Margen para activar un poco antes
        }
      );

      io.observe(hero);

      return () => io.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [heroId]);

  const onCtaClick = () => {
    const target = document.getElementById(ctaTargetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* MOBILE: con efecto scroll */}
      <nav className="md:hidden w-full border-white/10 bg-primary-900/20 backdrop-blur border-b px-4 py-3">
        <div className="relative flex items-center justify-between">
          {/* Logo + Texto: centrado en hero, izquierda después del scroll */}
          <motion.a
            href="/"
            aria-label={brand}
            className="inline-flex items-center gap-2"
            initial={false}
            animate={{
              x: heroInView ? "calc(50vw - 50% - 1rem)" : 0,
            }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/20 border border-primary-500/30">
              <Sparkles className="h-5 w-5 text-accent-400" />
            </span>
            <span className="text-white font-semibold tracking-tight">
              {brand}
            </span>
          </motion.a>

          {/* Botón CTA: aparece solo cuando salimos del hero */}
          <motion.button
            onClick={onCtaClick}
            aria-label={ctaLabel}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 shadow-md shadow-primary-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 transition-all whitespace-nowrap text-sm"
            initial={false}
            animate={{
              opacity: heroInView ? 0 : 1,
              scale: heroInView ? 0.95 : 1,
            }}
            style={{
              pointerEvents: heroInView ? "none" : "auto",
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {ctaLabel}
          </motion.button>
        </div>
      </nav>

      {/* DESKTOP: estática, sin efectos de scroll */}
      <nav className="hidden md:flex w-full bg-primary-900/20 backdrop-blur border-b border-white/10 px-6 py-3">
        <div className="flex w-full items-center justify-between">
          <a
            href="/"
            aria-label={brand}
            className="inline-flex items-center gap-2"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/20 border border-primary-500/30">
              <Sparkles className="h-5 w-5 text-accent-400" />
            </span>
            <span className="text-white font-semibold tracking-tight">
              {brand}
            </span>
          </a>
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 shadow-md shadow-primary-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 transition-all"
          >
            {ctaLabel}
          </button>
        </div>
      </nav>
    </header>
  );
}
