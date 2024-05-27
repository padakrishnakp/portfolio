import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AboutView = () => {
  const [aboutData, setAboutDetails] = useState(null);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchAboutDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/about/view/${id}`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setAboutDetails(responseData.data);
        setDescription(responseData.data.description);
        setStatus(responseData.data.status.toString());
        setFilePreview(responseData.data.about_video_path);
        setFileName(responseData.data.about_video_path.split('/').pop()); // Extract the video name from the URL
      } catch (e) {
        console.error("Error:", e);
      }
    };

    fetchAboutDetails();
  }, [id]);

  const notifySuccess = () => toast.success("About Updated successfully", { autoClose: 3000 });
  const notifyError = (message) => toast.error(message, { autoClose: 3000 });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setFilePreview(fileURL);
      setFileName(selectedFile.name); // Set the file name to be displayed
    }
  };

  const handleSubmit = async () => {
    if (!description || !status) {
      notifyError('All fields are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('status', status);
      if (file) {
        formData.append('about_media', file);
      }

      const response = await fetch(`http://localhost:3001/api/v1/about/updated/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setFilePreview(responseData.data.about_video_path);  // Update with the new video path
        setFileName(responseData.data.about_video_path.split('/').pop()); // Update with the new video name
        setFile(null); // Clear the file state to reflect the new video being the current one
        notifySuccess();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        document.getElementById('aboutList').click();
      } else {
        const data = await response.json();
        notifyError(data.error || 'Error submitting data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      notifyError('Error submitting data');
    }
  };

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Updated About</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />
        <div>
          <label htmlFor="description" className="block mb-2 font-bold text-gray-700">About Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500"
            placeholder="Enter About Description"
          ></textarea>

          <label htmlFor="file" className="block mb-2 font-bold text-gray-700">About Video</label>
          <input type="file" id="file" onChange={handleFileChange} className="mb-4" />

          {filePreview && (
            <div className="mb-4">
              <video controls className="w-full h-auto">
                <source src={filePreview} type="video/mp4" />
              </video>
              <p className="mt-2">File name: {fileName}</p>
            </div>
          )}

          <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <hr className="w-full h-5 border-purple-500 border-t-9" />

          <div className="flex justify-center">
            <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
            <Link to="/admin/AboutList" id='aboutList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default AboutView;
