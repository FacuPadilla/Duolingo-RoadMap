import { motion } from "framer-motion";
import StepCard from "../components/StepCard";
import Card from "../components/ui/Card";

const RoadmapPage = ({ data }) => {
  // Calcular estadísticas globales
  const totalSteps = data.steps.length;
  const completedSteps = data.steps.filter(
    (s) => s.status === "completed"
  ).length;
  const inProgressSteps = data.steps.filter(
    (s) => s.status === "in_progress"
  ).length;
  const globalProgress = (completedSteps / totalSteps) * 100;

  // Calcular total de subtareas
  const allSubtasks = data.steps.flatMap((step) => step.subtasks);
  const completedSubtasks = allSubtasks.filter(
    (st) => st.status === "completed"
  ).length;
  const totalSubtasks = allSubtasks.length;

  return (
    <div className="min-h-screen pb-8">
      {/* Header con glassmorphism */}
      <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Tu Camino de Aprendizaje
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Sigue avanzando paso a paso 🚀
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Tarjeta de progreso general */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Progreso General
              </h2>
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                {Math.round(globalProgress)}%
              </span>
            </div>

            {/* Barra de progreso global */}
            <div className="mb-6">
              <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${globalProgress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                />
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 gap-4">
              <StatItem
                label="Niveles"
                value={`${completedSteps}/${totalSteps}`}
                icon="🎯"
              />
              <StatItem
                label="Tareas"
                value={`${completedSubtasks}/${totalSubtasks}`}
                icon="✅"
              />
              <StatItem label="En progreso" value={inProgressSteps} icon="⚡" />
              <StatItem
                label="Restantes"
                value={totalSteps - completedSteps - inProgressSteps}
                icon="📚"
              />
            </div>
          </Card>
        </motion.div>

        {/* Lista de pasos - Mobile First: Vertical */}
        <div className="space-y-6">
          {data.steps.map((step, index) => (
            <div key={step.id} className="relative">
              <StepCard step={step} index={index} />

              {/* Línea conectora entre pasos */}
              {index < data.steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                  className="absolute left-1/2 -bottom-3 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-white/50 to-white/20 rounded-full origin-top"
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer motivacional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 mb-8"
        >
          <Card variant="glass" className="p-6 text-center">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-gray-700 font-medium">
              ¡Sigue así! Cada paso te acerca más a tu objetivo
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// Componente auxiliar para estadísticas
const StatItem = ({ label, value, icon }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-100">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  );
};

export default RoadmapPage;
