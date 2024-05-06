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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
