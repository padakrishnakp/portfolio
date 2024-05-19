import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const storedSession = localStorage.getItem('session');
  
  return storedSession ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
