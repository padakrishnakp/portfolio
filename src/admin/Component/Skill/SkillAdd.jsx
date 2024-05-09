import React, { useState } from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { RiAddFill, RiCloseFill } from "react-icons/ri";

const SkillAdd = () => {
  const [title, setTitle] = useState("");
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

  const handleSubmit = () => {
    document.getElementById("skillList").click()
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4"> 
          <h1 className="text-2xl font-bold text-gray-800">Add Skills</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />
        <div>
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700">Title:</label>
          <textarea
          id="description"
          className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter description"
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
        <hr className="w-full h-5 border-purple-500 border-t-9" />


            <div className="flex justify-center"> 
              <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
              <Link to="/admin/SkillList" id='skillList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
              </div>

      </div>

    </Layout>
  );
};

export default SkillAdd;
