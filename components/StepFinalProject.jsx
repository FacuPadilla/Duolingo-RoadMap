import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Timer, BookOpenCheck } from "lucide-react";
import { Pill, StatusPill, SubtaskBadge, EASE, getProgress } from "./Commons";
import Lottie from "lottie-react";
import step7Anim from "../assets/Step7.json";

export default function StepFinalProject({ step, index }) {
  const { title, subtasks = [], status } = step;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const progress = getProgress(subtasks);

  return (
    <section className="relative px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-1"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Pill>
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-400" />
              <span className="text-xs sm:text-sm">Step {index + 1}</span>
            </Pill>
            <StatusPill status={status} />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs text-white/70">Progreso {progress}%</span>
            <span className="flex-1 h-2 max-w-[200px] rounded-full bg-white/10 overflow-hidden">
              <motion.span
                className="block h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              />
            </span>
          </div>

          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 text-transparent bg-clip-text leading-tight">
            {title}
          </h2>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 font-medium leading-relaxed">
            Integra todo lo aprendido en un proyecto completo, desde el
            prototipo hasta el deploy.
          </p>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/70 leading-relaxed">
            Diseñás pantallas, construís el frontend, conectás una API real o
            mock y publicás tu aplicación en producción.
          </p>

          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
            <Pill>
              <BookOpenCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-400" />
              <span className="text-xs">Prerrequisito: React</span>
            </Pill>
            <Pill>
              <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-400" />
              <span className="text-xs">Duración estimada: 12–20 h</span>
            </Pill>
          </div>

          <div className="mt-6 sm:mt-8">
            <h4 className="text-sm sm:text-base text-white/90 font-semibold">
              Entregables
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {subtasks.map((st, i) => (
                <SubtaskBadge key={i} st={st} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-2"
        >
          {/* Contenedor con tamaño máximo controlado */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-lg">
            <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden ">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <Lottie
                  animationData={step7Anim}
                  loop
                  speed={0.5}
                  autoplay
                  aria-label="Animación Proyecto Final"
                  className="w-full h-full"
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid meet",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
