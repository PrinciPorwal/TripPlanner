import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, DollarSign, Tag, FileText } from 'lucide-react';

const ACTIVITY_TYPES = [
  'Attraction',
  'Restaurant',
  'Hotel',
  'Transport',
  'Shopping',
  'Other',
];

export const ActivityFormModal = ({
  isOpen,
  initialData = null,
  defaultDate = '',
  currency = 'USD',
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Attraction',
    date: defaultDate || '',
    startTime: '',
    endTime: '',
    location: '',
    cost: 0,
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        type: initialData.type || 'Attraction',
        date: initialData.date || defaultDate || '',
        startTime: initialData.startTime || '',
        endTime: initialData.endTime || '',
        location: initialData.location || '',
        cost: initialData.cost || 0,
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        title: '',
        type: 'Attraction',
        date: defaultDate || '',
        startTime: '',
        endTime: '',
        location: '',
        cost: 0,
        notes: '',
      });
    }
    setErrors({});
  }, [initialData, defaultDate, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Title is required';
    }
    if (!formData.date) {
      errs.date = 'Date is required';
    }
    if (formData.startTime && formData.endTime && formData.endTime < formData.startTime) {
      errs.endTime = 'End time cannot be earlier than start time';
    }
    if (Number(formData.cost) < 0) {
      errs.cost = 'Cost cannot be negative';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...formData,
      cost: Number(formData.cost) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-elevated border border-slate-100 p-6 animate-modal max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            {initialData ? 'Edit Activity' : 'Add Activity to Itinerary'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Activity Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Visit Senso-ji Temple"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
          </div>

          {/* Type & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category / Type
              </label>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 bg-white"
                >
                  {ACTIVITY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.date
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                }`}
              />
              {errors.date && <p className="mt-1 text-xs text-rose-500">{errors.date}</p>}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  errors.endTime
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                }`}
              />
              {errors.endTime && <p className="mt-1 text-xs text-rose-500">{errors.endTime}</p>}
            </div>
          </div>

          {/* Location & Cost */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Asakusa, Tokyo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Estimated Cost ({currency})
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="0"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                    errors.cost
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                  }`}
                />
              </div>
              {errors.cost && <p className="mt-1 text-xs text-rose-500">{errors.cost}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Notes / Booking Details
            </label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Booking references, tips, subway directions, opening hours..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-ocean-600 hover:bg-ocean-700 rounded-xl shadow-sm hover:shadow-md transition-all transform active:scale-95"
            >
              {initialData ? 'Save Changes' : 'Add Activity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
