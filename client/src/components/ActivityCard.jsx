import React, { useState } from 'react';
import { Clock, MapPin, DollarSign, Edit2, Trash2, Tag } from 'lucide-react';
import { formatTime, formatCurrency } from '../utils/formatters.js';
import { ACTIVITY_TYPE_COLORS } from '../utils/calculations.js';
import { ConfirmationModal } from './ConfirmationModal.jsx';

export const ActivityCard = ({ activity, currency = 'USD', onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const style = ACTIVITY_TYPE_COLORS[activity.type] || ACTIVITY_TYPE_COLORS.Other;

  const hasTime = activity.startTime || activity.endTime;
  const timeFormatted =
    activity.startTime && activity.endTime
      ? `${formatTime(activity.startTime)} – ${formatTime(activity.endTime)}`
      : activity.startTime
      ? formatTime(activity.startTime)
      : '';

  return (
    <>
      <div className="group relative bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-card transition-all border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {/* Type badge */}
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}
            >
              {activity.type}
            </span>

            {/* Time badge */}
            {hasTime && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                <Clock className="w-3 h-3 text-slate-400" />
                {timeFormatted}
              </span>
            )}
          </div>

          <h4 className="text-base font-bold text-slate-900 group-hover:text-ocean-700 transition-colors">
            {activity.title}
          </h4>

          {/* Location & Cost tags */}
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            {activity.location && (
              <div className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-ocean-500 shrink-0" />
                <span className="truncate">{activity.location}</span>
              </div>
            )}

            {activity.cost > 0 && (
              <div className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                <DollarSign className="w-3 h-3 text-emerald-500" />
                <span>{formatCurrency(activity.cost, currency)}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          {activity.notes && (
            <p className="mt-2 text-xs text-slate-500 leading-relaxed bg-slate-50/70 p-2 rounded-lg border border-slate-100">
              {activity.notes}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
          <button
            onClick={() => onEdit(activity)}
            className="p-2 text-slate-400 hover:text-ocean-700 hover:bg-ocean-50 rounded-lg transition-colors"
            title="Edit activity"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete activity"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Activity?"
        message={`Are you sure you want to remove "${activity.title}" from your itinerary?`}
        confirmText="Delete"
        onConfirm={() => {
          setShowDeleteModal(false);
          onDelete(activity._id);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};
