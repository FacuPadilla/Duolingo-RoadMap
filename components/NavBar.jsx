// src/components/Navbar.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar({
  brand = "Learning Roadmap",
  ctaLabel = "Comenzar",
}) {
  const [open, setOpen] = useState(false);

  const onCtaClick = () => {
    document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Main"
          className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-primary-900/20 backdrop-blur-md shadow-lg shadow-primary-900/10"
        >
          {/* Izquierda: Brand */}
          <a
            href="/"
            className="group inline-flex items-center gap-2 pl-4 sm:pl-5 py-3"
            aria-label={brand}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/20 border border-primary-500/30">
              <Sparkles className="h-5 w-5 text-accent-400" />
            </span>
            <span className="text-white font-semibold tracking-tight">
              {brand}
            </span>
          </a>

          {/* Derecha: CTA + Burger */}
          <div className="flex items-center gap-2 pr-2 sm:pr-3">
            <button
              onClick={onCtaClick}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 shadow-md shadow-primary-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 transition-all"
            >
              {ctaLabel}
            </button>

            <button
              className="inline-flex md:hidden p-2 rounded-xl border border-white/10 text-white/90 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="md:hidden"
          >
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-md shadow-lg">
                <div className="flex flex-col py-2">
                  <div className="px-4 pb-4 pt-2">
                    <button
                      onClick={() => {
                        setOpen(false);
                        onCtaClick && onCtaClick();
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 shadow-md shadow-primary-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 transition-all"
                    >
                      {ctaLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
