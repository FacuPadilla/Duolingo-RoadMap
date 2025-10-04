// src/components/StepJSBasicAligned.jsx
import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  PlayCircle,
  Timer,
  BookOpenCheck,
  Braces,
  FunctionSquare,
  Repeat,
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

/** Visual: Code Preview animado */
function TypingLine({ text, delay = 0, idx = 0 }) {
  const chars = useMemo(() => text.split(""), [text]);
  return (
    <div className="whitespace-pre text-[13px] leading-6 font-mono text-primary-100/90">
      {chars.map((c, i) => (
        <motion.span
          key={`${idx}-${i}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.02, delay: delay + i * 0.02 }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

function CodePreview() {
  const lines = [
    "let total = 0;",
    "const items = [1, 2, 3];",
    "for (const n of items) {",
    "  total += n;",
    "}",
    "function doble(x) {",
    "  return x * 2;",
    "}",
    "console.log(doble(total)); // 12",
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative rounded-3xl overflow-hidden order-2 md:order-1"
    >
      <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] backdrop-blur-xl">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-white/10 bg-neutral-900/60">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[11px] text-white/60">playground.js</span>
        </div>
        <div className="p-4 bg-neutral-900/40">
          {lines.map((t, i) => (
            <TypingLine key={i} text={t} delay={0.18 * i} idx={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function StepJSBasicAligned({ step, index }) {
  const { title, subtasks = [], status } = step;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const completed = subtasks.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / Math.max(1, subtasks.length)) * 100);
  const mapByName = Object.fromEntries(subtasks.map((s) => [s.name, s]));

  return (
    <section className="relative px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
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
        {/* Contenido primero en mobile, también primero en desktop (izquierda) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-1 md:order-2"
        >
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
            Fundamentos de JavaScript para crear lógica clara y predecible.
          </p>
          <p className="mt-3 text-white/70 max-w-xl leading-relaxed">
            Declaraciones seguras de variables, funciones expresivas y patrones
            de iteración confiables. Vas a entender cómo estructurar cálculos y
            componer comportamientos sin efectos colaterales.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Pill>
              <BookOpenCheck className="w-4 h-4 text-accent-400" />
              Prerrequisito: HTML/CSS básico
            </Pill>
            <Pill>
              <Timer className="w-4 h-4 text-accent-400" />
              Duración estimada: 4–6 h
            </Pill>
          </div>

          <div className="mt-8">
            <h4 className="text-white/90 font-semibold">
              Contenidos del módulo
            </h4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SubtaskBadge
                st={
                  mapByName["Variables y tipos"] || {
                    name: "Variables y tipos",
                    status: "pending",
                    icon: Braces,
                  }
                }
              />
              <SubtaskBadge
                st={
                  mapByName["Funciones"] || {
                    name: "Funciones",
                    status: "pending",
                    icon: FunctionSquare,
                  }
                }
              />
              <SubtaskBadge
                st={
                  mapByName["Bucles"] || {
                    name: "Bucles",
                    status: "pending",
                    icon: Repeat,
                  }
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Code Preview después en mobile, a la derecha en desktop */}
        <CodePreview />
      </div>
    </section>
  );
}
