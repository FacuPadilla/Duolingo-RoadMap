// src/components/StepHTML.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import step1Anim from "../assets/Step1.json";
import { Star, Timer, BookOpenCheck } from "lucide-react";
import {
  Pill,
  StatusPill,
  SubtaskBadge,
  STATUS_STYLES,
  EASE,
  getProgress,
} from "./Commons";

export default function StepHTML({ step, index }) {
  const { title, subtasks = [], status } = step;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const progress = getProgress(subtasks);

  return (
    <section className="relative px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
      {/* Glow de fondo */}
      <motion.div
        style={{ y }}
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
              animationData={step1Anim}
              loop
              autoplay
              style={{ width: "100%", height: "80%" }}
              aria-label="Animación del módulo"
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            />
          </div>
        </motion.div>

        {/* Contenido (alineado a STEP 2) */}
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
              <Star className="w-4 h-4 text-accent-400" />
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
            Construí la base semántica de cualquier sitio con HTML.
          </p>
          <p className="mt-3 text-white/70 max-w-xl leading-relaxed">
            Entendé la estructura del documento, usá etiquetas semánticas
            correctas y definí formularios accesibles para que el contenido sea
            claro y escalable.
          </p>

          {/* Prerrequisito + Duración (alineado a Step 2) */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Pill>
              <BookOpenCheck className="w-4 h-4 text-accent-400" />
              Prerrequisito: Ninguno
            </Pill>
            <Pill>
              <Timer className="w-4 h-4 text-accent-400" />
              Duración estimada: 4–6 h
            </Pill>
          </div>

          {/* Contenidos (subtasks) vínculados a tu JSON */}
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
