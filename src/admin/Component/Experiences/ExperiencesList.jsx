import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import Layout from '../../Layout';

const ExperiencesList = () => {
  const list_data = [
    {
      _id: 1,
      from_date: "2003",
      to_dated: "2004",
      company_name: "XYZ Company name",
      roll: "Backend Developer",
      Status: false,
    },
    {
      _id: 2,
      from_date: "2003",
      to_dated: "2004",
      company_name: "ABC Company name",
      roll: "Developer",
      Status: false,
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
            {list_data.map(data => (
              <tr key={data._id} className="text-2xl text-left text-gray-600 hover:bg-teal-200">
                <td className="px-6 py-4">{data.from_date}-{data.to_dated}</td>
                <td className="px-6 py-4">{data.company_name}</td>
                <td className="px-6 py-4">{data.roll}</td>
                <td className="px-6 py-4">{data.Status ? "Active" : "Inactive"}</td>
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
