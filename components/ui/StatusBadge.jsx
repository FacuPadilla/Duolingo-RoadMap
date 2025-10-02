const StatusBadge = ({ status }) => {
  const statusConfig = {
    completed: {
      label: "Completado",
      className: "bg-green-100 text-green-700 border-green-200",
    },
    in_progress: {
      label: "En progreso",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    pending: {
      label: "Pendiente",
      className: "bg-gray-100 text-gray-700 border-gray-200",
    },
    blocked: {
      label: "Bloqueado",
      className: "bg-gray-200 text-gray-500 border-gray-300",
    },
    review: {
      label: "En revisión",
      className: "bg-yellow-100 text-yellow-700 border-yellow-200",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
