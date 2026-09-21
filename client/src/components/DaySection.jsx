import React from 'react';
import { Calendar, Plus, MapPin } from 'lucide-react';
import { formatDate } from '../utils/formatters.js';
import { ActivityCard } from './ActivityCard.jsx';

export const DaySection = ({
  dayNumber,
  date,
  activities = [],
  currency = 'USD',
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100">
      {/* Day Section Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ocean-600 to-coastal-teal text-white font-bold flex items-center justify-center text-sm shadow-sm">
            D{dayNumber}
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Day {dayNumber}
              <span className="ml-2 text-xs font-normal text-slate-500">({formatDate(date)})</span>
            </h3>
            <p className="text-xs text-slate-400">
              {activities.length} {activities.length === 1 ? 'activity' : 'activities'} scheduled
            </p>
          </div>
        </div>

        <button
          onClick={() => onAddActivity(date)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-ocean-700 bg-ocean-50 hover:bg-ocean-100 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Activities Timeline / List */}
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity) => (
            <ActivityCard
              key={activity._id}
              activity={activity}
              currency={currency}
              onEdit={onEditActivity}
              onDelete={onDeleteActivity}
            />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <p className="text-xs font-medium text-slate-400">No activities planned for this day yet.</p>
          <button
            onClick={() => onAddActivity(date)}
            className="mt-2 text-xs font-bold text-ocean-600 hover:text-ocean-700 inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Plan something for Day {dayNumber}</span>
          </button>
        </div>
      )}
    </div>
  );
};
