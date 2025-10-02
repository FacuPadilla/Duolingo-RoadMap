import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Card from "./ui/Card";
import ProgressBar from "./ui/ProgressBar";
import StatusBadge from "./ui/StatusBadge";
import SubtaskItem from "./SubtaskItem";

const StepCard = ({ step, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calcular progreso
  const completedSubtasks = step.subtasks.filter(
    (st) => st.status === "completed"
  ).length;
  const totalSubtasks = step.subtasks.length;
  const progress = (completedSubtasks / totalSubtasks) * 100;

  // Configuración de gradientes según estado
  const getGradientConfig = (status) => {
    const configs = {
      completed: "from-green-400 to-emerald-500",
      in_progress: "from-blue-400 to-indigo-500",
      review: "from-yellow-400 to-orange-500",
      blocked: "from-gray-300 to-gray-400",
      pending: "from-gray-200 to-gray-300",
    };
    return configs[status] || configs.pending;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="w-full"
    >
      <Card variant="glass" className="overflow-hidden">
        {/* Header de la tarjeta */}
        <div
          className={`bg-gradient-to-br ${getGradientConfig(
            step.status
          )} p-6 cursor-pointer`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Badge de nivel */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                <span className="text-white text-xs font-bold">
                  Nivel {step.id}
                </span>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-white mb-2">
                {step.title}
              </h3>

              {/* Subtareas completadas */}
              <p className="text-white/90 text-sm font-medium">
                {completedSubtasks} de {totalSubtasks} completadas
              </p>
            </div>

            {/* Botón expandir */}
            <motion.button
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Barra de progreso */}
          <div className="mt-4">
            <div className="bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Contenido expandible - Subtareas */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 space-y-3">
                {/* Badge de estado */}
                <div className="flex items-center justify-between mb-4">
                  <StatusBadge status={step.status} />
                  <span className="text-sm text-gray-500 font-medium">
                    {Math.round(progress)}% completado
                  </span>
                </div>

                {/* Lista de subtareas */}
                <div className="space-y-2">
                  {step.subtasks.map((subtask, idx) => (
                    <SubtaskItem
                      key={subtask.id}
                      subtask={subtask}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default StepCard;
