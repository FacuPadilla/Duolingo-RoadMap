// src/components/TechPager.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Ejemplo de data; podés inyectarla por props si querés
const technologiesDefault = [
  { name: "HTML", icon: "/html.png" },
  { name: "CSS", icon: "/css.png" },
  { name: "JavaScript", icon: "/js.png" },
  { name: "React", icon: "/react.png" },
  { name: "Node.js", icon: "/node.png" },
  { name: "Python", icon: "/python.png" },
  { name: "Git", icon: "/git.png" },
  { name: "SQL", icon: "/sql.png" },
  { name: "TypeScript", icon: "/ts.png" },
  { name: "Docker", icon: "/docker.png" },
];

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function TechPager({
  items = technologiesDefault,
  cardWidth = 140, // ancho fijo de tarjeta en px (incluye contenido)
  gap = 24, // gap horizontal en px entre tarjetas
  sidePadding = 16, // padding interno del carrusel en px a cada lado
  height = 104, // alto de tarjeta en px
}) {
  const ref = useRef(null);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(0); // 1 derecha, -1 izquierda para animación

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const update = () => {
      const width = el.clientWidth;
      const usable = Math.max(0, width - sidePadding * 2);
      const full = cardWidth + gap;
      const count = Math.max(1, Math.floor((usable + gap) / full));
      setItemsPerPage(count);
      setPage(0);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [cardWidth, gap, sidePadding]);

  const pages = useMemo(() => {
    return chunk(items, itemsPerPage);
  }, [items, itemsPerPage]);

  const canPage = pages.length > 1;

  const goLeft = () => {
    if (!canPage) return;
    setDir(-1);
    setPage((p) => (p - 1 + pages.length) % pages.length);
  };
  const goRight = () => {
    if (!canPage) return;
    setDir(1);
    setPage((p) => (p + 1) % pages.length);
  };

  return (
    <div
      ref={ref}
      className="relative w-full max-w-6xl mx-auto my-20"
      style={{ paddingLeft: sidePadding, paddingRight: sidePadding }}
    >
      <div className="py-6 sm:py-8 bg-transparent">
        {/* Carrusel: ESTE es el único que mantiene overflow-hidden */}
        <div className="relative rounded-none overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={`page-${page}`}
              custom={dir}
              initial={{ x: dir === 0 ? 0 : dir > 0 ? 32 : -32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir > 0 ? -32 : 32, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-6"
              style={{ minHeight: height }}
            >
              {pages[page]?.map((t) => (
                <div
                  key={t.name}
                  className="flex-none flex flex-col items-center justify-center rounded-xl border border-white/10 backdrop-blur-sm bg-white/5"
                  style={{ width: cardWidth, height }}
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    className="w-9 h-9 object-contain select-none"
                    draggable="false"
                  />
                  <span className="mt-2 text-sm font-semibold text-white/85 tracking-wide whitespace-nowrap">
                    {t.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mover las flechas AQUÍ, como hermanos del overflow-hidden */}
        {canPage && (
          <>
            <button
              onClick={goLeft}
              aria-label="Anterior"
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goRight}
              aria-label="Siguiente"
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 rounded-full p-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {canPage && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDir(i > page ? 1 : -1);
                  setPage(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === page
                    ? "w-6 bg-white/80"
                    : "w-3 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Ir a la página ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
