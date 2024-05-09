import React from 'react';
import Layout from '../../Layout';
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutList = () => {
  const list_data = [
    { _id: 1,
      img_url:"https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?cs=srgb&dl=pexels-soldiervip-1308881.jpg&fm=jpg",
      
      type: 'Type 1', slug: 'slug-1' },
    { _id: 2,
      img_url:"https://img.freepik.com/premium-photo/beautiful-colorful-valentine-day-heart-clouds-generative-ai_75891-2623.jpg",
      type: 'Type 2', slug: 'slug-3' },
  ];

  const handleDelete = (_id) => {
    alert(`Deleting item with ID: ${_id}`);
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
              <th className="px-6 py-4 text-lg font-semibold uppercase ">Image</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Type</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Slug</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {list_data.map(data => (
              <tr key={data._id} className="text-left text-gray-600 hover:bg-teal-200">

                <td className="px-6 py-4"><img src={data.img_url} className='h-40 w-50'/></td>
                <td className="px-6 py-4">{data.type}</td>
                <td className="px-6 py-4">{data.slug}</td>
                <td className="flex items-center px-6 py-4 mt-10">
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
