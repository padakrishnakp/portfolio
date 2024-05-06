import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-slate-200 sm:px-5">
      <section className="flex justify-center py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24">
            <div className="flex items-center mb-10 lg:mb-0">
              <div>
                <h4 className="mb-4 text-base font-medium leading-6 text-center text-indigo-600 lg:text-left">Contact Us</h4>
                <h2 className="text-4xl font-semibold leading-10 text-center text-gray-900 font-manrope mb-9 lg:text-left">Reach Out To Us</h2>
                <form action="">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="w-full px-4 py-2 mb-8 text-lg font-normal leading-7 text-gray-600 border border-gray-200 rounded-full shadow-sm h-14 placeholder-text-400 focus:outline-none" placeholder="Name" />
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 mb-8 text-lg font-normal leading-7 text-gray-600 border border-gray-200 rounded-full shadow-sm h-14 placeholder-text-400 focus:outline-none" placeholder="Email" />
                  <label htmlFor="message">Message</label>
                  <textarea id="message" className="w-full h-48 px-4 py-4 mb-8 text-lg font-normal leading-7 text-gray-600 border border-gray-200 shadow-sm resize-none placeholder-text-400 rounded-2xl focus:outline-none" placeholder="Message"></textarea>
                  <div className="flex justify-center">
                  <Link to="/" className="flex items-center justify-center px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700" style={{ width: '700px' }}>
                  Submit
                </Link>
                
                
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
