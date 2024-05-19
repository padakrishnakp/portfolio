import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';
import Home from './pages/Home';
import ContactUs from './ContactUs';
import Login from './admin/Login';
import Admin from './admin/Admin';
import AboutList from './admin/Component/About/AboutList';
import AboutView from './admin/Component/About/AboutView';
import AboutAdd from './admin/Component/About/AboutAdd';
import SkillList from './admin/Component/Skill/SkillList';
import SkillAdd from './admin/Component/Skill/SkillAdd';
import SkillView from './admin/Component/Skill/SkillView';
import ProjectAdd from './admin/Component/project/ProjectAdd';
import ProjectList from './admin/Component/project/ProjectList';
import ProjectView from './admin/Component/project/ProjectView';
import ExperiencesList from './admin/Component/Experiences/ExperiencesList';
import ExperiencesAdd from './admin/Component/Experiences/ExperiencesAdd';
import ExperiencesView from './admin/Component/Experiences/ExperiencesView';
import ContactUsList from './admin/Component/ContactUs/ContactUsList';
import ContactUsView from './admin/Component/ContactUs/ContactUsView';
import ProfileView from './admin/Component/Profile/ProfileView';
import HomeList from './admin/Component/Home/HomeList';
import HomeAdd from './admin/Component/Home/HomeAdd';
import HomeView from './admin/Component/Home/HomeView';



function App() {
  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    console.log("storedSession:-",storedSession)
    async function fetchIPAddress() {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;
        console.log('Client IP Address:', ipAddress);
        const locationResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
        const locationData = locationResponse.data;
        console.log('Location Information:', locationData);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    }

    fetchIPAddress();
  }, []);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/AboutList" element={<AboutList />} />
          <Route path="/admin/AboutView/:id" element={<AboutView />} />
          <Route path="/admin/AboutAdd" element={<AboutAdd />} />
          <Route path="/admin/SkillList" element={<SkillList />} />
          <Route path="/admin/SkillAdd" element={<SkillAdd />} />
          <Route path="/admin/SkillView/:id" element={<SkillView />} />
          <Route path="/admin/experiencesList" element={<ExperiencesList />} />
          <Route path="/admin/experiencesAdd" element={<ExperiencesAdd />} />
          <Route path="/admin/experiencesView/:id" element={<ExperiencesView />} />
          <Route path="/admin/ProjectAdd" element={<ProjectAdd />} />
          <Route path="/admin/ProjectList" element={<ProjectList />} />
          <Route path="/admin/ProjectView/:id" element={<ProjectView />} />
          <Route path="/admin/ContactUsList" element={<ContactUsList />} />
          <Route path="/admin/ContactUsView/:id" element={<ContactUsView />} />
          <Route path="/admin/HomeList" element={<HomeList />} />
          <Route path="/admin/HomeAdd" element={<HomeAdd />} />
          <Route path="/admin/HomeView/:id" element={<HomeView />} />
          <Route path="/admin/ProfileView" element={<ProfileView />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
