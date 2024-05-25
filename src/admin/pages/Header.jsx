import React, { useEffect, useState } from 'react';
import { IoIosNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaUserAstronaut } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

const Header = ({ notificationCount }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    // Navigate to login or home page after logout
    window.location.href = '/login';
  };

  useEffect(() => {
    UsersView();
  }, []);

  const UsersView = async () => {
    try {
      const storedSession = localStorage.getItem('session');
      const sessionData = JSON.parse(storedSession);

      const response = await fetch(`http://localhost:3001/api/v1/user/userView/${sessionData.user_details._id}`, {
        method: 'GET'
      });

      if (response.status === 200) {
        const data = await response.json(); // Ensure you parse the JSON response
        if (data.userDetails.profile_picture) {
          setProfilePic(data.userDetails.profile_picture);
          setUserName(data.userDetails.user_name);
        }
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 text-white bg-blue-500">
      <div className="flex items-center">
        <div className="relative">
          <img
            src={profilePic || 'https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg'}
            alt="Profile"
            className="w-12 h-12 mr-3 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 border rounded-lg shadow-lg bg-cyan-300 w-14">
              <Link to="/admin/ProfileView" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                <div className="relative group">
                  <FaUserAstronaut className='mt-2'/>
                  <span className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-y-1/2 bg-gray-800 rounded-md opacity-0 left-12 top-1/2 whitespace-nowrap group-hover:opacity-100">User Profile</span>
                </div>
              </Link>
              <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-blue-100">
                <div className="relative group">
                  <BiLogOutCircle/>
                  <span className="absolute px-2 py-1 text-sm text-white transition-opacity transform -translate-y-1/2 bg-gray-800 rounded-md opacity-0 left-12 top-1/2 whitespace-nowrap group-hover:opacity-100">User Logout</span>
                </div>
              </button>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold">{userName}</h2>
      </div>
      <div className="flex items-center">
        <IoIosNotifications className="mr-2" style={{ fontSize: "24px" }} />
        <div className="flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 rounded-full">{notificationCount}</div>
      </div>
    </header>
  );
};

export default Header;
