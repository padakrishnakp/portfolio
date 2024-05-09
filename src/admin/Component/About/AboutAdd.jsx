import React, { useState } from 'react';
import Layout from '../../Layout';
import { Link } from "react-router-dom";

const ProjectAdd = () => {
  const [companyName, setCompanyName] = useState('');
  const [roll, setRoll] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleRollChange = (e) => {
    setRoll(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Implement your submit logic here
    console.log('Company Name:', companyName);
    console.log('Roll:', roll);
    console.log('From Date:', fromDate);
    console.log('End Date:', endDate);
    console.log('Selected Image:', imagePreview); // You can upload this image to your server or process it as required
    document.getElementById('projectList').click();
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4"> 
          <h1 className="text-2xl font-bold text-gray-800">Add Project</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />
        <div>
          <label htmlFor="companyName" className="block mb-2 font-bold text-gray-700">Project Name</label>
          <textarea id="companyName" value={companyName} onChange={handleCompanyNameChange} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Project Name"></textarea>

          <label htmlFor="roll" className="block mb-2 font-bold text-gray-700">Project Description</label>
          <textarea id="roll" value={roll} onChange={handleRollChange} className="w-full px-3 py-2 mb-4 border rounded-lg h-400 focus:outline-none focus:border-blue-500" placeholder="Enter Project Description"></textarea>

          <label htmlFor="fromDate" className="block mb-2 font-bold text-gray-700">Project url</label>
          <textarea id="fromDate" value={fromDate} onChange={handleFromDateChange} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Project URL"></textarea>

          <label htmlFor="image" className="block mb-2 font-bold text-gray-700">Project Image</label>
          <input type="file" id="image" onChange={handleImageChange} className="mb-4" />
      
          {imagePreview && (
            <img src={imagePreview} alt="Uploaded Image" className="w-40 mb-4 h-50" />
          )}
      
          <hr className="w-full h-5 border-purple-500 border-t-9" />
      
          <div className="flex justify-center"> 
            <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
            <Link to="/admin/ProjectList" id='projectList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectAdd;
