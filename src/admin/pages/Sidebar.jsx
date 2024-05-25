import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { GiSkills } from "react-icons/gi";
import { HiCube } from "react-icons/hi2";
import { GrProjects } from "react-icons/gr";
import { MdContactPhone } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";

const Sidebar = ({ setActivePage }) => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = 'white';
    e.currentTarget.querySelector('a').style.color = 'black';
    e.currentTarget.querySelector('a').style.transition = 'color 0.3s';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent';
    e.currentTarget.querySelector('a').style.color = 'white';
  };

  return (
    <aside style={{ width: '250px', height: '100vh', backgroundColor: '#1a1a1a', color: '#fff', padding: '20px', boxSizing: 'border-box' }}> 

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', padding: '20px', backgroundColor: '#2c2c2c', borderRadius: '10px', marginBottom: '30px' }}>
        <img src="https://t3.ftcdn.net/jpg/05/17/79/88/360_F_517798849_WuXhHTpg2djTbfNf0FQAjzFEoluHpnct.jpg" alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
        <h2 style={{ margin: '0', fontSize: '20px' }}>Tania Andrew</h2>
      </div>

      <ul style={{ listStyle: 'none', padding: '0' }}>
        <li style={{ margin: '20px 0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/admin/HomeList" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '10px', transition: 'background-color 0.3s, color 0.3s' }}>
            <TiHomeOutline style={{ marginRight: '10px' }} />
            Home
          </Link>
        </li>

        <li style={{ margin: '20px 0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/admin/AboutList" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '10px', transition: 'background-color 0.3s, color 0.3s' }}>
            <AccountBalanceWalletIcon style={{ marginRight: '10px' }} />
            About List
          </Link>
        </li>

        <li style={{ margin: '20px 0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/admin/SkillList" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '10px', transition: 'background-color 0.3s, color 0.3s' }}>
            <GiSkills style={{ marginRight: '10px' }} />
            Skill List
          </Link>
        </li>

        <li style={{ margin: '20px 0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/admin/experiencesList" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '10px', transition: 'background-color 0.3s, color 0.3s' }}>
            <HiCube style={{ marginRight: '10px' }} />
            Experiences List
          </Link>
        </li>

        <li style={{ margin: '20px 0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/admin/ProjectList" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '10px', transition: 'background-color 0.3s, color 0.3s' }}>
            <GrProjects style={{ marginRight: '10px' }} />
            Project 
          </Link>
        </li>

        <li style={{ margin: '20px 0' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/admin/ContactUsList" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '10px', transition: 'background-color 0.3s, color 0.3s' }}>
            <MdContactPhone style={{ marginRight: '10px' }}/>
            Contact Us 
          </Link>
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
