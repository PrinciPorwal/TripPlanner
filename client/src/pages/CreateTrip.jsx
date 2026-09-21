import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Wallet,
  ArrowLeft,
  Sparkles,
  X,
  Plus,
  Compass,
} from 'lucide-react';
import { useTripStore } from '../store/tripStore.js';
import toast from 'react-hot-toast';

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  { code: 'INR', symbol: '₹', label: 'INR (₹)' },
  { code: 'CAD', symbol: 'CA$', label: 'CAD (CA$)' },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$)' },
  { code: 'CHF', symbol: 'CHF', label: 'CHF (CHF)' },
];

export const CreateTrip = () => {
  const navigate = useNavigate();
  const { createTrip } = useTripStore();

  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    currency: 'USD',
    budget: '',
    destinations: [],
  });

  const [destinationInput, setDestinationInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add destination tag
  const handleAddDestination = () => {
    const trimmed = destinationInput.trim();
    if (trimmed && !formData.destinations.includes(trimmed)) {
      setFormData({
        ...formData,
        destinations: [...formData.destinations, trimmed],
      });
      setDestinationInput('');
    }
  };

  const handleKeyDownDestination = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddDestination();
    }
  };

  const handleRemoveDestination = (index) => {
    setFormData({
      ...formData,
      destinations: formData.destinations.filter((_, i) => i !== index),
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'Trip title is required';
    }
    if (!formData.startDate) {
      errs.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      errs.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      errs.endDate = 'End date cannot be earlier than start date';
    }
    if (Number(formData.travelers) < 1) {
      errs.travelers = 'Must have at least 1 traveler';
    }
    if (formData.budget !== '' && Number(formData.budget) < 0) {
      errs.budget = 'Budget cannot be negative';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const trip = await createTrip({
        title: formData.title.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        travelers: Number(formData.travelers) || 1,
        currency: formData.currency,
        budget: Number(formData.budget) || 0,
        destinations: formData.destinations,
      });

      toast.success('Trip created successfully!');
      navigate(`/trips/${trip._id}/overview`);
    } catch (err) {
      toast.error(err.message || 'Failed to create trip');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-ocean-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to trips</span>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-elevated border border-slate-100 relative overflow-hidden">
        {/* Top decorative gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-ocean-500 via-coastal-teal to-terracotta-500" />

        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ocean-50 text-ocean-700 text-xs font-bold mb-2 border border-ocean-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Journey</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Plan a New Trip
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your trip details, destinations, and estimated budget to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Trip Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Amalfi Coast Sun & Sailing"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 ${errors.title
                  ? 'border-rose-300 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                }`}
            />
            {errors.title && <p className="mt-1.5 text-xs text-rose-500">{errors.title}</p>}
          </div>

          {/* Destinations (Tag Input) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Destinations / Cities
            </label>
            <div className="flex gap-2 mb-2.5">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  onKeyDown={handleKeyDownDestination}
                  placeholder="Type a city and press Enter (e.g. Positano, Tokyo)..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100"
                />
              </div>
              <button
                type="button"
                onClick={handleAddDestination}
                className="px-4 py-2.5 text-sm font-semibold text-ocean-700 bg-ocean-50 hover:bg-ocean-100 rounded-xl transition-colors shrink-0"
              >
                Add
              </button>
            </div>

            {/* Destination tags */}
            {formData.destinations.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.destinations.map((dest, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-ocean-50 text-ocean-700 border border-ocean-200"
                  >
                    <span>{dest}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDestination(i)}
                      className="text-ocean-400 hover:text-ocean-700 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Date Range (Start & End) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Start Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className={`w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 ${errors.startDate
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                    }`}
                />
              </div>
              {errors.startDate && <p className="mt-1.5 text-xs text-rose-500">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                End Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className={`w-full px-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 ${errors.endDate
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                    }`}
                />
              </div>
              {errors.endDate && <p className="mt-1.5 text-xs text-rose-500">{errors.endDate}</p>}
            </div>
          </div>

          {/* Travelers & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Number of Travelers *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="1"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 ${errors.travelers
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                    }`}
                />
              </div>
              {errors.travelers && <p className="mt-1.5 text-xs text-rose-500">{errors.travelers}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Preferred Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 bg-white"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Estimated Total Budget ({formData.currency})
            </label>
            <div className="relative">
              <Wallet className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="0"
                step="any"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="e.g., 3500"
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 ${errors.budget
                    ? 'border-rose-300 focus:ring-rose-200'
                    : 'border-slate-200 focus:border-ocean-500 focus:ring-ocean-100'
                  }`}
              />
            </div>
            {errors.budget && <p className="mt-1.5 text-xs text-rose-500">{errors.budget}</p>}
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
