import Trip from '../models/Trip.js';
import Activity from '../models/Activity.js';
import Expense from '../models/Expense.js';

// Create a new trip
export const createTrip = async (req, res) => {
  try {
    const { title, startDate, endDate, travelers, currency, budget, destinations } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ error: 'Title, start date, and end date are required' });
    }

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ error: 'End date cannot be before start date' });
    }

    if (budget < 0) {
      return res.status(400).json({ error: 'Budget cannot be negative' });
    }

    const trip = await Trip.create({
      title,
      startDate,
      endDate,
      travelers: travelers ? Number(travelers) : 1,
      currency: currency || 'USD',
      budget: budget !== undefined ? Number(budget) : 0,
      destinations: Array.isArray(destinations) ? destinations : [],
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get trip by ID
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update trip
export const updateTrip = async (req, res) => {
  try {
    const { title, startDate, endDate, travelers, currency, budget, destinations } = req.body;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ error: 'End date cannot be before start date' });
    }

    if (budget !== undefined && Number(budget) < 0) {
      return res.status(400).json({ error: 'Budget cannot be negative' });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(travelers !== undefined && { travelers: Number(travelers) }),
        ...(currency && { currency }),
        ...(budget !== undefined && { budget: Number(budget) }),
        ...(destinations && { destinations: Array.isArray(destinations) ? destinations : [] }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete trip with CASCADE deletion of activities and expenses
export const deleteTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Cascade delete related activities and expenses
    await Promise.all([
      Trip.findByIdAndDelete(tripId),
      Activity.deleteMany({ tripId }),
      Expense.deleteMany({ tripId }),
    ]);

    res.json({ message: 'Trip and associated activities/expenses deleted successfully', id: tripId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
