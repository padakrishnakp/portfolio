import React from 'react'
import Layout from '../../Layout'
import { Link } from "react-router-dom";


 const ContactUsView = () => {
    let data = 
        {
            _id: 1,
            name:"Krishna",
            email_id: "Krishna@gmail.com",
            message: "krishna  message ",
           dated:"2024-05-12"
          }


    return (
        <Layout>
          <div className="px-2 py-2 overflow-x-auto">
            <div className="flex items-center justify-between mb-4"> 
              <h1 className="text-2xl font-bold text-cyan-800">Contact Us User View</h1>
            </div>
            <hr className="w-full h-5 border-purple-500 border-t-9" />

    
            <div>
              <label htmlFor="companyName" className="block mb-2 ml-8 font-bold text-gray-700">ContactUs User Name</label>
              <textarea id="roll" value={data.name} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500 read-only:"></textarea>
    
            
              <label htmlFor="roll" className="block mb-2 font-bold text-gray-700">Email ID</label>
              <textarea id="roll" value={data.email_id}  className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500 read-only:" ></textarea>

              <label htmlFor="roll" className="block mb-2 font-bold text-gray-700">Message</label>
              <textarea id="roll" value={data.message}  className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500 read-only:"></textarea>
              
            
              <div className="flex mb-4">
                <div className="mr-4">
                  <label htmlFor="fromDate" className="block mb-2 font-bold text-gray-700"> Date</label>
                  <input type="text" id="fromDate" value={data.dated} className="h-10 px-3 py-2 text-center border rounded-lg w-60 focus:outline-none focus:border-blue-500 read-only" placeholder="Enter From Date" />
                </div>
                
              </div>
            
              <hr className="w-full h-20 my-4 border-purple-500 border-t-9" />
            
              <div className="flex justify-center"> 
                <Link to="/admin/ContactUsList" id='projectList' className="px-4 py-2 text-2xl text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
              </div>
            </div>
          </div>
        </Layout>
      );
}
export default ContactUsView
