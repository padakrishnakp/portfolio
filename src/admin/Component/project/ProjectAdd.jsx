import React, { useState } from 'react';
import Layout from '../../Layout';
import { Link } from "react-router-dom";
import { RiAddFill, RiCloseFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProjectAdd = () => {
  const [project_name, setProject_name] = useState('');
  const [project_description, setProject_description] = useState('');
  const [project_url, setProject_url] = useState('');
  const [project_image, setProject_image] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Added imagePreview state
  const [status, setStatus] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProject_image(file);
        setImagePreview(reader.result); // Set image preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const notify = () => toast.success("Project added successfully", {
    autoClose: 3000 
  });  

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('project_name', project_name);
    formData.append('project_description', project_description);
    formData.append('project_url', project_url);
    formData.append('about_file', project_image);
    formData.append('status', status);

    try {
      const response = await fetch("http://localhost:3001/api/v1/project/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        notify(); 
        console.log("Project added successfully");
        setTimeout(() => {
          document.getElementById('projectList').click();
        }, 3000);        
      } else {
        console.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error occurred while adding project:", error);
    }
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4"> 
          <h1 className="text-2xl font-bold text-gray-800">View Project</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />
        <div>
          <label htmlFor="project_name" className="block mb-2 font-bold text-gray-700">Project Name</label>
          <textarea id="project_name" value={project_name} onChange={(e) => setProject_name(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Project Name"></textarea>

          <label htmlFor="project_description" className="block mb-2 font-bold text-gray-700">Project Description</label>
          <textarea id="project_description" value={project_description} onChange={(e) => setProject_description(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg h-400 focus:outline-none focus:border-blue-500" placeholder="Enter Project Description"></textarea>

          <label htmlFor="project_url" className="block mb-2 font-bold text-gray-700">Project URL</label>
          <textarea id="project_url" value={project_url} onChange={(e) => setProject_url(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Project URL"></textarea>

          <label htmlFor="project_image" className="block mb-2 font-bold text-gray-700">Project Image</label>
          <input type="file" id="project_image" onChange={handleImageChange} className="mb-4" />
      
          {imagePreview && (
            <img src={imagePreview} alt="Uploaded Image" className="w-40 mb-4 h-50" />
          )}
          
          <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select Status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
      
          <hr className="w-full h-20 my-4 border-purple-500 border-t-9" />
         
          <div className="flex justify-center"> 
            <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
            <ToastContainer />
            <Link to="/admin/ProjectList" id='projectList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectAdd;
