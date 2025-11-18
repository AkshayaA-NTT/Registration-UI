import api from "../api";

export const authAPI = {
  login: (formData) =>
    api.post("/api/v1/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  getCurrentUser: () => api.get("/api/v1/auth/me"),
};
