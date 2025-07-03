import { motion } from "framer-motion";

export const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-[#B3B3B3] w-[400px] fixed top-0 right-0 z-50 shadow-lg p-4"
    >
      <h1 className="font-semibold text-lg">No action available</h1>
    </motion.div>
  );
};