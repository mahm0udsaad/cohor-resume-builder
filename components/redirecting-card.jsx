import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";

const RedirectingCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-3xl overflow-hidden"
    >
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="mb-6"
        >
          <CheckCircle className="w-20 h-20 text-green-500" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#3b51a3] mb-4">
          Successfully Saved Your Data!
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Redirecting to dashboard...
        </p>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-[#3b51a3]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RedirectingCard;
