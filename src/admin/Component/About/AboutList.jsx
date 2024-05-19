import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutList = () => {
  const [list_data, setList_data] = useState([]);

  useEffect(() => {
    fetchAboutList();
  }, []);

  const fetchAboutList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/about/list');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setList_data(data.list_data);
    } catch (error) {
      console.error('Error fetching about list:', error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        const response = await fetch(`http://localhost:3001/api/v1/about/delete/${_id}`, {
          method: 'DELETE'
        });
        if (response.status === 200) {
          window.location.href = '/admin/AboutList';
          } else {
          throw new Error('Failed to delete item');
        }
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">About List</h1>
          <Link to={`/admin/AboutAdd`} className="mr-2 text-blue-500 hover:text-blue-700">
            <button className="px-5 py-2 text-white bg-blue-500 rounded hover:text-blue-500 hover:bg-teal-200">Add</button>
          </Link>
        </div>
        <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap custom-table-width">
          <thead className="bg-gray-900">
            <tr className="text-left text-white">
              <th className="px-6 py-4 text-lg font-semibold uppercase">Image</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Type</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Status</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {list_data.map(data => (
              <tr key={data._id} className="text-left text-gray-600 hover:bg-teal-200">
                <td className="px-6 py-4">
                  <img src={`http://localhost:3001/${data.about_file}`} className='h-40 w-50' alt="About Image"/>
                </td>
                <td className="px-6 py-4">{data.type}</td>
                <td className="px-6 py-4">{data.status.toString()}</td>                <td className="flex items-center px-6 py-4 mt-10">
                  <Link to={`/admin/AboutView/${data._id}`} className="text-blue-500 hover:text-blue-700">
                    <FaRegEdit className="text-xl hover:text-blue-700" /> 
                  </Link>
                  <FaTrash onClick={() => handleDelete(data._id)} className="text-xl hover:text-red-700" /> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AboutList;
