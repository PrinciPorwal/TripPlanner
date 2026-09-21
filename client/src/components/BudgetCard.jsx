import React from 'react';
import { DollarSign, AlertCircle, TrendingUp, CheckCircle2, Wallet } from 'lucide-react';
import { formatCurrency } from '../utils/formatters.js';
import { calculateBudgetStats } from '../utils/calculations.js';

export const BudgetCard = ({ budget = 0, expenses = [], currency = 'USD', compact = false }) => {
  const { totalSpent, remaining, percentageUsed, isOverBudget, overBudgetAmount } =
    calculateBudgetStats(budget, expenses);

  // Progress bar color based on percentage
  const getProgressColor = () => {
    if (isOverBudget) return 'bg-rose-500';
    if (percentageUsed >= 85) return 'bg-amber-500';
    return 'bg-gradient-to-r from-ocean-500 to-coastal-teal';
  };

  const getBadgeColor = () => {
    if (isOverBudget) return 'bg-rose-100 text-rose-800 border-rose-200';
    if (percentageUsed >= 85) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100 transition-all hover:shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ocean-50 text-ocean-600 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Trip Budget</h3>
            <p className="text-xs text-slate-400">Total planned vs actual expenses</p>
          </div>
        </div>

        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 shrink-0 ${getBadgeColor()}`}
        >
          {isOverBudget ? (
            <>
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Over Budget by {formatCurrency(overBudgetAmount, currency)}</span>
            </>
          ) : percentageUsed >= 85 ? (
            <>
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{percentageUsed}% Used</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{percentageUsed}% On Track</span>
            </>
          )}
        </span>
      </div>

      {/* Over-budget alert banner */}
      {isOverBudget && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200/80 flex items-start gap-2.5 text-rose-800 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold">Budget Exceeded!</strong> You have spent{' '}
            {formatCurrency(totalSpent, currency)} of your {formatCurrency(budget, currency)} budget.
            Consider adjusting planned activities or reallocating categories.
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="space-y-1.5 mb-5">
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span>Spent: {formatCurrency(totalSpent, currency)}</span>
          <span>Target: {formatCurrency(budget, currency)}</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
            style={{ width: `${Math.min(100, percentageUsed)}%` }}
          />
        </div>
      </div>

      {/* Key Metric Tiles */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Budget</p>
          <p className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
            {formatCurrency(budget, currency)}
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-ocean-50/60">
          <p className="text-[11px] font-medium text-ocean-700 uppercase tracking-wider">Total Spent</p>
          <p className="text-sm sm:text-base font-bold text-ocean-950 mt-0.5">
            {formatCurrency(totalSpent, currency)}
          </p>
        </div>

        <div className={`p-2.5 rounded-xl ${isOverBudget ? 'bg-rose-50/60' : 'bg-emerald-50/60'}`}>
          <p
            className={`text-[11px] font-medium uppercase tracking-wider ${
              isOverBudget ? 'text-rose-700' : 'text-emerald-700'
            }`}
          >
            {isOverBudget ? 'Over Budget' : 'Remaining'}
          </p>
          <p
            className={`text-sm sm:text-base font-bold mt-0.5 ${
              isOverBudget ? 'text-rose-900' : 'text-emerald-900'
            }`}
          >
            {formatCurrency(isOverBudget ? overBudgetAmount : remaining, currency)}
          </p>
        </div>
      </div>
    </div>
  );
};
