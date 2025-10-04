// src/components/Footer.jsx
import React from "react";

export default function Footer({
  logoSrc = "/logo.svg",
  logoAlt = "Logo",
  children,
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-3">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-7 w-auto select-none"
                draggable="false"
              />
              <span className="text-white/80 text-sm">{logoAlt}</span>
            </div>

            <p className="text-white/60 text-sm">
              © {year} Corpora. Todos los derechos reservados.
            </p>
          </div>

          {children ? (
            <div className="mt-6 text-white/70 text-sm leading-relaxed">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
