import Activity from '../models/Activity.js';
import Trip from '../models/Trip.js';

// Create activity for a trip
export const createActivity = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { title, type, date, startTime, endTime, location, cost, notes } = req.body;

    // Verify trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (!title || !date) {
      return res.status(400).json({ error: 'Title and date are required' });
    }

    if (startTime && endTime && endTime < startTime) {
      return res.status(400).json({ error: 'End time cannot be earlier than start time' });
    }

    if (cost !== undefined && Number(cost) < 0) {
      return res.status(400).json({ error: 'Cost cannot be negative' });
    }

    const activity = await Activity.create({
      tripId,
      title,
      type: type || 'Other',
      date,
      startTime: startTime || '',
      endTime: endTime || '',
      location: location || '',
      cost: cost !== undefined ? Number(cost) : 0,
      notes: notes || '',
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all activities for a trip, sorted chronologically by date and startTime
export const getActivitiesByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const activities = await Activity.find({ tripId }).sort({ date: 1, startTime: 1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update activity
export const updateActivity = async (req, res) => {
  try {
    const { title, type, date, startTime, endTime, location, cost, notes } = req.body;

    const existing = await Activity.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    const effectiveStart = startTime !== undefined ? startTime : existing.startTime;
    const effectiveEnd = endTime !== undefined ? endTime : existing.endTime;

    if (effectiveStart && effectiveEnd && effectiveEnd < effectiveStart) {
      return res.status(400).json({ error: 'End time cannot be earlier than start time' });
    }

    if (cost !== undefined && Number(cost) < 0) {
      return res.status(400).json({ error: 'Cost cannot be negative' });
    }

    const updated = await Activity.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title }),
        ...(type && { type }),
        ...(date && { date }),
        ...(startTime !== undefined && { startTime }),
        ...(endTime !== undefined && { endTime }),
        ...(location !== undefined && { location }),
        ...(cost !== undefined && { cost: Number(cost) }),
        ...(notes !== undefined && { notes }),
      },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete activity
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
