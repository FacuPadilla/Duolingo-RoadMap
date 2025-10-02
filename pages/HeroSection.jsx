import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-x-hidden">
      <div className="min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
        <div className="container mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Imagen izquierda */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-[320px] sm:max-w-sm rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/Hero.png"
                  alt="Learning Roadmap"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Texto derecha */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6 sm:gap-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex w-fit items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary-500/10 border border-primary-500/30 rounded-full"
              >
                <Star className="w-4 h-4 text-accent-400" />
                <span className="text-white text-xs sm:text-sm font-medium">
                  Tu camino personalizado
                </span>
              </motion.div>

              {/* Título */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug tracking-tight"
              >
                Construye tu
                <span className="block mt-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 text-transparent bg-clip-text">
                  Learning Roadmap
                </span>
              </motion.h1>

              {/* Descripción */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-primary-100/85 leading-relaxed max-w-prose"
              >
                Sigue un camino estructurado de aprendizaje diseñado
                específicamente para ti. Avanza paso a paso, completa desafíos y
                alcanza tus objetivos profesionales.
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-col gap-4 sm:gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                  </div>
                  <span className="text-primary-200 text-sm sm:text-base leading-relaxed">
                    Progreso visual e interactivo
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                  </div>
                  <span className="text-primary-200 text-sm sm:text-base leading-relaxed">
                    Desafíos adaptados a tu nivel
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                  </div>
                  <span className="text-primary-200 text-sm sm:text-base leading-relaxed">
                    Seguimiento en tiempo real
                  </span>
                </div>
              </motion.div>

              {/* Botón CTA */}
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                duration={1.2}
                className="mt-2 w-full sm:w-auto inline-flex justify-center items-center gap-2 px-5 py-3.5 sm:px-7 sm:py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-400 focus-visible:ring-offset-neutral-900"
              >
                Comenzar mi Roadmap
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* Texto inspirador abajo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="mt-20 text-center flex flex-col items-center gap-4"
          >
            <Star className="w-10 h-10 text-accent-400 mb-2" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Da el primer paso hoy
            </h2>
            <p className="text-primary-200 text-base sm:text-lg max-w-xl">
              El camino del aprendizaje nunca termina, pero cada línea de código
              escrita te acerca más a tus sueños.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
