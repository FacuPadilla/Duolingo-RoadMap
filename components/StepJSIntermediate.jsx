// src/components/StepJSIntermediateAligned.jsx
import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Timer, BookOpenCheck } from "lucide-react";
import { Pill, StatusPill, SubtaskBadge, EASE, getProgress } from "./Commons";

/* ===================== Code Preview (animación al render) ===================== */

function tokenize(str) {
  const tokens = [];
  const rx =
    /(\bconst\b|\blet\b|\bclassList\b|\bquerySelector\b|\baddEventListener\b|\bskills\b|\bname\b)|(".*?"|'.*?')|([{}\[\](),.:=+\-*>]+)|(\b[A-Za-z_]\w*\b)|(\s+)/g;
  let m;
  while ((m = rx.exec(str))) {
    const [val, kw, strLit, sym, _ident, space] = m;
    tokens.push({
      type: kw ? "kw" : strLit ? "str" : sym ? "sym" : space ? "space" : "id",
      value: val,
    });
  }
  return tokens;
}

function clsFor(type) {
  if (type === "kw") return "text-secondary-300";
  if (type === "str") return "text-accent-300";
  if (type === "id") return "text-primary-200";
  if (type === "sym") return "text-primary-100/80";
  return "";
}

function CodeLine({ i, text }) {
  const parts = tokenize(text);
  return (
    <motion.div
      custom={i}
      variants={{
        hidden: { opacity: 0, y: 6 },
        show: {
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.18, duration: 0.36, ease: EASE },
        },
      }}
      className="whitespace-pre"
    >
      {parts.map((p, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.18,
            ease: EASE,
            delay: i * 0.18 + idx * 0.01,
          }}
          className={clsFor(p.type)}
        >
          {p.value}
        </motion.span>
      ))}
    </motion.div>
  );
}

function CodePreviewAnimated() {
  const lines = useMemo(
    () => [
      `const user = { name: "Ari", skills: ["HTML","CSS","JS"] };`,
      `const card = document.querySelector(".card");`,
      `const add  = ["DOM","Eventos","Fetch"];`,
      `user.skills = [...user.skills, ...add];`,
      `card.classList.add("is-active");`,
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative rounded-3xl overflow-hidden order-2 "
    >
      <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] backdrop-blur-xl">
        <div className="px-4 py-3 flex items-center gap-2 border-b border-white/10 bg-neutral-900/60">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 text-[11px] text-white/60">intermedio.js</span>
        </div>

        <div className="relative p-4 bg-neutral-900/40 font-mono text-[13px] leading-6 text-primary-100/90 overflow-hidden">
          {/* Sheen diagonal sutil sobre el área de código */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            initial={{ x: "-30%" }}
            whileInView={{ x: "130%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="space-y-1"
          >
            {lines.map((t, i) => (
              <CodeLine key={i} i={i} text={t} />
            ))}
          </motion.div>
        </div>

        {/* Barra de progreso inferior a juego con tu gradiente */}
        <div className="px-4 pb-4">
          <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.span
              className="block h-full bg-gradient-to-r from-primary-500 to-secondary-500"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.05, ease: EASE }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===================== Step principal (márgenes alineados) ===================== */

export default function StepJSIntermediateAligned({ step, index }) {
  const { title, subtasks = [], status } = step;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const progress = getProgress(subtasks);

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
        {/* Contenido primero en mobile, a la derecha en desktop */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="order-1 "
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
            Estructurá datos con objetos y arrays, manipulá el DOM y coordiná
            eventos para crear interfaces dinámicas.
          </p>
          <p className="mt-3 text-white/70 max-w-xl leading-relaxed">
            Vas a leer y mutar nodos, escuchar interacciones del usuario y
            consumir datos asíncronos con Promesas y Fetch para conectar tu UI
            con datos externos.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Pill>
              <BookOpenCheck className="w-4 h-4 text-accent-400" />
              Prerrequisito: JavaScript Básico
            </Pill>
            <Pill>
              <Timer className="w-4 h-4 text-accent-400" />
              Duración estimada: 8–12 h
            </Pill>
          </div>

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

        {/* Preview después en mobile, a la izquierda en desktop */}
        <CodePreviewAnimated />
      </div>
    </section>
  );
}
