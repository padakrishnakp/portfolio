import React, { useState } from 'react';
import Layout from '../../Layout';
import { Link } from 'react-router-dom';

const AboutView = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    // Create a preview URL for the file
    const fileURL = URL.createObjectURL(file);
    setPreviewURL(fileURL);
  };

  const handleFileTypeChange = (e) => {
    const selectedFileType = e.target.value;
    setFileType(selectedFileType);
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    console.log("Description:", description);
    console.log("File:", file);
    console.log("FileType:", fileType);
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4"> 
          <h1 className="text-2xl font-bold text-gray-800">About View</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />

        <div>
          <label htmlFor="description" className="block mb-2 font-bold text-gray-700">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />

          <label htmlFor="fileType" className="block mt-4 mb-2 font-bold text-gray-700 w-36">Select File Type:</label>
          <select id="fileType" onChange={handleFileTypeChange} className="border rounded-lg focus:outline-none w-36 focus:border-blue-500">
            <option value="video" className='items-center'>Type</option>
            <option value="video" className='items-center'>Video</option>
            <option value="image" className='items-center'>Image</option>
          </select>

          {fileType === 'video' ? (
            <>
              <input type="file" id="file" accept="video/*" onChange={handleFileChange} className="mt-4 border rounded-lg focus:outline-none focus:border-blue-500" />
              {previewURL && <video src={previewURL} controls className="w-40 h-40 mt-4" />}
            </>
          ) : fileType === 'image' ? (
            <>
              <input type="file" id="file" accept="image/*" onChange={handleFileChange} className="mt-4 border rounded-lg focus:outline-none focus:border-blue-500" />
              {previewURL && <img src={previewURL} alt="Uploaded" className="w-40 h-40 mt-4" />}
            </>
          ) : null}

          <hr className="w-full h-5 border-purple-500 border-t-9" />

          <div className="flex justify-center"> {/* Centered button container */}
            <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
            <Link to="/admin/AboutList" className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutView;
