import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

const ProtectedRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <h6 className="text-center mt-5">Loading...</h6>; // styled for better UX
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
