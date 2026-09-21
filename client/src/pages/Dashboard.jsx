import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, MapPin, Compass, Sparkles, Globe, Wallet, Calendar } from 'lucide-react';
import { useTripStore } from '../store/tripStore.js';
import { TripCard } from '../components/TripCard.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { formatCurrency } from '../utils/formatters.js';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const { trips, fetchTrips, deleteTrip, loading } = useTripStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleDeleteTrip = async (id) => {
    try {
      await deleteTrip(id);
      toast.success('Trip deleted successfully');
    } catch {
      toast.error('Failed to delete trip');
    }
  };

  // Filter trips by title or destinations
  const filteredTrips = trips.filter((trip) => {
    const q = searchQuery.toLowerCase();
    const titleMatch = trip.title?.toLowerCase().includes(q);
    const destMatch = trip.destinations?.some((d) => d.toLowerCase().includes(q));
    return titleMatch || destMatch;
  });

  // Calculate high-level stats
  const totalTrips = trips.length;
  const totalBudget = trips.reduce((sum, t) => sum + (Number(t.budget) || 0), 0);
  const uniqueDestinations = new Set(
    trips.flatMap((t) => (Array.isArray(t.destinations) ? t.destinations : []))
  ).size;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner with Sunlit Mediterranean Travel Aesthetic */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-ocean-700 via-ocean-600 to-coastal-teal p-8 sm:p-12 text-white shadow-elevated mb-10">
        {/* Background decorative patterns */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-terracotta-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-ocean-100 text-xs font-semibold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curate Your Journey</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Plan extraordinary adventures, flawlessly.
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-ocean-100/90 leading-relaxed">
            Craft day-by-day itineraries, track expenses against your budget, and explore the globe with
            confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/trips/new"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-ocean-50 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4 text-terracotta-600" />
              <span>Plan a New Trip</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid inside Hero */}
        <div className="mt-10 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-2xl font-black">{totalTrips}</p>
              <p className="text-xs text-ocean-200 font-medium">Planned Trips</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <Globe className="w-5 h-5 text-coastal-mint" />
            </div>
            <div>
              <p className="text-2xl font-black">{uniqueDestinations}</p>
              <p className="text-xs text-ocean-200 font-medium">Destinations</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
              <Wallet className="w-5 h-5 text-terracotta-300" />
            </div>
            <div>
              <p className="text-2xl font-black">{formatCurrency(totalBudget, 'USD')}</p>
              <p className="text-xs text-ocean-200 font-medium">Total Budgets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trips Section Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Your Trips</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore and manage your active and upcoming travel itineraries
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or destination..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 bg-white shadow-sm"
            />
          </div>

          <Link
            to="/trips/new"
            className="sm:hidden inline-flex items-center justify-center p-2 text-white bg-ocean-600 rounded-xl shrink-0"
          >
            <Plus className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Trips Grid */}
      {loading ? (
        <LoadingSpinner text="Fetching your adventures..." />
      ) : filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onDelete={handleDeleteTrip}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Compass}
          title={searchQuery ? 'No matching trips found' : 'No trips created yet'}
          description={
            searchQuery
              ? `No itineraries matching "${searchQuery}". Try a different keyword.`
              : 'Start your journey by planning your very first trip!'
          }
          actionText="Plan a New Trip"
          onAction={() => (window.location.href = '/trips/new')}
        />
      )}
    </div>
  );
};
