import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { CreateTrip } from './pages/CreateTrip.jsx';
import { TripOverview } from './pages/TripOverview.jsx';
import { Itinerary } from './pages/Itinerary.jsx';
import { Expenses } from './pages/Expenses.jsx';
import { Compass, Heart } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800 antialiased font-sans selection:bg-ocean-100 selection:text-ocean-900">
      {/* Toast Notifications Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            fontSize: '13px',
            fontWeight: '600',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
          },
        }}
      />

      {/* Main Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips" element={<Dashboard />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips/:tripId/overview" element={<TripOverview />} />
          <Route path="/trips/:tripId/itinerary" element={<Itinerary />} />
          <Route path="/trips/:tripId/expenses" element={<Expenses />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-ocean-600 text-white flex items-center justify-center">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-700">TripPlanner</span>
            <span>— Seamless Itineraries & Budget Tracking</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted for curious travelers & explorers worldwide</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
