import Expense from '../models/Expense.js';
import Trip from '../models/Trip.js';

// Create expense for a trip
export const createExpense = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { title, category, amount, date, notes } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (!title || !category || amount === undefined || !date) {
      return res.status(400).json({ error: 'Title, category, amount, and date are required' });
    }

    if (Number(amount) < 0) {
      return res.status(400).json({ error: 'Expense amount cannot be negative' });
    }

    const expense = await Expense.create({
      tripId,
      title,
      category,
      amount: Number(amount),
      date,
      notes: notes || '',
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all expenses for a trip, sorted by date descending
export const getExpensesByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const expenses = await Expense.find({ tripId }).sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const { title, category, amount, date, notes } = req.body;

    if (amount !== undefined && Number(amount) < 0) {
      return res.status(400).json({ error: 'Expense amount cannot be negative' });
    }

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(category && { category }),
        ...(amount !== undefined && { amount: Number(amount) }),
        ...(date && { date }),
        ...(notes !== undefined && { notes }),
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
