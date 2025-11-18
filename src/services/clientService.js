import api from "./api";

/**
 * Create or update client/deal info
 * Endpoint: POST /api/v1/clients
 * @param {Object} payload - client data
 */
export const createClient = async (payload) => {
  const response = await api.post("/api/v1/clients", payload);
  return response;
};
