import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 

const Header = () => {
  return (
    <div className='flex justify-between p-5 bg-primary'>
      <Link to="/login" className="flex items-center justify-center">
        <FaUser className='text-4xl cursor-pointer text-tertiary' />
      </Link>
    </div>
  );
}

export default Header;
