// src/components/steps/StepCSSIntro.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import step2Anim from "../assets/Step2.json";
import {
  Timer,
  BookOpenCheck,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  PlayCircle,
  Star,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const STATUS_STYLES = {
  completed: {
    text: "text-emerald-300",
    bg: "bg-emerald-500/15",
    border: "border-emerald-400/30",
    icon: CheckCircle2,
    label: "Completado",
  },
  in_progress: {
    text: "text-sky-300",
    bg: "bg-sky-500/15",
    border: "border-sky-400/30",
    icon: PlayCircle,
    label: "En progreso",
  },
  review: {
    text: "text-amber-300",
    bg: "bg-amber-500/15",
    border: "border-amber-400/30",
    icon: AlertCircle,
    label: "En revisión",
  },
  pending: {
    text: "text-slate-300",
    bg: "bg-slate-500/15",
    border: "border-slate-400/30",
    icon: PauseCircle,
    label: "Pendiente",
  },
  blocked: {
    text: "text-rose-300",
    bg: "bg-rose-500/15",
    border: "border-rose-400/30",
    icon: AlertCircle,
    label: "Bloqueado",
  },
};

function Pill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const Icon = s.icon;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${s.border} ${s.bg} ${s.text} text-xs font-medium`}
    >
      <Icon className="w-4 h-4" />
      {s.label}
      {status === "in_progress" && (
        <span className="relative ml-1 inline-flex">
          <span className="absolute inline-flex h-2 w-2 rounded-full bg-current opacity-75 animate-ping"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current"></span>
        </span>
      )}
    </span>
  );
}

function SubtaskBadge({ st }) {
  const s = STATUS_STYLES[st.status] || STATUS_STYLES.pending;
  const Icon = s.icon;
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${s.border} ${s.bg}`}
    >
      <Icon className={`w-4 h-4 ${s.text}`} />
      <span className="text-sm text-white/90">{st.name}</span>
      <span className={`ml-auto text-[11px] font-medium ${s.text}`}>
        {s.label}
      </span>
    </div>
  );
}

export default function StepCSSIntro({ step, index }) {
  const { title, subtasks = [], status } = step;
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.03]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const completed = subtasks.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / Math.max(1, subtasks.length)) * 100);
  const mapByName = Object.fromEntries(subtasks.map((s) => [s.name, s]));

  return (
    <section className="relative px-0 py-0">
      {/* Glow de fondo (igual que en StepCSSAdvanced) */}
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

      <div className="relative">
        <motion.div style={{ scale }} className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-2">
            {/* Visual: en mobile abajo, en desktop a la izquierda */}
            <div className="relative h-[30vh] md:h-[75vh] order-2 md:order-1">
              <Lottie
                animationData={step2Anim}
                loop
                speed={0.5}
                autoplay
                aria-label="Animación CSS Intro"
                style={{ width: "100%", height: "100%" }}
                rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
              />
            </div>

            {/* Contenido: en mobile arriba, en desktop a la derecha */}
            <div className="relative order-1 md:order-2 flex items-center">
              <div className="px-6 sm:px-8 lg:px-12 py-14 sm:py-20 w-full">
                <div className="flex flex-wrap items-center gap-3">
                  <Pill>
                    <Star className="w-4 h-4 text-accent-400" />
                    Step {index + 1}
                  </Pill>
                  <StatusPill status={status} />
                  <span className="text-xs text-white/70">
                    Progreso {progress}%
                  </span>
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
                  Aprende a dar identidad visual a tus páginas con CSS.
                </p>
                <p className="mt-3 text-white/70 max-w-xl leading-relaxed">
                  Controlá color, tipografía y espaciados; usá selectores con
                  precisión y entendé el box model para construir layouts
                  confiables.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Pill>
                    <BookOpenCheck className="w-4 h-4 text-accent-400" />
                    Prerrequisito: Fundamentos de HTML
                  </Pill>
                  <Pill>
                    <Timer className="w-4 h-4 text-accent-400" />
                    Duración estimada: 6–8 h
                  </Pill>
                </div>

                <div className="mt-8">
                  <h4 className="text-white/90 font-semibold">
                    Contenidos del módulo
                  </h4>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SubtaskBadge
                      st={
                        mapByName["Selectores"] || {
                          name: "Selectores",
                          status: "pending",
                        }
                      }
                    />
                    <SubtaskBadge
                      st={
                        mapByName["Box model"] || {
                          name: "Box model",
                          status: "pending",
                        }
                      }
                    />
                    <SubtaskBadge
                      st={
                        mapByName["Colores y fuentes"] || {
                          name: "Colores y fuentes",
                          status: "pending",
                        }
                      }
                    />
                    <SubtaskBadge
                      st={
                        mapByName["Unidades de medida"] || {
                          name: "Unidades de medida",
                          status: "pending",
                        }
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quitamos el separador que oscurecía el borde inferior */}
          {/* <div className="h-12 sm:h-16 w-full bg-gradient-to-b from-transparent to-black/20" /> */}
        </motion.div>
      </div>
    </section>
  );
}
