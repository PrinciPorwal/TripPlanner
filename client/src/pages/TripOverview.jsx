import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Receipt,
  Plus,
  ArrowRight,
  Compass,
  MapPin,
  TrendingUp,
  Tag,
} from 'lucide-react';
import { useTripStore } from '../store/tripStore.js';
import { TripHeader } from '../components/TripHeader.jsx';
import { BudgetCard } from '../components/BudgetCard.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { formatTime, formatDate, formatCurrency, calculateDuration } from '../utils/formatters.js';
import { ACTIVITY_TYPE_COLORS } from '../utils/calculations.js';

export const TripOverview = () => {
  const { tripId } = useParams();
  const { currentTrip, activities, expenses, fetchTripDetails, loading } = useTripStore();

  useEffect(() => {
    if (tripId) {
      fetchTripDetails(tripId);
    }
  }, [tripId, fetchTripDetails]);

  if (loading && !currentTrip) {
    return <LoadingSpinner text="Loading trip overview..." />;
  }

  if (!currentTrip) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-xl font-bold text-slate-800">Trip not found</h2>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-ocean-600">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const duration = calculateDuration(currentTrip.startDate, currentTrip.endDate);
  const recentActivities = [...activities].slice(0, 4);
  const recentExpenses = [...expenses].slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <TripHeader trip={currentTrip} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Budget & Highlights */}
        <div className="lg:col-span-8 space-y-8">
          {/* Budget Card */}
          <BudgetCard
            budget={currentTrip.budget}
            expenses={expenses}
            currency={currentTrip.currency}
          />

          {/* Itinerary Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ocean-50 text-ocean-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Itinerary Highlights</h3>
                  <p className="text-xs text-slate-400">
                    {activities.length} planned activities across {duration} days
                  </p>
                </div>
              </div>

              <Link
                to={`/trips/${currentTrip._id}/itinerary`}
                className="inline-flex items-center gap-1 text-xs font-bold text-ocean-700 hover:text-ocean-800 bg-ocean-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Full Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentActivities.length > 0 ? (
              <div className="space-y-3">
                {recentActivities.map((act) => {
                  const style = ACTIVITY_TYPE_COLORS[act.type] || ACTIVITY_TYPE_COLORS.Other;
                  return (
                    <div
                      key={act._id}
                      className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border} shrink-0`}
                        >
                          {act.type}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{act.title}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{formatDate(act.date)}</span>
                            {act.startTime && <span>• {formatTime(act.startTime)}</span>}
                            {act.location && <span>• {act.location}</span>}
                          </p>
                        </div>
                      </div>

                      {act.cost > 0 && (
                        <span className="text-xs font-bold text-slate-700 shrink-0">
                          {formatCurrency(act.cost, currentTrip.currency)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-6 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-400">No activities planned yet.</p>
                <Link
                  to={`/trips/${currentTrip._id}/itinerary`}
                  className="mt-2 text-xs font-bold text-ocean-600 inline-block"
                >
                  + Add first activity
                </Link>
              </div>
            )}
          </div>

          {/* Recent Expenses Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Expenses</h3>
                  <p className="text-xs text-slate-400">{expenses.length} expenses recorded</p>
                </div>
              </div>

              <Link
                to={`/trips/${currentTrip._id}/expenses`}
                className="inline-flex items-center gap-1 text-xs font-bold text-ocean-700 hover:text-ocean-800 bg-ocean-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>All Expenses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentExpenses.length > 0 ? (
              <div className="space-y-3">
                {recentExpenses.map((exp) => (
                  <div
                    key={exp._id}
                    className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800 truncate">{exp.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        <span className="font-semibold text-slate-600">{exp.category}</span> •{' '}
                        {formatDate(exp.date)}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-slate-900 shrink-0">
                      {formatCurrency(exp.amount, currentTrip.currency)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-400">No expenses logged yet.</p>
                <Link
                  to={`/trips/${currentTrip._id}/expenses`}
                  className="mt-2 text-xs font-bold text-amber-600 inline-block"
                >
                  + Log first expense
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Stats & Details */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Action Widget */}
          <div className="bg-gradient-to-br from-ocean-600 to-coastal-teal rounded-2xl p-6 text-white shadow-card">
            <h3 className="text-lg font-extrabold mb-1">Quick Actions</h3>
            <p className="text-xs text-ocean-100 mb-5">Keep your travel itinerary up to date</p>

            <div className="space-y-3">
              <Link
                to={`/trips/${currentTrip._id}/itinerary`}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all text-xs font-bold"
              >
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ocean-200" />
                  <span>Manage Itinerary</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to={`/trips/${currentTrip._id}/expenses`}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all text-xs font-bold"
              >
                <span className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-ocean-200" />
                  <span>Log / View Expenses</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Trip Summary Card */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Trip Details
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Duration</span>
                <span className="font-bold text-slate-800">{duration} Days</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Travelers</span>
                <span className="font-bold text-slate-800">{currentTrip.travelers || 1}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Currency</span>
                <span className="font-bold text-slate-800">{currentTrip.currency}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Planned Budget</span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(currentTrip.budget, currentTrip.currency)}
                </span>
              </div>

              {currentTrip.destinations && currentTrip.destinations.length > 0 && (
                <div className="pt-2">
                  <span className="text-slate-400 block mb-2">Destinations</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentTrip.destinations.map((dest, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700"
                      >
                        <MapPin className="w-3 h-3 text-ocean-500" />
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
