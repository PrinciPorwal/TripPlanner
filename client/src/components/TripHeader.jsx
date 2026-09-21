import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Wallet, ArrowLeft, LayoutDashboard, Clock, Receipt } from 'lucide-react';
import { formatDateRange, calculateDuration, formatCurrency } from '../utils/formatters.js';

export const TripHeader = ({ trip }) => {
  if (!trip) return null;

  const duration = calculateDuration(trip.startDate, trip.endDate);

  const navItems = [
    { label: 'Overview', path: `/trips/${trip._id}/overview`, icon: LayoutDashboard },
    { label: 'Itinerary', path: `/trips/${trip._id}/itinerary`, icon: Clock },
    { label: 'Expenses', path: `/trips/${trip._id}/expenses`, icon: Receipt },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-ocean-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all trips</span>
          </Link>
        </div>

        {/* Title & Metadata */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {trip.destinations && trip.destinations.length > 0 && (
                trip.destinations.map((dest, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-ocean-50 text-ocean-700 border border-ocean-200"
                  >
                    <MapPin className="w-3 h-3" />
                    {dest}
                  </span>
                ))
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {trip.title}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-ocean-600" />
                <span>
                  {formatDateRange(trip.startDate, trip.endDate)} ({duration} {duration === 1 ? 'day' : 'days'})
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-coastal-teal" />
                <span>
                  {trip.travelers || 1} {trip.travelers === 1 ? 'traveler' : 'travelers'}
                </span>
              </div>

              {trip.budget > 0 && (
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Wallet className="w-4 h-4 text-amber-500" />
                  <span>Budget: {formatCurrency(trip.budget, trip.currency)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex items-center gap-2 border-b border-transparent overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-ocean-600 text-ocean-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};
