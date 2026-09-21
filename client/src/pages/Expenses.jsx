import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Search, Filter, Receipt, DollarSign, Wallet } from 'lucide-react';
import { useTripStore } from '../store/tripStore.js';
import { TripHeader } from '../components/TripHeader.jsx';
import { BudgetCard } from '../components/BudgetCard.jsx';
import { ExpenseCard } from '../components/ExpenseCard.jsx';
import { ExpenseFormModal } from '../components/ExpenseFormModal.jsx';
import { ExpenseChart } from '../components/ExpenseChart.jsx';
import { EmptyState } from '../components/EmptyState.jsx';
import { LoadingSpinner } from '../components/LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'ALL',
  'Food',
  'Transport',
  'Accommodation',
  'Activities',
  'Shopping',
  'Other',
];

export const Expenses = () => {
  const { tripId } = useParams();
  const {
    currentTrip,
    expenses,
    fetchTripDetails,
    createExpense,
    updateExpense,
    deleteExpense,
    loading,
  } = useTripStore();

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    if (tripId) {
      fetchTripDetails(tripId);
    }
  }, [tripId, fetchTripDetails]);

  if (loading && !currentTrip) {
    return <LoadingSpinner text="Loading expense breakdown..." />;
  }

  if (!currentTrip) return null;

  // Open modal to add expense
  const handleOpenAddModal = () => {
    setEditingExpense(null);
    setModalOpen(true);
  };

  // Open modal to edit expense
  const handleOpenEditModal = (expense) => {
    setEditingExpense(expense);
    setModalOpen(true);
  };

  // Save expense (create or update)
  const handleSaveExpense = async (formData) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, formData);
        toast.success('Expense updated');
      } else {
        await createExpense(currentTrip._id, formData);
        toast.success('Expense logged successfully');
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save expense');
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      toast.success('Expense deleted');
    } catch (err) {
      toast.error('Failed to delete expense');
    }
  };

  // Filtered expenses
  const filteredExpenses = expenses.filter((exp) => {
    const matchesCat = selectedCategory === 'ALL' || exp.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      exp.title?.toLowerCase().includes(q) || exp.notes?.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <TripHeader trip={currentTrip} />

      {/* Top Section: Budget Card & Interactive Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5">
          <BudgetCard
            budget={currentTrip.budget}
            expenses={expenses}
            currency={currentTrip.currency}
          />
        </div>

        <div className="lg:col-span-7">
          <ExpenseChart expenses={expenses} currency={currentTrip.currency} />
        </div>
      </div>

      {/* Expense List Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Expense Records</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {expenses.length} total logged expenses for this journey
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 rounded-xl shadow-sm hover:shadow-md transition-all transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log Expense</span>
        </button>
      </div>

      {/* Filters: Categories & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search expenses..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-100 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Expenses List */}
      {filteredExpenses.length > 0 ? (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              currency={currentTrip.currency}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteExpense}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Receipt}
          title={searchQuery || selectedCategory !== 'ALL' ? 'No matching expenses' : 'No expenses logged'}
          description={
            searchQuery || selectedCategory !== 'ALL'
              ? 'Try resetting your filter or search query.'
              : 'Keep your budget accurate by logging food, transport, and lodging expenses.'
          }
          actionText="Log First Expense"
          onAction={handleOpenAddModal}
        />
      )}

      {/* Add / Edit Expense Modal */}
      <ExpenseFormModal
        isOpen={modalOpen}
        initialData={editingExpense}
        currency={currentTrip.currency}
        onSave={handleSaveExpense}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
