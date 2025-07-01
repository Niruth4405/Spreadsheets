import { useState } from "react";
import { RiDownloadLine } from "react-icons/ri";
import { TfiUpload } from "react-icons/tfi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { PiArrowsSplitFill } from "react-icons/pi";
import { FiEyeOff } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { TbLayoutGrid } from "react-icons/tb";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleToolbar = () => setIsOpen((prev) => !prev);

  return (
    <nav className="w-full py-1 px-5 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleToolbar}
          className="flex items-center space-x-1 text-gray-800 hover:text-black"
        >
          <span>Tool bar </span>
          <HiOutlineChevronDoubleRight className="text-lg" />
          
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black">
                <FiEyeOff />
                <span>Hide fields</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black">
                <BiSortAlt2 />
                <span>Sort</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black">
                <FaFilter />
                <span>Filter</span>
              </div>
              <div className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black">
                <TbLayoutGrid />
                <span>Cell view</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        <button className='rounded-md hover:bg-[#B3B3B3] py-2 px-2 flex justify-center items-center gap-1 border border-slate-300'>
          <RiDownloadLine />
          Import
        </button>
        <button className='rounded-md hover:bg-[#B3B3B3] py-2 px-2 flex justify-center items-center gap-1 border border-slate-300'>
          <TfiUpload />
          Export
        </button>
        <button className='rounded-md hover:bg-[#B3B3B3] py-2 px-2 flex justify-center items-center gap-1 border border-slate-300'>
          <FaRegShareFromSquare />
          Share
        </button>
        <button className="bg-[#5D8363] py-2 px-6 flex justify-center items-center gap-1 text-white rounded-md">
          <PiArrowsSplitFill className='text-white' size={20}/>
          New Action
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;
