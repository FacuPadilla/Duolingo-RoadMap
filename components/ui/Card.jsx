import { motion } from "framer-motion";

const Card = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-white",
    glass: "bg-white/90 backdrop-blur-xl",
    gradient: "bg-gradient-to-br from-white to-primary-50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-3xl shadow-lg ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
