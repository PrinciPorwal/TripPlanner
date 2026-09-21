import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { getExpensesByCategory, getDailySpending } from '../utils/calculations.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';

// Custom Tooltip for Pie Chart
const CustomPieTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
        <p className="font-bold text-sm mb-1 flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: data.color }}
          />
          {data.name}
        </p>
        <p className="text-slate-300">
          Amount: <strong className="text-white">{formatCurrency(data.amount, currency)}</strong>
        </p>
        <p className="text-slate-400 mt-0.5">{data.percentage}% of total expenses</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Bar Chart
const CustomBarTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs">
        <p className="font-semibold text-slate-300 mb-1">{formatDate(label)}</p>
        <p className="text-base font-bold text-coastal-mint">
          {formatCurrency(payload[0].value, currency)}
        </p>
      </div>
    );
  }
  return null;
};

export const ExpenseChart = ({ expenses = [], currency = 'USD' }) => {
  const [activeTab, setActiveTab] = useState('category'); // 'category' | 'daily'

  const categoryData = getExpensesByCategory(expenses);
  const dailyData = getDailySpending(expenses);

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-card border border-slate-100">
      {/* Header with toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900">Spending Breakdown</h3>
          <p className="text-xs text-slate-400">Visual breakdown across categories and days</p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start">
          <button
            onClick={() => setActiveTab('category')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'category'
                ? 'bg-white text-ocean-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>By Category</span>
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'daily'
                ? 'bg-white text-ocean-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Daily Spend</span>
          </button>
        </div>
      </div>

      {activeTab === 'category' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Donut Chart */}
          <div className="lg:col-span-7 h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip currency={currency} />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Legend & List */}
          <div className="lg:col-span-5 space-y-2">
            {categoryData.map((cat) => (
              <div
                key={cat.name}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-xs font-bold text-slate-800">{cat.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    {formatCurrency(cat.amount, currency)}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 w-9 text-right">
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Daily Bar Chart */
        <div className="h-[280px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tickFormatter={(val) => formatDate(val).split(',')[0]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(val) => `$${val}`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomBarTooltip currency={currency} />} />
              <Bar dataKey="amount" fill="#0d9488" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
