import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Lock, AlertCircle } from "lucide-react";

const SubtaskItem = ({ subtask, index }) => {
  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        icon: CheckCircle2,
        iconColor: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-100",
      },
      in_progress: {
        icon: Clock,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
      },
      review: {
        icon: AlertCircle,
        iconColor: "text-yellow-500",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-100",
      },
      blocked: {
        icon: Lock,
        iconColor: "text-gray-400",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-100",
      },
      pending: {
        icon: Circle,
        iconColor: "text-gray-300",
        bgColor: "bg-white",
        borderColor: "border-gray-100",
      },
    };
    return configs[status] || configs.pending;
  };

  const config = getStatusConfig(subtask.status);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex items-center gap-3 p-4 rounded-2xl border ${config.bgColor} ${config.borderColor} transition-all hover:shadow-md`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />
      <span
        className={`text-sm font-medium ${
          subtask.status === "completed"
            ? "text-gray-500 line-through"
            : "text-gray-700"
        }`}
      >
        {subtask.name}
      </span>
    </motion.div>
  );
};

export default SubtaskItem;
