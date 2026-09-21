import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Calendar, Clock, Filter } from 'lucide-react';
import { useTripStore } from '../store/tripStore.js';
import { TripHeader } from '../components/TripHeader.jsx';
import { DaySection } from '../components/DaySection.jsx';
import { ActivityFormModal } from '../components/ActivityFormModal.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import { getDaysArray, formatDate } from '../utils/formatters.js';
import { groupActivitiesByDate } from '../utils/calculations.js';
import toast from 'react-hot-toast';

export const Itinerary = () => {
  const { tripId } = useParams();
  const {
    currentTrip,
    activities,
    fetchTripDetails,
    createActivity,
    updateActivity,
    deleteActivity,
    loading,
  } = useTripStore();

  const [selectedDayFilter, setSelectedDayFilter] = useState('ALL'); // 'ALL' or 'YYYY-MM-DD'
  const [modalOpen, setModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [defaultDateForModal, setDefaultDateForModal] = useState('');

  useEffect(() => {
    if (tripId) {
      fetchTripDetails(tripId);
    }
  }, [tripId, fetchTripDetails]);

  if (loading && !currentTrip) {
    return <LoadingSpinner text="Loading itinerary schedule..." />;
  }

  if (!currentTrip) return null;

  // Generate all date strings in the trip range
  const tripDays = getDaysArray(currentTrip.startDate, currentTrip.endDate);
  const groupedActivities = groupActivitiesByDate(activities, tripDays);

  // Open modal to add activity
  const handleOpenAddModal = (date = '') => {
    setEditingActivity(null);
    setDefaultDateForModal(date || (tripDays.length > 0 ? tripDays[0] : ''));
    setModalOpen(true);
  };

  // Open modal to edit activity
  const handleOpenEditModal = (activity) => {
    setEditingActivity(activity);
    setDefaultDateForModal(activity.date || '');
    setModalOpen(true);
  };

  // Save activity (create or update)
  const handleSaveActivity = async (formData) => {
    try {
      if (editingActivity) {
        await updateActivity(editingActivity._id, formData);
        toast.success('Activity updated successfully');
      } else {
        await createActivity(currentTrip._id, formData);
        toast.success('Activity added to itinerary');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save activity');
    }
  };

  // Delete activity
  const handleDeleteActivity = async (id) => {
    try {
      await deleteActivity(id);
      toast.success('Activity removed');
    } catch (err) {
      toast.error('Failed to delete activity');
    }
  };

  // Days to display based on tab filter
  const displayedDays =
    selectedDayFilter === 'ALL'
      ? tripDays
      : tripDays.filter((d) => d === selectedDayFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <TripHeader trip={currentTrip} />

      {/* Page Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Itinerary</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {activities.length} total activities planned across {tripDays.length} days
          </p>
        </div>

        <button
          onClick={() => handleOpenAddModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-ocean-600 to-coastal-teal hover:from-ocean-700 hover:to-coastal-teal rounded-xl shadow-sm hover:shadow-md transition-all transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Activity</span>
        </button>
      </div>

      {/* Day Filter Tabs */}
      {tripDays.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedDayFilter('ALL')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${selectedDayFilter === 'ALL'
                ? 'bg-ocean-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
          >
            All Days ({tripDays.length})
          </button>

          {tripDays.map((dayDate, index) => (
            <button
              key={dayDate}
              onClick={() => setSelectedDayFilter(dayDate)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${selectedDayFilter === dayDate
                  ? 'bg-ocean-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
            >
              Day {index + 1}
              <span className="ml-1 text-[10px] opacity-75">
                ({formatDate(dayDate).split(',')[0]})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Day Sections List */}
      <div className="space-y-6">
        {displayedDays.map((dayDate) => {
          const dayIndex = tripDays.indexOf(dayDate) + 1;
          const dayActivities = groupedActivities[dayDate] || [];

          return (
            <DaySection
              key={dayDate}
              dayNumber={dayIndex > 0 ? dayIndex : 1}
              date={dayDate}
              activities={dayActivities}
              currency={currentTrip.currency}
              onAddActivity={handleOpenAddModal}
              onEditActivity={handleOpenEditModal}
              onDeleteActivity={handleDeleteActivity}
            />
          );
        })}
      </div>

      {/* Add / Edit Activity Modal */}
      <ActivityFormModal
        isOpen={modalOpen}
        initialData={editingActivity}
        defaultDate={defaultDateForModal}
        currency={currentTrip.currency}
        onSave={handleSaveActivity}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
