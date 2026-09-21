// Color mappings for expense categories (Mediterranean / Coastal adventure palette)
export const CATEGORY_COLORS = {
  Food: '#f97316',          // Warm Terracotta / Orange
  Transport: '#0d9488',     // Ocean Teal
  Accommodation: '#0284c7', // Deep Azure
  Activities: '#10b981',    // Coastal Mint / Emerald
  Shopping: '#f43f5e',      // Warm Coral
  Other: '#64748b',         // Slate Gray
};

export const CATEGORY_ICONS = {
  Food: 'Utensils',
  Transport: 'Plane',
  Accommodation: 'Hotel',
  Activities: 'Compass',
  Shopping: 'ShoppingBag',
  Other: 'Tag',
};

export const ACTIVITY_TYPE_COLORS = {
  Attraction: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Restaurant: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Hotel: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  Transport: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  Shopping: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  Other: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
};

// Calculate all budget metrics
export const calculateBudgetStats = (budget = 0, expenses = []) => {
  const numericBudget = Number(budget) || 0;
  const totalSpent = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const remaining = numericBudget - totalSpent;
  const percentageUsed = numericBudget > 0 ? Math.round((totalSpent / numericBudget) * 100) : 0;
  const isOverBudget = totalSpent > numericBudget && numericBudget > 0;
  const overBudgetAmount = isOverBudget ? totalSpent - numericBudget : 0;

  return {
    budget: numericBudget,
    totalSpent,
    remaining,
    percentageUsed,
    isOverBudget,
    overBudgetAmount,
  };
};

// Aggregate expenses by category for Recharts Donut Chart
export const getExpensesByCategory = (expenses = []) => {
  const categoryMap = {
    Food: 0,
    Transport: 0,
    Accommodation: 0,
    Activities: 0,
    Shopping: 0,
    Other: 0,
  };

  let total = 0;
  expenses.forEach((exp) => {
    const cat = exp.category || 'Other';
    const amt = Number(exp.amount) || 0;
    if (categoryMap[cat] !== undefined) {
      categoryMap[cat] += amt;
    } else {
      categoryMap['Other'] = (categoryMap['Other'] || 0) + amt;
    }
    total += amt;
  });

  return Object.keys(categoryMap)
    .filter((cat) => categoryMap[cat] > 0)
    .map((cat) => ({
      name: cat,
      amount: categoryMap[cat],
      color: CATEGORY_COLORS[cat] || '#64748b',
      percentage: total > 0 ? Math.round((categoryMap[cat] / total) * 100) : 0,
    }));
};

// Daily spending breakdown for Recharts Bar Chart
export const getDailySpending = (expenses = []) => {
  const dateMap = {};
  expenses.forEach((exp) => {
    const dateKey = exp.date ? exp.date.slice(0, 10) : 'Unknown';
    dateMap[dateKey] = (dateMap[dateKey] || 0) + (Number(exp.amount) || 0);
  });

  return Object.keys(dateMap)
    .sort()
    .map((date) => ({
      date,
      amount: dateMap[date],
    }));
};

// Group activities by date and sort chronologically within each date
export const groupActivitiesByDate = (activities = [], days = []) => {
  const grouped = {};

  // Initialize with days if provided
  days.forEach((day) => {
    grouped[day] = [];
  });

  activities.forEach((act) => {
    const dateKey = act.date ? act.date.slice(0, 10) : '';
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(act);
  });

  // Sort each day's activities by startTime
  Object.keys(grouped).forEach((dateKey) => {
    grouped[dateKey].sort((a, b) => {
      if (!a.startTime) return 1;
      if (!b.startTime) return -1;
      return a.startTime.localeCompare(b.startTime);
    });
  });

  return grouped;
};
