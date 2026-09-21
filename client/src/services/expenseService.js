import api from './api.js';

export const expenseService = {
  // Get all expenses for a trip
  getByTrip: (tripId) => api.get(`/trips/${tripId}/expenses`),

  // Create new expense for a trip
  create: (tripId, expenseData) => api.post(`/trips/${tripId}/expenses`, expenseData),

  // Update existing expense
  update: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),

  // Delete expense
  delete: (id) => api.delete(`/expenses/${id}`),
};
