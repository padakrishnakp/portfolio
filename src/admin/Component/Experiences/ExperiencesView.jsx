import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ExperiencesView = () => {
  const notifySuccess = () => toast.success("Experience Updated Successfully", { autoClose: 3000 });
  const notifyError = (message) => toast.error(message, { autoClose: 3000 })
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/experiences/experiencesDetails/${id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setCompanyName(data.data.company_name);
        setRoll(data.data.roll);
        setFromDate(data.data.joying_dated.split('T')[0]);
        setEndDate(data.data.last_dated.split('T')[0]);
      } catch (error) {
        console.log("Error:-", error);
      }
    };

    fetchData();

    return () => {
    };
  }, [id]); 

  const [companyName, setCompanyName] = useState('');
  const [roll, setRoll] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/experiences/experiencesUpdate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_name: companyName,
          roll: roll,
          joying_dated: fromDate,
          last_dated: endDate
        })
      });
  
      if (response.ok) {
        notifySuccess();
        await new Promise((resolve) => setTimeout(resolve, 3000)); 
        document.getElementById('experiences_id').click();
      } else {
        throw new Error('Failed to update experiences');
      }
    } catch (error) {
      console.error('Error updating experiences:', error);
    }
  };
  

  return (
    <Layout>
      <div className="px-2 py-2 overflow-x-auto">
        <div className="flex items-center justify-between mb-4"> 
          <h1 className="text-2xl font-bold text-gray-800">Add Experiences</h1>
        </div>
        <hr className="w-full h-5 border-purple-500 border-t-9" />
        <div>
          <label htmlFor="companyName" className="block mb-2 font-bold text-gray-700">Company Name</label>
          <textarea id="companyName" value={companyName} onChange={handleCompanyNameChange} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Your Company"></textarea>

          <label htmlFor="roll" className="block mb-2 font-bold text-gray-700">Roll</label>
          <textarea id="roll" value={roll} onChange={handleRollChange} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Roll"></textarea>

          <div className="flex mb-4">
            <div className="mr-4">
              <label htmlFor="fromDate" className="block mb-2 font-bold text-gray-700">From Date</label>
              <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} className="h-10 px-3 py-2 border rounded-lg w-60 focus:outline-none focus:border-blue-500" placeholder="Enter From Date" />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 font-bold text-gray-700">End Date</label>
              <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} className="h-10 px-3 py-2 border rounded-lg w-60 focus:outline-none focus:border-blue-500" placeholder="Enter End Date" />
            </div>
          </div>

          <hr className="w-full h-20 my-4 border-purple-500 border-t-9" />

          <div className="flex justify-center"> 
            <button onClick={handleSubmit} className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Submit</button>
            <Link to="/admin/experiencesList" id='experiences_id' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">Back</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default ExperiencesView;
