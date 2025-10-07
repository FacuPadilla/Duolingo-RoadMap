// src/components/StepCSSAdvanced.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import step3Anim from "../assets/Step3.json";
import Lottie from "lottie-react";
import { Star, Timer, BookOpenCheck } from "lucide-react";
import {
  Pill,
  StatusPill,
  SubtaskBadge,
  STATUS_STYLES,
  EASE,
  getProgress,
} from "./Commons";

export default function StepCSSAdvanced({ step, index }) {
  const { title, subtasks = [], status } = step;
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const progress = getProgress(subtasks);

  return (
    <section className="relative px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
      {/* Glow de fondo */}
      <motion.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="absolute -inset-20 blur-3xl bg-gradient-to-r from-primary-600/15 to-secondary-600/15" />
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-2 md:order-2"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden  ">
            <Lottie
              animationData={step3Anim}
              loop
              speed={0.5}
              autoplay
              aria-label="Animación CSS Advanced"
              style={{ width: "100%", height: "100%" }}
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            />
          </div>
        </motion.div>

        {/* Contenido (alineado a Steps 1 y 2) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-1 md:order-1"
        >
          {/* Meta header */}
          <div className="flex flex-wrap items-center gap-3">
            <Pill>
              <Star className="w-4 h-4 text-primary-300" />
              Step {index + 1}
            </Pill>
            <StatusPill status={status} />
            <span className="text-xs text-white/70">Progreso {progress}%</span>
            <span className="inline-flex h-2 w-28 rounded-full bg-white/10 overflow-hidden">
              <motion.span
                className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              />
            </span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 text-transparent bg-clip-text">
            {title}
          </h2>

          <p className="mt-4 text-lg text-white/90 font-medium">
            Diseñá layouts robustos y fluidos con técnicas modernas de CSS.
          </p>
          <p className="mt-3 text-white/70 max-w-xl leading-relaxed">
            Domina Flexbox para alineaciones precisas, usa Grid para
            composiciones complejas y aplicá animaciones y transiciones para
            comunicar estados con elegancia.
          </p>

          {/* Prerrequisito + Duración */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Pill>
              <BookOpenCheck className="w-4 h-4 text-primary-300" />
              Prerrequisito: Introducción a CSS
            </Pill>
            <Pill>
              <Timer className="w-4 h-4 text-secondary-300" />
              Duración estimada: 8–10 h
            </Pill>
          </div>

          {/* Contenidos (subtasks) desde tu JSON */}
          <div className="mt-8">
            <h4 className="text-white/90 font-semibold">
              Contenidos del módulo
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subtasks.map((st, i) => (
                <SubtaskBadge key={i} st={st} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
