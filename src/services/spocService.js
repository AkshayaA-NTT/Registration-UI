import api from "./api";

/**
 * @param {Object} params - { solution_type }
 */
export const getSpocs = async (params = {}) => {
  const response = await api.get("/api/v1/spocs", { params });
  return response;
};

/**
 * @param {string} spocId 
 * @param {Object} params - { start_date, end_date }
 */
export const getSpocAvailability = async (spocId, params) => {
  const response = await api.get(`/api/v1/spocs/${spocId}/availability`, {
    params,
  });
  return response;
};
