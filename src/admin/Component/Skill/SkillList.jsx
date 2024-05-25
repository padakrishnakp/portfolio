import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SkillList = () => {
  const [skill_list, setSkills] = useState([]);

  useEffect(() => {
    fetchAboutList();
  }, []);


  const handleDelete = async (_id) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this item?');
      if (confirmed) {
        const response = await fetch(`http://localhost:3001/api/v1/skill/skillDelete/${_id}`, {
          method: 'DELETE'
        });
        if (response.status === 200) {
          window.location.href = '/admin/SkillList';
          } else {
          throw new Error('Failed to delete item');
        }
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const fetchAboutList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/skill/skillList');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSkills(data.skill_list);
    } catch (error) {
      console.error('Error fetching about list:', error);
    }
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Skill List</h1>
          <Link to={`/admin/SkillAdd`} className="mr-2 text-blue-500 hover:text-blue-700">
            <button className="px-5 py-2 text-white bg-blue-500 rounded hover:text-blue-500 hover:bg-slate-600">Add</button>
          </Link>
        </div>
        <table className="w-full mx-auto overflow-hidden bg-white divide-y divide-gray-300 rounded-lg whitespace-nowrap custom-table-width">
          <thead className="bg-gray-900">
            <tr className="text-left text-white">
              <th className="px-6 py-4 text-lg font-semibold uppercase">Title</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Skills</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Status</th>
              <th className="px-6 py-4 text-lg font-semibold uppercase">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {skill_list.map(data => (
              <tr key={data._id} className="text-2xl text-left text-gray-600 hover:bg-teal-200">
                <td className="px-6 py-4">{data.title}</td>
                <td className="px-6 py-4">{data.skills.join(', ')}</td>
                <td className="px-6 py-4">{data.status ? "Active" : "Inactive"}</td>
                <td className="flex items-center px-6 py-4 mt-10">
                  <Link to={`/admin/SkillView/${data._id}`} className="text-blue-500 hover:text-blue-700">
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

export default SkillList;
