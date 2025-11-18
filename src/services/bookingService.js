import api from "./api";

/**
 * Create a new booking
 * Endpoint: POST /api/v1/bookings
 * @param {Object} payload - { client_id, spoc_id, slot_id, meeting_type }
 */
export const createBooking = async (payload) => {
  const response = await api.post("/api/v1/bookings", payload);
  return response;
};

/**
 * Get booking details
 * Endpoint: GET /api/v1/bookings/{booking_id}
 */
export const getBookingDetails = async (bookingId) => {
  const response = await api.get(`/api/v1/bookings/${bookingId}`);
  return response;
};

/**
 * Cancel booking
 * Endpoint: POST /api/v1/bookings/{booking_id}/cancel
 */
export const cancelBooking = async (bookingId) => {
  const response = await api.post(`/api/v1/bookings/${bookingId}/cancel`);
  return response;
};

/**
 * Get list of bookings (optionally filtered)
 * Endpoint: GET /api/v1/bookings
 * @param {Object} params - optional filters { status, spoc_id }
 */
export const listBookings = async (params = {}) => {
  const response = await api.get("/api/v1/bookings", { params });
  return response;
};
