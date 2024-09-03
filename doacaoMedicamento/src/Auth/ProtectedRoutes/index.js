import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const roles = localStorage.getItem("role");
    const token = localStorage.getItem("usr_token");

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
        }
    }, [token]);

    const hasPermission = requiredPermissions.every(permission =>
        roles?.includes(permission)
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!hasPermission) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
