// src/components/StepJSBasic.jsx
import { motion, useScroll, useSpring } from "framer-motion";
import { Braces, FunctionSquare, Repeat } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function StepJSBasic({ step, index }) {
  const { title } = step;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section className="relative px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className=" top-6 ">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-200 text-xs">
            Step {index + 1}
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <Braces className="w-7 h-7 text-primary-300" />
            <h3 className="mt-3 text-white font-semibold">Variables y tipos</h3>
            <p className="mt-2 text-sm text-white/70">
              Bases sólidas para trabajar con datos en JS y evitar errores
              comunes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.06 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <FunctionSquare className="w-7 h-7 text-secondary-300" />
            <h3 className="mt-3 text-white font-semibold">Funciones</h3>
            <p className="mt-2 text-sm text-white/70">
              Declaraciones, expresiones y buenas prácticas para componer
              lógica.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.12 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <Repeat className="w-7 h-7 text-accent-300" />
            <h3 className="mt-3 text-white font-semibold">Bucles</h3>
            <p className="mt-2 text-sm text-white/70">
              for, while y patrones modernos para iterar con seguridad.
            </p>
          </motion.div>
        </div>

        <motion.div className="mt-10 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-primary-500"
            style={{ scaleX: progress }}
            initial={{ scaleX: 0 }}
            transformTemplate={({ scaleX }) => `scaleX(${scaleX})`}
          />
        </motion.div>
      </div>
    </section>
  );
}
