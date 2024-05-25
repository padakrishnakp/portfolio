import React, { useState, useEffect } from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { IoEyeSharp } from 'react-icons/io5';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const HomeList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetchHomeList();
  }, []);

  const fetchHomeList = async () => {
    try {
      const storedSession = localStorage.getItem('session');
      const sessionData = JSON.parse(storedSession);
      const userId = sessionData.userDetails?._id;
      const response = await fetch("http://localhost:3001/api/v1/home/homeList", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          userId: userId
        })
      }); 
       if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setListData(responseData.data); 
    } catch (error) {
      console.error('Error fetching home list:', error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      confirmAlert({
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this item?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              const response = await fetch(`http://localhost:3001/api/v1/home/homeDelete/${_id}`, {
                method: 'DELETE'
              });
              if (response.status === 200) {
                fetchHomeList(); 
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
          <h1 className="text-2xl font-bold text-gray-800">Home Content List</h1>
          <Link to={`/admin/HomeAdd`} className="mr-2 text-blue-500 hover:text-blue-700">
            <button className="px-5 py-2 text-white bg-blue-500 rounded hover:text-blue-500 hover:bg-slate-600">Add</button>
          </Link>
        </div>
        <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap custom-table-width">
          <thead className="bg-gray-900">
            <tr className="text-left text-white">
              <th className="px-6 py-4 text-lg font-semibold uppercase">Typing Title</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Status</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {listData.map(data => (
              <tr key={data._id} className="text-2xl text-left text-gray-600 hover:bg-teal-200">
                <td className="px-6 py-4">{data.input_typing.join(" ")}</td> 
                <td className={`px-6 py-4 ${data.status ? 'text-green-500' : 'text-red-500'}`}>
                  {data.status ? "Active" : "Inactive"}
                </td>
                <td className="flex items-center px-6 py-4 mt-10 space-x-4">
                  <Link to={`/admin/HomeView/${data._id}`} className="text-blue-500 hover:text-blue-700">
                    <FaRegEdit className="text-xl hover:text-blue-700" />
                  </Link>
                  <FaTrash onClick={() => handleDelete(data._id)} className="text-xl cursor-pointer hover:text-red-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default HomeList;
