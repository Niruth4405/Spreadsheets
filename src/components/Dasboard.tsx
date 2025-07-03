import { useState } from "react";
import Navbar2 from "./Navbar2"; 
import Table from "./Table";     
import { AnimatePresence, motion } from "framer-motion";

const Dashboard = () => {
  const [isHidden, setIsHidden] = useState(false); 

  return (
    <div className="w-full">
      <Navbar2 isHidden={isHidden} setIsHidden={setIsHidden} />

      <AnimatePresence>
        {!isHidden && (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Table />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
