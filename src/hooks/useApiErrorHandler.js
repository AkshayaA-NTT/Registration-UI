import { useToast } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";

export const useApiErrorHandler = () => {
  const toast = useToast();
  const { logout } = useAuth();

  const handleApiError = (error, customMessage = null) => {
  
    let title = "Something went wrong";
    let description = "An unexpected error occurred. Please try again.";

   
    if (error.response) {
      const { status, data } = error.response;

  
      if (status === 401) {
        title = "Session expired";
        description = "Please log in again.";
        logout();
      } else if (status === 403) {
        title = "Access denied";
        description = "You don't have permission to perform this action.";
      } else if (status === 404) {
        title = "Not found";
        description = "The requested resource could not be found.";
      } else if (status === 409) {
        title = "Conflict";
        description = data?.detail || "This resource already exists.";
      } else if (status >= 500) {
        title = "Server error";
        description = "Something went wrong on the server.";
      } else if (data?.detail) {
        // FastAPI often returns { "detail": "Message" }
        description = data.detail;
      }
    } else if (error.request) {
      
      title = "Network error";
      description =
        "Unable to reach the server. Please check your internet connection.";
    } else if (error.message) {
      description = error.message;
    }

    
    if (customMessage) description = customMessage;

    toast({
      title,
      description,
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top",
    });

    console.error("API Error:", error);

    return false;
  };

  return handleApiError;
};
