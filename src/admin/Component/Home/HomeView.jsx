import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeView = () => {
  const notifySuccess = () => toast.success("Home content updated successfully", {
    autoClose: 3000
  });

  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [homeDetails, setHomeDetails] = useState({});
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchHomeDetails();
  }, []);

  const fetchHomeDetails = async () => {
    console.log('Current URL ID:', id);
    try {
      const response = await fetch(`http://localhost:3001/api/v1/home/homeDetails/${id}`, {
        method: 'GET'
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setHomeDetails(responseData.data);
      setTitle(responseData.data.description);
      setSkills(responseData.data.input_typing.map(skill => ({ id: uuidv4(), value: skill })));
      setStatus(responseData.data.status);
    } catch (error) {
      console.error("Error fetching home details:", error);
    }
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddSkill = () => {
    setSkills([...skills, { id: uuidv4(), value: '' }]);
  };

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleSkillChange = (id, value) => {
    const updatedSkills = skills.map(skill => {
      if (skill.id === id) {
        return { ...skill, value };
      }
      return skill;
    });
    setSkills(updatedSkills);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/home/homeUpdated/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: title,
          input_typing: skills.map(skill => skill.value),
          status: status,
        }),
      });

      if (response.ok) {
        notifySuccess();
        setTimeout(() => {
          document.getElementById('homeList').click();
        }, 2000);
      } else {
        throw new Error("Failed to update home content");
      }
    } catch (error) {
      console.error("Error updating home content:", error);
    }
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Home Content View</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />
        <div>
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700">Description</label>
          <textarea
            id="description"
            className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter description"
            value={title}
            onChange={handleTitleChange}
          />

          {skills.map(skill => (
            <div key={skill.id} className="flex mb-4">
              <label htmlFor="title" className="block mb-2 font-bold text-gray-700">Input Typing</label>
              <input
                type="text"
                value={skill.value}
                onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                className="h-10 px-3 py-2 border rounded-lg w-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter skill"
              />
              <button onClick={() => handleRemoveSkill(skill.id)} className="px-3 py-2 ml-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-600">
                <RiCloseFill />
              </button>
            </div>
          ))}

          <div className="flex justify-between">
            <button onClick={handleAddSkill} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
              <RiAddFill className="mr-1" />
            </button>
          </div>
        </div>

        <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Status</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>

        <hr className="w-full h-5 border-purple-500 border-t-9" />

        <div className="flex justify-center">
          <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
          <Link to="/admin/HomeList" id='homeList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default HomeView;
