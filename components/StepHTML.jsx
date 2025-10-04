// src/components/StepHTML.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  PlayCircle,
  Timer,
  BookOpenCheck,
  Code2,
  Braces,
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

export default function StepHTML({ step, index }) {
  const { title, subtasks = [], status } = step;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const completed = subtasks.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / Math.max(1, subtasks.length)) * 100);
  const mapByName = Object.fromEntries(subtasks.map((s) => [s.name, s]));

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
          className="order-1 md:order-2"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-white/5">
            <img
              src="/covers/html-cover.jpg"
              alt="Fundamentos de HTML"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>
        </motion.div>

        {/* Contenido (alineado a STEP 2) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-2 md:order-1"
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

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white leading-tight">
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
              <BookOpenCheck className="w-4 h-4 text-primary-300" />
              Prerrequisito: Ninguno
            </Pill>
            <Pill>
              <Timer className="w-4 h-4 text-secondary-300" />
              Duración estimada: 4–6 h
            </Pill>
          </div>

          {/* Contenidos (subtasks) vínculados a tu JSON */}
          <div className="mt-8">
            <h4 className="text-white/90 font-semibold">
              Contenidos del módulo
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SubtaskBadge
                st={
                  mapByName["Etiquetas básicas"] || {
                    name: "Etiquetas básicas",
                    status: "pending",
                  }
                }
              />
              <SubtaskBadge
                st={
                  mapByName["Estructura semántica"] || {
                    name: "Estructura semántica",
                    status: "pending",
                  }
                }
              />
              <SubtaskBadge
                st={
                  mapByName["Listas y tablas"] || {
                    name: "Listas y tablas",
                    status: "pending",
                  }
                }
              />
              <SubtaskBadge
                st={
                  mapByName["Formularios básicos"] || {
                    name: "Formularios básicos",
                    status: "pending",
                  }
                }
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
