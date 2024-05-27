import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ProjectList = () => {
  const [list_data, setListData] = useState([]);

  useEffect(() => {
    fetchContactUsList();
  }, []);

  const fetchContactUsList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/project/projectList');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      console.log("responseData", responseData)
      setListData(responseData.list_data || []); 
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
              const response = await fetch(`http://localhost:3001/api/v1/project/projectDelete/${id}`, {
                method: 'DELETE'
              });
              if (response.status === 200) {
                fetchContactUsList();
              } else {
                throw new Error('Failed to delete item');
              }
            }
          },
          {
            label: 'No',
            onClick: () => { }
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
          <h1 className="text-2xl font-bold text-gray-800">Project List</h1>
          <Link to={`/admin/ProjectAdd`} className="mr-2 text-blue-500 hover:text-blue-700">
            <button className="px-5 py-2 text-white bg-blue-500 rounded hover:text-blue-500 hover:bg-slate-600">Add</button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-300">
            <thead className="bg-gray-900">
              <tr className="text-left text-white">
                <th className="px-6 py-4 text-lg font-semibold uppercase">Project Name</th>
                <th className="px-6 py-4 text-lg font-semibold uppercase">Image</th>
                <th className="hidden px-6 py-4 text-lg font-semibold uppercase md:table-cell">URL</th>
                <th className="px-6 py-4 text-lg font-semibold uppercase">Status</th>
                <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list_data && list_data.map(data => (
                <tr key={data._id} className="text-xl text-left text-gray-600 hover:bg-teal-200">
                  <td className="px-6 py-4">{data.project_name}</td>
                  <td className="px-6 py-4">
                    <img src={data.project_image} className="w-20 h-20 md:h-40 md:w-50" alt="Project" />
                  </td>
                  <td className="hidden px-6 py-4 md:table-cell">{data.project_url}</td>
                  <td className={`px-6 py-4 ${data.status ? 'text-green-500' : 'text-red-500'}`}>
                    {data.status ? "Active" : "Inactive"}
                  </td>
                  <td className="flex items-center px-6 py-4 space-x-4">
                    <Link to={`/admin/ProjectView/${data._id}`} className="text-blue-500 hover:text-blue-700">
                      <FaRegEdit className="text-xl" />
                    </Link>
                    <FaTrash onClick={() => handleDelete(data._id)} className="text-xl text-red-500 cursor-pointer hover:text-red-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectList;
