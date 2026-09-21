import { create } from 'zustand';
import { tripService } from '../services/tripService.js';
import { activityService } from '../services/activityService.js';
import { expenseService } from '../services/expenseService.js';

// Fallback initial sample data in case server/database is starting up
const FALLBACK_TRIPS = [
  {
    _id: 'seed-trip-1',
    title: 'Japan Cherry Blossom & Heritage Tour',
    startDate: '2026-04-05T00:00:00.000Z',
    endDate: '2026-04-14T00:00:00.000Z',
    travelers: 2,
    currency: 'USD',
    budget: 4200,
    destinations: ['Tokyo', 'Kyoto', 'Osaka'],
    createdAt: '2026-03-01T10:00:00.000Z',
  },
  {
    _id: 'seed-trip-2',
    title: 'Amalfi Coast & Capri Island Odyssey',
    startDate: '2026-06-12T00:00:00.000Z',
    endDate: '2026-06-20T00:00:00.000Z',
    travelers: 2,
    currency: 'EUR',
    budget: 3500,
    destinations: ['Positano', 'Amalfi', 'Capri', 'Ravello'],
    createdAt: '2026-03-02T11:00:00.000Z',
  },
  {
    _id: 'seed-trip-3',
    title: 'Swiss Alps Hiking & Scenic Rail Adventure',
    startDate: '2026-08-01T00:00:00.000Z',
    endDate: '2026-08-08T00:00:00.000Z',
    travelers: 4,
    currency: 'USD',
    budget: 5500,
    destinations: ['Zermatt', 'Interlaken', 'Lucerne'],
    createdAt: '2026-03-03T12:00:00.000Z',
  },
];

const FALLBACK_ACTIVITIES = [
  {
    _id: 'seed-act-1',
    tripId: 'seed-trip-1',
    title: 'Check-in at Shinjuku Granbell Hotel',
    type: 'Hotel',
    date: '2026-04-05',
    startTime: '14:00',
    endTime: '15:00',
    location: 'Shinjuku, Tokyo',
    cost: 0,
    notes: 'Reservation #JP-98213 with panoramic city view',
  },
  {
    _id: 'seed-act-2',
    tripId: 'seed-trip-1',
    title: 'Dinner at Omoide Yokocho',
    type: 'Restaurant',
    date: '2026-04-05',
    startTime: '18:30',
    endTime: '20:30',
    location: 'Shinjuku, Tokyo',
    cost: 45,
    notes: 'Famous lantern-lit yakitori alleyway',
  },
  {
    _id: 'seed-act-3',
    tripId: 'seed-trip-1',
    title: 'Senso-ji Temple & Asakusa Cultural Walk',
    type: 'Attraction',
    date: '2026-04-06',
    startTime: '09:00',
    endTime: '11:30',
    location: 'Asakusa, Tokyo',
    cost: 0,
    notes: 'Historic temple grounds, incense pavilion, and Nakamise street',
  },
  {
    _id: 'seed-act-4',
    tripId: 'seed-trip-1',
    title: 'Shibuya Sky Observation Deck',
    type: 'Attraction',
    date: '2026-04-06',
    startTime: '16:00',
    endTime: '18:00',
    location: 'Shibuya, Tokyo',
    cost: 40,
    notes: 'Sunset slot booked in advance on 47th floor',
  },
  {
    _id: 'seed-act-5',
    tripId: 'seed-trip-1',
    title: 'Shinkansen Bullet Train to Kyoto',
    type: 'Transport',
    date: '2026-04-08',
    startTime: '08:30',
    endTime: '10:45',
    location: 'Tokyo Station -> Kyoto Station',
    cost: 130,
    notes: 'Tokaido Shinkansen Nozomi with Mt. Fuji view (seats on right side)',
  },
  {
    _id: 'seed-act-6',
    tripId: 'seed-trip-1',
    title: 'Fushimi Inari Torii Gates Hike',
    type: 'Attraction',
    date: '2026-04-09',
    startTime: '07:30',
    endTime: '11:00',
    location: 'Fushimi, Kyoto',
    cost: 0,
    notes: 'Early morning hike through 10,000 vermilion torii gates to avoid crowds',
  },
];

const FALLBACK_EXPENSES = [
  {
    _id: 'seed-exp-1',
    tripId: 'seed-trip-1',
    title: 'Roundtrip Flights (SFO -> HND)',
    category: 'Transport',
    amount: 1450,
    date: '2026-04-05',
    notes: 'ANA Economy class tickets',
  },
  {
    _id: 'seed-exp-2',
    tripId: 'seed-trip-1',
    title: 'Tokyo Hotel (4 Nights)',
    category: 'Accommodation',
    amount: 720,
    date: '2026-04-05',
    notes: 'Shinjuku Granbell Hotel',
  },
  {
    _id: 'seed-exp-3',
    tripId: 'seed-trip-1',
    title: 'Shinkansen Bullet Train Tickets',
    category: 'Transport',
    amount: 260,
    date: '2026-04-08',
    notes: 'Roundtrip Tokyo-Kyoto for two',
  },
  {
    _id: 'seed-exp-4',
    tripId: 'seed-trip-1',
    title: 'Kaiseki Dinner Experience',
    category: 'Food',
    amount: 210,
    date: '2026-04-09',
    notes: 'Traditional 9-course seasonal meal in Gion',
  },
  {
    _id: 'seed-exp-5',
    tripId: 'seed-trip-1',
    title: 'Shibuya Sky & TeamLab Planets Tickets',
    category: 'Activities',
    amount: 95,
    date: '2026-04-06',
    notes: 'Pre-booked digital art and observation deck',
  },
  {
    _id: 'seed-exp-6',
    tripId: 'seed-trip-1',
    title: 'Japanese Pottery & Souvenirs',
    category: 'Shopping',
    amount: 140,
    date: '2026-04-07',
    notes: 'Handcrafted ceramic matcha bowls and chopsticks',
  },
];

export const useTripStore = create((set, get) => ({
  trips: FALLBACK_TRIPS,
  currentTrip: null,
  activities: [],
  expenses: [],
  loading: false,
  error: null,

  // Fetch all trips
  fetchTrips: async () => {
    set({ loading: true, error: null });
    try {
      const data = await tripService.getAll();
      if (Array.isArray(data) && data.length > 0) {
        set({ trips: data, loading: false });
      } else {
        // Keep fallback if backend returned empty array initially
        set((state) => ({
          trips: state.trips.length > 0 ? state.trips : FALLBACK_TRIPS,
          loading: false,
        }));
      }
    } catch (err) {
      console.warn('[TripStore] Live fetch failed, using cached/fallback trips:', err.message);
      set({ loading: false });
    }
  },

  // Fetch single trip with activities and expenses
  fetchTripDetails: async (tripId) => {
    set({ loading: true, error: null });
    try {
      const [trip, activities, expenses] = await Promise.all([
        tripService.getById(tripId).catch(() => null),
        activityService.getByTrip(tripId).catch(() => []),
        expenseService.getByTrip(tripId).catch(() => []),
      ]);

      if (trip) {
        set({
          currentTrip: trip,
          activities: activities || [],
          expenses: expenses || [],
          loading: false,
        });
      } else {
        // Fallback matching
        const fallbackTrip = get().trips.find((t) => t._id === tripId) || FALLBACK_TRIPS[0];
        const fallbackActs = FALLBACK_ACTIVITIES.filter((a) => a.tripId === tripId || a.tripId === 'seed-trip-1');
        const fallbackExps = FALLBACK_EXPENSES.filter((e) => e.tripId === tripId || e.tripId === 'seed-trip-1');
        set({
          currentTrip: fallbackTrip,
          activities: fallbackActs,
          expenses: fallbackExps,
          loading: false,
        });
      }
    } catch (err) {
      console.warn('[TripStore] Failed fetching trip details, using fallback:', err.message);
      const fallbackTrip = get().trips.find((t) => t._id === tripId) || FALLBACK_TRIPS[0];
      set({
        currentTrip: fallbackTrip,
        activities: FALLBACK_ACTIVITIES,
        expenses: FALLBACK_EXPENSES,
        loading: false,
      });
    }
  },

  // Add new trip
  createTrip: async (tripData) => {
    try {
      const newTrip = await tripService.create(tripData);
      set((state) => ({ trips: [newTrip, ...state.trips] }));
      return newTrip;
    } catch (err) {
      // Local fallback creation
      const localTrip = {
        _id: 'local-' + Date.now(),
        ...tripData,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({ trips: [localTrip, ...state.trips] }));
      return localTrip;
    }
  },

  // Update trip
  updateTrip: async (id, tripData) => {
    try {
      const updated = await tripService.update(id, tripData);
      set((state) => ({
        trips: state.trips.map((t) => (t._id === id ? updated : t)),
        currentTrip: state.currentTrip?._id === id ? updated : state.currentTrip,
      }));
      return updated;
    } catch (err) {
      set((state) => ({
        trips: state.trips.map((t) => (t._id === id ? { ...t, ...tripData } : t)),
        currentTrip: state.currentTrip?._id === id ? { ...state.currentTrip, ...tripData } : state.currentTrip,
      }));
    }
  },

  // Delete trip
  deleteTrip: async (id) => {
    try {
      await tripService.delete(id);
    } catch (err) {
      console.warn('[TripStore] Delete API call failed, removing locally:', err.message);
    }
    set((state) => ({
      trips: state.trips.filter((t) => t._id !== id),
      currentTrip: state.currentTrip?._id === id ? null : state.currentTrip,
    }));
  },

  // Add activity
  createActivity: async (tripId, activityData) => {
    try {
      const newActivity = await activityService.create(tripId, activityData);
      set((state) => ({ activities: [...state.activities, newActivity] }));
      return newActivity;
    } catch (err) {
      const localActivity = {
        _id: 'local-act-' + Date.now(),
        tripId,
        ...activityData,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({ activities: [...state.activities, localActivity] }));
      return localActivity;
    }
  },

  // Update activity
  updateActivity: async (id, activityData) => {
    try {
      const updated = await activityService.update(id, activityData);
      set((state) => ({
        activities: state.activities.map((a) => (a._id === id ? updated : a)),
      }));
      return updated;
    } catch (err) {
      set((state) => ({
        activities: state.activities.map((a) => (a._id === id ? { ...a, ...activityData } : a)),
      }));
    }
  },

  // Delete activity
  deleteActivity: async (id) => {
    try {
      await activityService.delete(id);
    } catch (err) {
      console.warn('[TripStore] Delete activity failed on server:', err.message);
    }
    set((state) => ({
      activities: state.activities.filter((a) => a._id !== id),
    }));
  },

  // Add expense
  createExpense: async (tripId, expenseData) => {
    try {
      const newExpense = await expenseService.create(tripId, expenseData);
      set((state) => ({ expenses: [newExpense, ...state.expenses] }));
      return newExpense;
    } catch (err) {
      const localExpense = {
        _id: 'local-exp-' + Date.now(),
        tripId,
        ...expenseData,
        createdAt: new Date().toISOString(),
      };
      set((state) => ({ expenses: [localExpense, ...state.expenses] }));
      return localExpense;
    }
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    try {
      const updated = await expenseService.update(id, expenseData);
      set((state) => ({
        expenses: state.expenses.map((e) => (e._id === id ? updated : e)),
      }));
      return updated;
    } catch (err) {
      set((state) => ({
        expenses: state.expenses.map((e) => (e._id === id ? { ...e, ...expenseData } : e)),
      }));
    }
  },

  // Delete expense
  deleteExpense: async (id) => {
    try {
      await expenseService.delete(id);
    } catch (err) {
      console.warn('[TripStore] Delete expense failed on server:', err.message);
    }
    set((state) => ({
      expenses: state.expenses.filter((e) => e._id !== id),
    }));
  },
}));
