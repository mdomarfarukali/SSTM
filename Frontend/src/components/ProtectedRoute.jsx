import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    return token ? children : children; //<Navigate to="/login" />; // Replace with user login page if the personalized user dashboard is created
};

export default ProtectedRoute;