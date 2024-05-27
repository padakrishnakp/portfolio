import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Layout';
import { v4 as uuidv4 } from 'uuid';
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SkillAdd = () => {
  const notifySuccess = () => toast.success("Skill Added Successfully", { autoClose: 3000 });
  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  const storedSession = localStorage.getItem('session');
  const sessionData = JSON.parse(storedSession);
  const userId = sessionData.userDetails?._id;

  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState([{ id: uuidv4(), value: '' }]);

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
    let all_skills = [];
    skills.forEach(skill => {
      if(skill.value.trim() !== '') {
        all_skills.push(skill.value);
      }
    });

    if (!title || !status || all_skills.length === 0) {
      notifyError('All fields are required and skills cannot be empty.');
      return;
    }

    const response = await fetch("http://localhost:3001/api/v1/skill/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        skills: all_skills,
        status: status,
        userId:userId
      })
    });

    if (response.ok) {
      notifySuccess();
      await new Promise((resolve) => setTimeout(resolve, 3000)); 
      document.getElementById('skillList').click();
    } else {
      notifyError('Failed to add skill. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Add Skills</h1>
        </div>
        <hr className="w-full my-4 border-t-2 border-purple-500" />
        <div>
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700">Title:</label>
          <textarea
            id="title"
            className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />

          {skills.map(skill => (
            <div key={skill.id} className="flex mb-4">
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
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500">
          <option value="">Select Status</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <hr className="w-full my-4 border-t-2 border-purple-500" />

        <div className="flex justify-center pt-4 mt-6 border-t-2 border-gray-200"> {/* Added border container */}
          <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
          <Link to="/admin/SkillList" id='skillList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default SkillAdd;
