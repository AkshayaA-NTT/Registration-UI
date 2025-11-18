import api from "./api";

/**
 * Get list of SPOCs
 * Endpoint: GET /api/v1/spocs
 * @param {Object} params - { solution_type }
 */
export const getSpocs = async (params = {}) => {
  const response = await api.get("/api/v1/spocs", { params });
  return response;
};

/**
 * Get availability of a specific SPOC
 * Endpoint: GET /api/v1/spocs/{spoc_id}/availability
 * @param {string} spocId 
 * @param {Object} params - { start_date, end_date }
 */
export const getSpocAvailability = async (spocId, params) => {
  const response = await api.get(`/api/v1/spocs/${spocId}/availability`, {
    params,
  });
  return response;
};
