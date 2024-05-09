import React from 'react'
import Layout from '../../Layout'
import { Link } from 'react-router-dom';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { IoEyeSharp } from "react-icons/io5";

 const ContactUsList = () => {
    const list_data = [
        {
          _id: 1,
          name:"Krishna",
          email_id: "Krishna@gmail.com",
          message: "krishna  message",
         dated:"2024-05-12"
        },
        {
            _id: 2,
            name:"Sita",
            email_id: "sita@gmail.com",
            message: " sita message",
           dated:"2024-05-12"
        }
      ];
      const handleDelete = (id) => {
        // Implement your delete logic here
        console.log(`Deleting project with ID ${id}`);
      };
      return (
        <Layout>
          <div className="px-2 py-2 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Contact Us List</h1>
             
            </div>
            <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap custom-table-width">
              <thead className="bg-gray-900">
                <tr className="text-left text-white">
                  <th className="px-6 py-4 text-lg font-semibold uppercase">Name</th>
                  <th className="px-6 py-4 text-lg font-semibold uppercase">Email id</th>
                  <th className="px-6 py-4 text-lg font-semibold uppercase">Message</th>
                  <th className="px-6 py-4 text-lg font-semibold uppercase">Dated</th>
                  <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
                </tr>
              </thead>
    
              <tbody className="divide-y divide-gray-200">
                {list_data.map(data => (
                  <tr key={data._id} className="text-2xl text-left text-gray-600 hover:bg-teal-200">
                    <td className="px-6 py-4">{data.name}</td>
                    <td className="px-6 py-4">{data.email_id}</td>
                    <td className="px-6 py-4">{data.message}</td>
                    <td className="px-6 py-4">{data.dated}</td>
                    <td className="flex items-center px-6 py-4 mt-10">
                      <Link to={`/admin/ContactUsView/${data._id}`} className="text-blue-500 hover:text-blue-700">
                        <IoEyeSharp className="text-xl hover:text-blue-700" />
                      </Link>
                      <FaTrash onClick={() => handleDelete(data._id)} className="ml-2 text-xl hover:text-red-700" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Layout>
      );
}
export default ContactUsList
