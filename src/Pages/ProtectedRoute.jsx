import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

export const ProtectedRoute = ({ children }) => {

    const { authenticated } = useAuth()
    if (!authenticated) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };