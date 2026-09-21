import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tripRoutes from './routes/tripRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import Trip from './models/Trip.js';
import { seedDatabase } from './seeds/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(async () => {
  // Check if database is empty; if so, automatically seed it
  try {
    const tripCount = await Trip.countDocuments();
    if (tripCount === 0) {
      console.log('[Server] Database is empty. Seeding initial sample trips...');
      await seedDatabase();
    } else {
      console.log(`[Server] Database contains ${tripCount} trip(s). Ready!`);
    }
  } catch (err) {
    console.error('[Server] Error checking/seeding database:', err.message);
  }
});

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length > 0 && !allowedOrigins.includes('*')) {
        const isAllowed = allowedOrigins.some(
          (allowed) => origin === allowed || origin.startsWith(allowed)
        );
        if (isAllowed) return callback(null, true);
      }
      // Default allow so frontend connection is never unexpectedly blocked
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Root route (useful for verifying Render deployment in browser)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TripPlanner Backend API server is running!',
    health: '/api/health',
    routes: ['/api/trips', '/api/activities', '/api/expenses'],
  });
});

// API Routes
app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/expenses', expenseRoutes);

// Seed / Reset endpoint for quick testing
app.post('/api/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.json({ message: 'Database re-seeded successfully with rich sample trips!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`[Server] TripPlanner API server running on http://localhost:${PORT}`);
});
