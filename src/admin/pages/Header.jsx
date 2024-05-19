import React, { useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaUserAstronaut } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
const Header = ({ notificationCount }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 text-white bg-blue-500">
      <div className="flex items-center">
        <div className="relative">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMZaGbdjX0CzIYFmBULzR91Lri-8SbqqnRVQ&s"
            alt="Profile"
            className="w-12 h-12 mr-3 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 border rounded-lg shadow-lg bg-cyan-300 w-14">
              <Link to="/admin/ProfileView" className="block px-4 py-2 text-gray-800 hover:bg-blue-100"><FaUserAstronaut className='mt-2'/>
              </Link>
              <Link to="/logout" className="block px-4 py-2 text-gray-800 hover:bg-blue-100"><BiLogOutCircle/></Link>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <div className="flex items-center">
        <IoIosNotifications className="mr-2" style={{ fontSize: "24px" }} />
        <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 rounded-full">{notificationCount}</div>
      </div>
    </header>
  );
};

export default Header;
