import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    return children;
    // return token ? children : <Navigate to="/login" />; // children; // Replace with user login page if the personalized user dashboard is created
};

export default ProtectedRoute;