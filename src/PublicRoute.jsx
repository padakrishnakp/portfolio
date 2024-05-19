import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const storedSession = localStorage.getItem('session');
  
  return storedSession ? <Navigate to="/admin" /> : children;
};

export default PublicRoute;
