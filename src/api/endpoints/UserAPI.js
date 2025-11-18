import api from "../api";

export const userAPI = {
  createUser: (userData) => api.post("/api/v1/users", userData),
};
