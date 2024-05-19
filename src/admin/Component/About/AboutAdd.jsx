import React, { useState } from 'react';
import Layout from '../../Layout';
import { Link } from "react-router-dom";

const AboutAdd = () => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    setType(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('status', status);
      formData.append('type', type);
      formData.append('about_file', file);

      const response = await fetch("http://localhost:3001/api/v1/about/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        document.getElementById('aboutList').click();
      } else {
        throw new Error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4"> 
          <h1 className="text-2xl font-bold text-gray-800">Add About</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />
        <div>
          <label htmlFor="description" className="block mb-2 font-bold text-gray-700">About Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter About Description"></textarea>

          <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select Status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <label htmlFor="type" className="block mb-2 font-bold text-gray-700">Type</label>
          <select id="type" value={type} onChange={handleChange} className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select Type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          <label htmlFor="file" className="block mb-2 font-bold text-gray-700">{type === 'image' ? 'Image' : 'Video'}</label>
          <input type="file" id="file" onChange={handleFileChange} className="mb-4" />
      
          {filePreview && (
            <img src={filePreview} alt="Uploaded File" className="w-40 mb-4 h-50" />
          )}

          <hr className="w-full h-5 border-purple-500 border-t-9" />
      
          <div className="flex justify-center"> 
            <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
            <Link to="/admin/AboutList" id='aboutList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutAdd;
