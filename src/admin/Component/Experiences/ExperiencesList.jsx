import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import Layout from '../../Layout';

const ExperiencesList = () => {
  const [list_data, setList_data] = useState(null);

  useEffect(() => {
    fetchAboutList();
  }, []);

  const fetchAboutList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/experiences/experiencesList');
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
        const response = await fetch(`http://localhost:3001/api/v1/experiences/experiencesDelete/${_id}`, {
          method: 'DELETE'
        });
        if (response.status === 200) {
          window.location.href = '/admin/experiencesList';
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
          <h1 className="text-2xl font-bold text-gray-800">Experiences List</h1>
          <Link to={`/admin/experiencesAdd`} className="mr-2 text-blue-500 hover:text-blue-700">
            <button className="px-5 py-2 text-white bg-blue-500 rounded hover:text-blue-500 hover:bg-slate-600">Add</button>
          </Link>
        </div>
        <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap custom-table-width">
          <thead className="bg-gray-900">
            <tr className="text-left text-white">
              <th className="px-6 py-4 text-lg font-semibold uppercase">Years</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Company Name</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Roll</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Status</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {list_data &&
              list_data.map(data => (
                <tr key={data._id} className="text-2xl text-left text-gray-600 hover:bg-teal-200">
                  <td className="px-6 py-4">{data.joying_dated}-{data.last_dated}</td>
                  <td className="px-6 py-4">{data.company_name || 'N/A'}</td>
                  <td className="px-6 py-4">{data.roll || 'N/A'}</td>
                  <td className="px-6 py-4">{data.status ? "Active" : "Inactive"}</td>
                  <td className="flex items-center px-6 py-4 mt-10">
                    <Link to={`/admin/experiencesView/${data._id}`} className="text-blue-500 hover:text-blue-700">
                      <FaRegEdit className="text-xl hover:text-blue-700" />
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
};

export default ExperiencesList;
