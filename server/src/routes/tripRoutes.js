import express from 'express';
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from '../controllers/tripController.js';
import {
  createActivity,
  getActivitiesByTrip,
} from '../controllers/activityController.js';
import {
  createExpense,
  getExpensesByTrip,
} from '../controllers/expenseController.js';

const router = express.Router();

// Trip CRUD
router.post('/', createTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

// Nested Trip Activities
router.post('/:tripId/activities', createActivity);
router.get('/:tripId/activities', getActivitiesByTrip);

// Nested Trip Expenses
router.post('/:tripId/expenses', createExpense);
router.get('/:tripId/expenses', getExpensesByTrip);

export default router;
