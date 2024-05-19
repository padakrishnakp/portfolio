import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { GiSkills } from "react-icons/gi";
import { HiCube } from "react-icons/hi2";
import { GrProjects } from "react-icons/gr";
import { MdContactPhone } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";


const Sidebar = ({ setActivePage }) => {
  return (
    <aside className="w-64 bg-slate-300"> 

      <div className="flex items-center justify-center h-20 p-4 font-bold text-slate-700 bg-cyan-300">
        <h1 className='mt-5 text-2xl text-center hover:text-red-200'>Menu Item</h1>
      </div>

      <ul className="py-20">
        <li className="px-6 py-6 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/HomeList" className="flex items-center">
            <TiHomeOutline className="mr-2" />
           Home
          </Link>
        </li>

        <li className="px-6 py-6 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/AboutList" className="flex items-center">
            <AccountBalanceWalletIcon className="mr-2" />
            About List
          </Link>
        </li>

        <li className="px-6 py-6 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/SkillList" className="flex items-center">
            <GiSkills className="mr-2" />
            Skill List
          </Link>
        </li>

        <li className="px-6 py-6 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/experiencesList" className="flex items-center">
            <HiCube className="mr-2" />
            Experiences List
          </Link>
        </li>

        <li className="px-6 py-6 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/ProjectList" className="flex items-center">
            <GrProjects className="mr-2" />
            Project 
          </Link>
        </li>

        <li className="px-6 py-6 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/ContactUsList" className="flex items-center">
            <MdContactPhone className="mr-2"/>
            Contact Us 
          </Link>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
