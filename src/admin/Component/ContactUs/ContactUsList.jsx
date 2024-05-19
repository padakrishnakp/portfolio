import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert module
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const ContactUsList = () => {
  const [list_data, setListData] = useState([]);

  useEffect(() => {
    fetchContactUsList();
  }, []);

  const fetchContactUsList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/contactUs/contactUsList');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setListData(responseData.list_data);
    } catch (error) {
      console.error('Error fetching contact us list:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              const response = await fetch(`http://localhost:3001/api/v1/contactUs/contactUsDelete/${id}`, {
                method: 'DELETE'
              });
              if (response.status === 200) {
                fetchContactUsList(); // Refresh the list after successful deletion
              } else {
                throw new Error('Failed to delete item');
              }
            }
          },
          {
            label: 'No',
            onClick: () => {}
          }
        ]
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
            {list_data.map((data) => (
              <tr key={data._id} className="text-2xl text-left text-gray-600 hover:bg-teal-200">
                <td className="px-6 py-4">{data.name}</td>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.message}</td>
                <td className="px-6 py-4">{data.created_at.substring(0, 10)}</td>
                <td className="flex items-center px-6 py-4 mt-10">
                  <Link to={`/admin/ContactUsView/${data._id}`} className="text-blue-500 hover:text-blue-700">
                    <IoEyeSharp className="text-xl hover:text-blue-700" />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(data._id)}
                    className="ml-2 text-xl hover:text-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ContactUsList;
