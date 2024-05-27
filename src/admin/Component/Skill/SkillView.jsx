import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SkillView = () => {
  const notifySuccess = () => toast.success("Home content updated successfully", {
    autoClose: 3000
  });
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState([{ id: uuidv4(), value: '' }]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    skillView();
  }, []);

  const skillView = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/skill/skillView/${id}`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success) {
        setTitle(data.skill_view[0].title);
        setSkills(data.skill_view[0].skills.map(skill => ({ id: uuidv4(), value: skill })));
        setStatus(data.skill_view[0].status ? "true" : "false");
      } else {
        console.error('Failed to fetch skill data');
        toast.error('Failed to fetch skill data');
      }
    } catch (error) {
      console.error('Error fetching skill data:', error);
      toast.error('Error fetching skill data');
    }
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
    let all_skills = skills.map(skill => skill.value.trim()).filter(skill => skill !== '');


    try {
      const response = await fetch(`http://localhost:3001/api/v1/skill/skillUpdated/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          skills: all_skills,
          status: status === "true"
        })
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok && result.success) {
        notifySuccess();
        setTimeout(() => {
          document.getElementById("skillList").click();
        }, 3000); // Set the timeout to match the toast autoClose time
      } else {
        toast.error(result.message || "Failed to update skills");
      }
    } catch (error) {
      console.error("Error updating skills:", error);
      toast.error("An error occurred while updating skills");
    }
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Update Skills</h1>
        </div>

        <div>
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700">Title:</label>
          <textarea
            id="title"
            className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            aria-label="Title"
          />

          {skills.map(skill => (
            <div key={skill.id} className="flex mb-4">
              <input
                type="text"
                value={skill.value}
                onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                className="h-10 px-3 py-2 border rounded-lg w-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter skill"
                aria-label={`Skill ${skill.id}`}
              />
              <button onClick={() => handleRemoveSkill(skill.id)} className="px-3 py-2 ml-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-600" aria-label="Remove skill">
                <RiCloseFill />
              </button>
            </div>
          ))}

          <div className="flex justify-between">
            <button onClick={handleAddSkill} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600" aria-label="Add skill">
              <RiAddFill className="mr-1" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500" aria-label="Status">
            <option value="">Select Status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div className="flex justify-center pt-4 mt-6 border-t-2 border-gray-200">
          <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600" aria-label="Submit">Submit</button>
          <Link to="/admin/SkillList" id='skillList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400" aria-label="Back">Back</Link>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default SkillView;
