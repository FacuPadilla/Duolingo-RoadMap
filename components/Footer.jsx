// src/components/Footer.jsx
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-primary-900/20 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + Marca */}
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/20 border border-primary-500/30">
            <Sparkles className="h-5 w-5 text-accent-400" />
          </span>
          <span className="text-white font-semibold tracking-tight">
            Learning Roadmap
          </span>
        </div>

        {/* Texto o Links */}
        <p className="text-sm text-primary-200/70 text-center sm:text-right">
          © {new Date().getFullYear()} Facundo Padilla – Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
