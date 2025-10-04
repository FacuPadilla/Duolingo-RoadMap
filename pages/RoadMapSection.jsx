// src/components/RoadmapSection.jsx
import React, { Suspense } from "react";
import { roadmapData } from "../data/roadmapData";

// Registro de componentes por id o por título (lo que prefieras)
import StepHTML from "../components/StepHTML";
import StepCSSIntro from "../components/StepCSSIntro";
import StepJSBasic from "../components/StepJSBasic";
import StepCSSAdvanced from "../components/StepCSSAdvanced";

// Fallback genérico por si aún no creaste un componente específico
function StepFallback({ step }) {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {step.title}
          </h2>
          <p className="mt-3 text-white/70">
            Este bloque usa el componente genérico. Creá un componente dedicado
            en
            <span className="font-mono text-white/80"> src/components/</span> y
            agregalo al registro.
          </p>
        </div>
      </div>
    </section>
  );
}

// Resolver componente por id o por título
const componentRegistry = {
  // por id
  1: StepHTML,
  2: StepCSSIntro,
  3: StepCSSAdvanced,
  4: StepJSBasic,
};

function resolveStepComponent(step) {
  const ById = componentRegistry[step.id];
  // const ByTitle = componentRegistry[step.title];
  return ById /* || ByTitle */ || StepFallback;
}

export default function RoadmapSection() {
  const steps = roadmapData?.steps ?? [];
  return (
    <main className="w-full">
      <Suspense fallback={null}>
        {steps.map((step, idx) => {
          const Cmp = resolveStepComponent(step);
          return <Cmp key={step.id} step={step} index={idx} />;
        })}
      </Suspense>
    </main>
  );
}
