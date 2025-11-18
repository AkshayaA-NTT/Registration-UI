import { useToast } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";

/**
 * Custom hook to handle API errors consistently across the app.
 *
 * Usage:
 *   const handleApiError = useApiErrorHandler();
 *   try {
 *     const res = await apiCall();
 *   } catch (error) {
 *     handleApiError(error);
 *   }
 */
export const useApiErrorHandler = () => {
  const toast = useToast();
  const { logout } = useAuth();

  const handleApiError = (error, customMessage = null) => {
    // Default error message
    let title = "Something went wrong";
    let description = "An unexpected error occurred. Please try again.";

    // If the backend returns a structured response
    if (error.response) {
      const { status, data } = error.response;

      // Handle authentication issues
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
      // Network or CORS error
      title = "Network error";
      description =
        "Unable to reach the server. Please check your internet connection.";
    } else if (error.message) {
      description = error.message;
    }

    // Use custom override message if provided
    if (customMessage) description = customMessage;

    // Display toast message
    toast({
      title,
      description,
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top",
    });

    // Log for debugging (optional)
    console.error("API Error:", error);

    // Return false so you can handle conditional flow in the caller
    return false;
  };

  return handleApiError;
};
