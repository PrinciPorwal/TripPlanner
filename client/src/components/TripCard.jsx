import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight, Trash2, Edit2, Wallet } from 'lucide-react';
import { formatDateRange, calculateDuration, formatCurrency } from '../utils/formatters.js';
import { ConfirmationModal } from './ConfirmationModal.jsx';

export const TripCard = ({ trip, onDelete, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const duration = calculateDuration(trip.startDate, trip.endDate);

  return (
    <>
      <div className="group relative bg-white rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-slate-100 flex flex-col justify-between overflow-hidden">
        {/* Top decorative accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ocean-500 via-coastal-teal to-terracotta-500 opacity-80 group-hover:opacity-100 transition-opacity" />

        <div>
          {/* Destination badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {trip.destinations && trip.destinations.length > 0 ? (
              trip.destinations.map((dest, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-ocean-50 text-ocean-700 border border-ocean-200/70"
                >
                  <MapPin className="w-3 h-3" />
                  {dest}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">No destinations specified</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-ocean-700 transition-colors leading-snug line-clamp-2">
            <Link to={`/trips/${trip._id}/overview`}>{trip.title}</Link>
          </h3>

          {/* Details: Dates & Travelers */}
          <div className="mt-4 space-y-2 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ocean-600 shrink-0" />
              <span>
                {formatDateRange(trip.startDate, trip.endDate)}
                <span className="ml-1.5 text-slate-400">({duration} {duration === 1 ? 'day' : 'days'})</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-coastal-teal shrink-0" />
                <span>
                  {trip.travelers || 1} {trip.travelers === 1 ? 'traveler' : 'travelers'}
                </span>
              </div>

              {trip.budget > 0 && (
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Wallet className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{formatCurrency(trip.budget, trip.currency)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {onEdit && (
              <button
                onClick={() => onEdit(trip)}
                className="p-2 text-slate-400 hover:text-ocean-700 hover:bg-ocean-50 rounded-lg transition-colors"
                title="Edit trip details"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Delete trip"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <Link
            to={`/trips/${trip._id}/overview`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean-700 hover:text-ocean-800 group/btn bg-ocean-50 hover:bg-ocean-100/80 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            <span>Open Trip</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete this Trip?"
        message={`Are you sure you want to delete "${trip.title}"? This will permanently delete all associated itinerary activities and logged expenses.`}
        confirmText="Delete Trip"
        onConfirm={() => {
          setShowDeleteModal(false);
          onDelete(trip._id);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};
