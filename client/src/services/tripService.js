import api from './api.js';

export const tripService = {
  // Get all trips
  getAll: () => api.get('/trips'),

  // Get trip by ID
  getById: (id) => api.get(`/trips/${id}`),

  // Create new trip
  create: (tripData) => api.post('/trips', tripData),

  // Update trip
  update: (id, tripData) => api.put(`/trips/${id}`, tripData),

  // Delete trip (cascades activities and expenses)
  delete: (id) => api.delete(`/trips/${id}`),

  // Reseed database endpoint
  reseed: () => api.post('/seed'),
};
