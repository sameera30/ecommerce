import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

//added this with the help of AI
const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token'); 
    const location = useLocation(); 

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default PrivateRoute;
