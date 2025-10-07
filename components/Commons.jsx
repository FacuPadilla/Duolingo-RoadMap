// src/components/commons.jsx
import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

/** Shared easing for Framer Motion animations */
export const EASE = [0.22, 1, 0.36, 1];

/** Visual styles and labels for task/subtask statuses */
export const STATUS_STYLES = {
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

/** Small rounded label used across steps */
export function Pill({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs backdrop-blur ${className}`}
    >
      {children}
    </span>
  );
}

/** Status indicator with icon and animated dot when in progress */
export function StatusPill({ status, className = "" }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  const Icon = s.icon;
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${s.border} ${s.bg} ${s.text} text-xs font-medium ${className}`}
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

/** Subtask chip with status color, icon and label */
export function SubtaskBadge({ st, className = "" }) {
  const safe = st || { name: "Sin nombre", status: "pending" };
  const s = STATUS_STYLES[safe.status] || STATUS_STYLES.pending;
  const Icon = s.icon;
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${s.border} ${s.bg} ${className}`}
    >
      <Icon className={`w-4 h-4 ${s.text}`} />
      <span className="text-sm text-white/90">{safe.name}</span>
      <span className={`ml-auto text-[11px] font-medium ${s.text}`}>
        {s.label}
      </span>
    </div>
  );
}

/** Calculate completed percent from an array of subtasks */
export function getProgress(subtasks = []) {
  const completed = subtasks.filter((s) => s.status === "completed").length;
  return Math.round((completed / Math.max(1, subtasks.length)) * 100);
}
