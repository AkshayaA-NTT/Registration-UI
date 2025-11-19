import api from "./api";

/**
 * Get SPOCs filtered by solution_type.
 * Accepts an object: { solution_type: "cloud infrastructure" }
 */
export const getSpocs = async (params = {}) => {
  return await api.get("/api/v1/spocs", { params });
};

/**
 * Fetch availability for a specific SPOC.
 */
export const getSpocAvailability = async (spocId, params = {}) => {
  return await api.get(`/api/v1/spocs/${spocId}/availability`, { params });
};