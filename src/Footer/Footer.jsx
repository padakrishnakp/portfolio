import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import fb from "../img/fb.png";
import ins from "../img/ins.png";

const Footer = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';
  if (isContactPage) {
    return null;
  }

  return (
    <div className='bg-blue-300'>
      <div className="flex flex-row py-5 mx-auto justify-content-flex-end">
          <div className="container">
          <div className="flex flex-col items-center justify-center text-center text-color-teal-50">
          <p className="text-lg">Email ID: <a href="mailto:krishnamandalpada@gmail.com" className="underline">krishnamandalpada@gmail.com</a></p>
              <p className="text-lg">Contact No: <a href="tel:+17864032866" className="underline">786-403-2866</a></p>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <a href="https://www.facebook.com/krishnapada.mandal.1420" className="text-white">
                    <img src={fb} alt="Facebook" width="32" height="32" />
                  </a>
                </div>
                <div>
                  <a href="https://www.instagram.com/krishnapada.mandal.1420/" className="text-white">
                    <img src={ins} alt="Instagram" width="32" height="32" />
                  </a>
                </div>
                <div>
                  {/* Use Link component to navigate to ContactUs page */}
                  <Link to="/contact" className="text-white">
                    <button className="px-4 py-2 font-bold text-white rounded bg-violet-500 hover:bg-blue-700">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Footer;
