import React, {useState } from 'react';
import Layout from '../../Layout';
import { Link } from "react-router-dom";


const ExperiencesAdd = () => {
 
  const [companyName, setCompanyName] = useState('');
  const [roll, setRoll] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState(null);




  const handleSubmit = async() => {
    console.log('Company Name:', companyName);
    console.log('Roll:', roll);
    console.log('From Date:', fromDate);
    console.log('End Date:', endDate);


    const response = await fetch("http://localhost:3001/api/v1/experiences/experiencesAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        company_name: companyName,
        roll: roll,
        joying_dated:fromDate,
        last_dated:endDate,
        status: status
      })
    });
    console.log("response:-",response)
    if(response.status==200)
      {
     document.getElementById('experiencesList').click()
      }
      else {
        throw new Error('Failed to submit data');
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
          <textarea id="roll" value={companyName} onChange={(e) => setCompanyName(e.target.value)}  className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Your Company"></textarea>

        
          <label htmlFor="roll" className="block mb-2 font-bold text-gray-700">Roll</label>
          <textarea id="roll" value={roll} onChange={(e)=>setRoll(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg h-100 focus:outline-none focus:border-blue-500" placeholder="Enter Roll"></textarea>
          
        
          <div className="flex mb-4">
            <div className="mr-4">
              <label htmlFor="fromDate" className="block mb-2 font-bold text-gray-700">From Date</label>
              <input type="date" id="fromDate" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} className="h-10 px-3 py-2 border rounded-lg w-60 focus:outline-none focus:border-blue-500" placeholder="Enter From Date" />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 font-bold text-gray-700">End Date</label>
              <input type="date" id="endDate" value={endDate} onChange={(e)=>setEndDate(e.target.value)} className="h-10 px-3 py-2 border rounded-lg w-60 focus:outline-none focus:border-blue-500" placeholder="Enter End Date" />
            </div>
          </div>

          <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Select Status</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        
          <hr className="w-full h-20 my-4 border-purple-500 border-t-9" />
        
          <div className="flex justify-center"> 

          <button onClick={handleSubmit} className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 border-b-4 border-blue-700 rounded hover:bg-blue-400 hover:border-blue-500">
          Submit
        </button>
        <Link to="/admin/experiencesList" id='experiencesList' className="px-4 py-2 text-sm text-gray-700 bg-blue-300 rounded hover:bg-gray-400">
          Back
        </Link>

          </div>
        </div>
      </div>
    </Layout>
  );
  
}
export default ExperiencesAdd;
