import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineMessage } from 'react-icons/ai'; // Import icons

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("http://localhost:3001/api/v1/contactUs/contactUsAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    setIsSubmitting(false);

    if (response.status === 200) {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <div className="items-center justify-center hidden w-1/2 md:flex">
          {/* Replace with your illustration */}
          <img src="https://via.placeholder.com/300" alt="Illustration" />
        </div>
        <div className="w-full p-8 md:w-1/2">
          <h2 className="mb-4 text-2xl font-bold">Contact us <span role="img" aria-label="contact">📞</span></h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label className="block mb-1 text-sm font-medium" htmlFor="name">Name (Field required)</label>
              <div className="flex items-center">
                <AiOutlineUser className="absolute text-gray-500" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Similar structure for other inputs */}
            {/* Email */}
            <div className="relative mb-4">
              <label className="block mb-1 text-sm font-medium" htmlFor="email">Email</label>
              <div className="flex items-center">
                <AiOutlineMail className="absolute text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Phone */}
            <div className="relative mb-4">
              <label className="block mb-1 text-sm font-medium" htmlFor="phone">Phone number (Field required)</label>
              <div className="flex items-center">
                <AiOutlinePhone className="absolute text-gray-500" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Message */}
            <div className="relative mb-4">
              <label className="block mb-1 text-sm font-medium" htmlFor="message">Message (Field required)</label>
              <div className="flex items-center">
                <AiOutlineMessage className="absolute text-gray-500" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              {isSubmitting ? "Sending..." : "Send message"} <span role="img" aria-label="arrow">➤</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
