import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Sidebar} from "../components/Sidebar";
import Model from "../components/model"; // ✅ Modal popup wrapper

// Icons
import { RiDownloadLine } from "react-icons/ri";
import { TfiUpload } from "react-icons/tfi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { PiArrowsSplitFill } from "react-icons/pi";
import { FiEyeOff } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { TbLayoutGrid } from "react-icons/tb";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

// Props
type NavbarProps = {
  isHidden: boolean;
  setIsHidden: (value: boolean) => void;
};

const Navbar2 = ({ isHidden, setIsHidden }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleToolbar = () => setIsOpen((prev) => !prev);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="w-full py-1 px-5 flex justify-between items-center">
        {/* Left toolbar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleToolbar}
            className="flex items-center space-x-1 text-gray-800 hover:text-black"
          >
            <span>Tool bar</span>
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
                <div
                  onClick={() => setIsHidden(!isHidden)}
                  className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black"
                >
                  <FiEyeOff />
                  <span>{isHidden ? "Show fields" : "Hide fields"}</span>
                </div>

                {/* Sort */}
                <div
                  onClick={() => setShowModal(true)}
                  className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black"
                >
                  <BiSortAlt2 />
                  <span>Sort</span>
                </div>

                {/* Filter */}
                <div
                  onClick={() => setShowModal(true)}
                  className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black"
                >
                  <FaFilter />
                  <span>Filter</span>
                </div>

                {/* Cell View */}
                <div
                  onClick={() => setShowModal(true)}
                  className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black"
                >
                  <TbLayoutGrid />
                  <span>Cell view</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Import */}
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md hover:bg-[#B3B3B3] py-2 px-2 flex justify-center items-center gap-1 border border-slate-300"
          >
            <RiDownloadLine />
            Import
          </button>

          {/* Export */}
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md hover:bg-[#B3B3B3] py-2 px-2 flex justify-center items-center gap-1 border border-slate-300"
          >
            <TfiUpload />
            Export
          </button>

          {/* Share */}
          <button
            onClick={() => setShowModal(true)}
            className="rounded-md hover:bg-[#B3B3B3] py-2 px-2 flex justify-center items-center gap-1 border border-slate-300"
          >
            <FaRegShareFromSquare />
            Share
          </button>

          {/* New Action */}
          <button
            onClick={toggleSidebar}
            className="bg-[#5D8363] py-2 px-6 flex justify-center items-center gap-1 text-white rounded-md"
          >
            <PiArrowsSplitFill className="text-white" size={20} />
            New Action
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            ref={sidebarRef}
            key="sidebar"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-50"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      {showModal && <Model onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar2;
