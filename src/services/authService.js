import api from "./api";

/**
 * Login with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{access_token, token_type}>}
 */
export const loginUser = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await api.post("/api/v1/auth/login", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

/**
 * Get current logged-in user (optional, if backend supports /me)
 */
export const getCurrentUser = async () => {
  const response = await api.get("/api/v1/auth/me");
  return response.data;
};
