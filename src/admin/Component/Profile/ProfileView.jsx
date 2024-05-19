import React, { useState } from "react";
import Layout from "../../Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faFileUpload, faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function ProfileView() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">Edit Your Profile</h2>
          <form>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Upload Profile</label>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faFileUpload} />
              </span>
              <input
                type="file"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleImageChange}
              />
            </div>
            {profileImage && (
              <div className="mb-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full p-3 text-white transition duration-200 bg-black rounded-lg hover:bg-gray-800"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
