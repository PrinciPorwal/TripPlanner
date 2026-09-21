import api from './api.js';

export const activityService = {
  // Get all activities for a trip
  getByTrip: (tripId) => api.get(`/trips/${tripId}/activities`),

  // Create new activity for a trip
  create: (tripId, activityData) => api.post(`/trips/${tripId}/activities`, activityData),

  // Update existing activity
  update: (id, activityData) => api.put(`/activities/${id}`, activityData),

  // Delete activity
  delete: (id) => api.delete(`/activities/${id}`),
};
