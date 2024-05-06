import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Sidebar = ({ setActivePage }) => {
  return (
    <aside className="w-64 bg-slate-300"> {/* Add mt-4 for margin-top */}
      <div className="h-20 p-4 font-bold text-slate-700 item-center bg-cyan-300">
      <h1 className='mt-5 text-center'>Admin Dashboard krishna</h1>
      </div>
      <ul className="py-4">
        <li className="px-6 py-2 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/AboutList" className="flex items-center">
            <AccountBalanceWalletIcon className="mr-2" />
            About
          </Link>
        </li>

        <li className="px-6 py-2 text-lg font-bold text-blue-600 cursor-pointer hover:bg-gray-700">
          <Link to="/admin/AboutList" className="flex items-center">
            <AccountBalanceWalletIcon className="mr-2" />
           Experiences
          </Link>
        </li>
        
      </ul>
    </aside>
  );
};

export default Sidebar;
