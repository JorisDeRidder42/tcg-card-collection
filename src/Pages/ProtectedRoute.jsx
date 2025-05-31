import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

export const ProtectedRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    // You can return a spinner or null here while checking auth status
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
