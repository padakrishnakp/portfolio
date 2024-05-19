import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPageComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Agreed to Terms:", agreed);

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email_id: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('session', JSON.stringify(data));
        console.log('Login successful:', data);
        window.location.href = '/admin';
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url('https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2016/08/maldives.jpg?ssl=1')" }}>
      <ToastContainer />
      <div className="w-full max-w-sm p-8 bg-white border border-gray-300 rounded-lg shadow-lg bg-opacity-10 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-bold text-center text-orange-300">LOGIN</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label className="block mb-1 text-sm font-semibold text-cyan-300" htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 pl-10 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <AiOutlineMail className="absolute text-gray-400 top-10 left-3" />
          </div>
          <div className="relative">
            <label className="block mb-1 text-sm font-semibold text-cyan-300" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 pl-10 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <AiOutlineLock className="absolute text-gray-400 top-10 left-3" />
          </div>
          <div className="flex items-center">            
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPageComponent;
