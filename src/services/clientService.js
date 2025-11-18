import api from "./api";

/**
 * @param {Object} payload - client data
 */
export const createClient = async (payload) => {
  const response = await api.post("/api/v1/clients", payload);
  return response;
};
