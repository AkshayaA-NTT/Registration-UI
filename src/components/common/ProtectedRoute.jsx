import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "@chakra-ui/react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const toast = useToast();

  if (!isAuthenticated) {
    toast.closeAll();
    toast({
      title: "Access denied",
      description: "Please log in to continue.",
      status: "warning",
      duration: 2500,
      isClosable: true,
      position: "top",
    });

    // Redirect user to login page, preserving the page they tried to access
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected page
  return children;
}
