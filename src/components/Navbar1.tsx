import React from "react";
import { TbLayoutSidebarRightFilled } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import profile from "../assets/profile.jpeg";
import { IoNotificationsSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const Navbar1 = () => {
  return (
    <nav className="w-full py-2 px-5 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <TbLayoutSidebarRightFilled className="text-[#5D8363]" size={25} />
        <p className="text-[#B3B3B3] text-md flex items-center gap-1 cursor-pointer">
          {"Workspace > Folder 2 > "}
          <span className="text-black font-semibold">Spreadsheet 3</span>
        </p>
        <BsThreeDots
          size={20}
          className="text-[#B3B3B3] ml-3 hover:bg-slate-200 rounded-md cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search within sheet"
          className="py-2 bg-slate-200 rounded-md outline-none px-6"
        />
        <CiSearch className="absolute ml-1"/>
        <IoNotificationsSharp size={25} className="text-[#5D8363] cursor-pointer" />
        <div className="flex gap-2 items-center">
          <img
            src={profile}
            alt="Profile photo"
            className="w-[40px] h-[40px] rounded-full"
          />
          <div className="flex flex-col justify-start items-start cursor-pointer">
            <h2 className="text-black">John Doe</h2>
            <p className="text-[#B3B3B3]">John.doe...</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
