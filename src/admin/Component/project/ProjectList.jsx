import React from 'react';
import Layout from '../../Layout';
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrash } from 'react-icons/fa';

const ProjectList = () => {
  const list_data = [
    {
      _id: 1,
      project_name: "Project Name",
      project_description: "Project Description",
      url: "www.one.com",
      img_url: "https://media.licdn.com/dms/image/D5603AQGI6VRjDKrikQ/profile-displayphoto-shrink_200_200/0/1673045224042?e=2147483647&v=beta&t=hhdooFLTnSpuYZIMtXD9EJlLgXsU7p-dH5ZmRq9hQzY",
      Status: false,
    },
    {
      _id: 2,
      project_name: "Project Name two",
      project_description: "Project Description two",
      url: "www.two.com",
      img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8jF8bBGJAHYigWK1PECG7eAxOkR9D19mQw80JbhzE4A&s",
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
          <h1 className="text-2xl font-bold text-gray-800">Project List</h1>
          <Link to={`/admin/ProjectAdd`} className="mr-2 text-blue-500 hover:text-blue-700">
          <button className="px-5 py-2 text-white bg-blue-500 rounded hover:text-blue-500 hover:bg-slate-600">Add</button>
        </Link>
        </div>
        <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap custom-table-width">
          <thead className="bg-gray-900">
            <tr className="text-left text-white">
              <th className="px-6 py-4 text-lg font-semibold uppercase">Project Name</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Image</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">url</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Status</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {list_data.map(data => (
              <tr key={data._id} className="text-2xl text-left text-gray-600 hover:bg-teal-200">
                <td className="px-6 py-4">{data.project_name}</td>
                <td className="px-6 py-4"><img src={data.img_url} className="h-40 w-50" alt="Project Image" /></td>
                <td className="px-6 py-4">{data.url}</td>
                <td className="px-6 py-4">{data.Status ? "Active" : "Inactive"}</td>
                <td className="flex items-center px-6 py-4 mt-10">
                  <Link to={`/admin/ProjectView/${data._id}`} className="text-blue-500 hover:text-blue-700">
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
}

export default ProjectList;
