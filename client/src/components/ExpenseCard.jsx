import React, { useState } from 'react';
import { Calendar, DollarSign, Edit2, Trash2, Tag, Utensils, Plane, Hotel, Compass, ShoppingBag } from 'lucide-react';
import { formatDate, formatCurrency } from '../utils/formatters.js';
import { CATEGORY_COLORS } from '../utils/calculations.js';
import { ConfirmationModal } from './ConfirmationModal.jsx';

const CATEGORY_ICON_MAP = {
  Food: Utensils,
  Transport: Plane,
  Accommodation: Hotel,
  Activities: Compass,
  Shopping: ShoppingBag,
  Other: Tag,
};

export const ExpenseCard = ({ expense, currency = 'USD', onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const Icon = CATEGORY_ICON_MAP[expense.category] || Tag;
  const categoryColor = CATEGORY_COLORS[expense.category] || '#64748b';

  return (
    <>
      <div className="group bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-card transition-all border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Category Icon & Info */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
            style={{
              backgroundColor: `${categoryColor}15`,
              color: categoryColor,
            }}
          >
            <Icon className="w-5 h-5 stroke-[1.75]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-slate-900 group-hover:text-ocean-700 transition-colors truncate">
                {expense.title}
              </h4>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0"
                style={{
                  borderColor: `${categoryColor}40`,
                  color: categoryColor,
                  backgroundColor: `${categoryColor}10`,
                }}
              >
                {expense.category}
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(expense.date)}</span>
              </div>
              {expense.notes && (
                <span className="truncate max-w-xs text-slate-500 italic">“{expense.notes}”</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Amount & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {formatCurrency(expense.amount, currency)}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(expense)}
              className="p-2 text-slate-400 hover:text-ocean-700 hover:bg-ocean-50 rounded-lg transition-colors"
              title="Edit expense"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Delete expense"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Expense?"
        message={`Are you sure you want to delete "${expense.title}" (${formatCurrency(
          expense.amount,
          currency
        )})?`}
        confirmText="Delete"
        onConfirm={() => {
          setShowDeleteModal(false);
          onDelete(expense._id);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};
