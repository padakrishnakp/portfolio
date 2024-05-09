import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./ContactUs";
import Layout from "./Layout"; 
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

function App() {
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
          <Route path="/admin/experiencesLis" element={<ExperiencesList />} />
          <Route path="/admin/experiencesAdd" element={<ExperiencesAdd />} />
          <Route path="/admin/experiencesView/:id" element={<ExperiencesView />} />

          <Route path="/admin/ProjectAdd" element={<ProjectAdd />} />
          <Route path="/admin/ProjectList" element={<ProjectList />} />
          <Route path="/admin/ProjectView/:id" element={<ProjectView />} />

          <Route path="/admin/ContactUsList" element={<ContactUsList />} />
          <Route path="/admin/ContactUsView/:id" element={<ContactUsView />} />





        </Routes>
      </div>
    </Router>
  );
}

export default App;
