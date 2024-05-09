import React, { useEffect, useRef } from 'react'; // Importing useEffect and useRef
import Layout from './Layout';
import { FaUsers } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import videoSrc from '../img/an.mp4';

const myStyles = {
  left: '50%',
  top: '33%',
  height: '44rem',
  paddingRight: '20rem'
};

const Admin = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          console.log("Video started playing");
        })
        .catch((error) => {
          console.error("Error playing video:", error);
        });
    }
  }, []); 

  return (
    <Layout>
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="px-4 py-6 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </header>

        <main className="flex-grow">
          <div className="grid grid-cols-3 gap-8 p-8 mx-auto">
            <div className="flex items-center justify-start h-40 p-4 text-4xl border border-4 shadow-md bg-slate-500 border-cyan-100">
              <FaUsers className="mr-4 text-cyan-100"/>
              <span className='ml-4 text-cyan-100'>200</span>
            </div>
            <div className="flex items-center justify-start h-40 p-4 text-4xl border border-4 shadow-md bg-slate-500 border-cyan-100">
              <FaIndianRupeeSign className="text-cyan-100"/>
              <span className='ml-4 text-cyan-100'>20000</span>
            </div>
            <div className="flex items-center justify-start h-40 p-4 text-4xl border border-4 shadow-md bg-slate-500 border-cyan-100">
              <AiOutlineProduct className="text-cyan-100"/>
              <span className='ml-4 text-cyan-100'>20000</span>
            </div>
          </div>

          <div className="absolute" style={myStyles}>
            {/* Adding ref attribute to reference the video element */}
            <video ref={videoRef} className="w-full h-full" autoPlay muted loop>
              <source src={videoSrc} type="video/mp4"/>
            </video>
          </div>

        </main>

        <footer className="bg-white shadow">
          <div className="px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Admin;
