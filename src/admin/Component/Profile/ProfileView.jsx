import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { RiFacebookCircleFill, RiInstagramFill } from "react-icons/ri";
import { FaPhoneSquareAlt } from "react-icons/fa";

export default function ProfileView() {
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userName, setUserName] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionUserData, setSessionUserData] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      const sessionData = JSON.parse(storedSession);
      setSessionUserData(sessionData.user_details);
    }
    UsersView();
  }, []);

  const UsersView = async () => {
    try {
      const storedSession = localStorage.getItem('session');
      if (storedSession) {
        const sessionData = JSON.parse(storedSession);
        const response = await fetch(`http://localhost:3001/api/v1/user/userView/${sessionData.user_details._id}`, {
          method: 'GET'
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.userDetails) {
            if (data.userDetails.profile_picture) {
              setProfileImage(data.userDetails.profile_picture);
              setImagePreview(data.userDetails.profile_picture);
            }
            if (data.userDetails.user_name) {
              setUserName(data.userDetails.user_name);
            }
            if (data.userDetails.email_id) {
              setEmail(data.userDetails.email_id);
            }
            if (data.userDetails.phone_number) {
              setPhone(data.userDetails.phone_number);
            }
            if (data.userDetails.facebook_link) {
              setFacebook(data.userDetails.facebook_link);
            }
            if (data.userDetails.instagram_link) {
              setInstagram(data.userDetails.instagram_link);
            }
          }
        } else {
          console.error('Failed to fetch user details');
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('user_name', userName);
      formData.append('email_id', email);
      formData.append('phone_number', phone);
      formData.append('facebook_link', facebook);
      formData.append('instagram_link', instagram);
      formData.append('about_file', profileImage);

      if (sessionUserData) {
        formData.append('sessionUserData', JSON.stringify(sessionUserData));
      }

      const response = await fetch("http://localhost:3001/api/v1/user/updated", {
        method: "POST",
        body: formData,
      });
      console.log("response:-",response)
      if (response) {
        console.log("+++++++++++++++++++++++++++++++++")
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">Edit Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="relative mb-4">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" readOnly
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {phone && (
              <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaPhoneSquareAlt />
                </span>
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            )}

            {facebook && (
              <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <RiFacebookCircleFill />
                </span>
                <input
                  type="text"
                  placeholder="Facebook Link"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
            )}

            {instagram && (
              <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <RiInstagramFill />
                </span>
                <input
                  type="text"
                  placeholder="Instagram Link"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
            )}

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

            {imagePreview && (
              <div className="mb-4">
                <img
                  src={imagePreview}
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
