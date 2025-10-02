import { motion } from "framer-motion";

const ProgressBar = ({ progress = 0, showLabel = true, size = "md" }) => {
  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-3",
  };

  return (
    <div className="w-full">
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
        />
      </div>
      {showLabel && (
        <p className="text-xs text-gray-600 mt-1 text-right font-medium">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
};

export default ProgressBar;
