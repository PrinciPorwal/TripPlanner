// Format currency values nicely
export const formatCurrency = (amount, currency = 'USD') => {
  const num = Number(amount) || 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: num % 1 === 0 ? 0 : 2,
    }).format(num);
  } catch {
    return `${currency} ${num.toLocaleString()}`;
  }
};

// Format a date string into readable format (e.g., 'Apr 5, 2026')
export const formatDate = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return String(dateInput);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Format date range (e.g., 'Apr 5 – 14, 2026' or 'Apr 28 – May 4, 2026')
export const formatDateRange = (startDate, endDate) => {
  if (!startDate) return '';
  if (!endDate) return formatDate(startDate);

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return `${startDate} – ${endDate}`;
  }

  const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
  const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} – ${endDay}, ${startYear}`;
    }
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
  }
  return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
};

// Calculate duration in days
export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 1;
};

// Format 24-hour time string (e.g. '14:30') to 12-hour (e.g. '2:30 PM')
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  if (hours === undefined || minutes === undefined) return timeStr;
  const h = parseInt(hours, 10);
  if (isNaN(h)) return timeStr;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHours = h % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
};

// Generate list of dates (YYYY-MM-DD) between start and end
export const getDaysArray = (startDate, endDate) => {
  if (!startDate || !endDate) return [];
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  const curr = new Date(start);
  curr.setHours(0, 0, 0, 0);
  const targetEnd = new Date(end);
  targetEnd.setHours(0, 0, 0, 0);

  while (curr <= targetEnd) {
    const year = curr.getFullYear();
    const month = String(curr.getMonth() + 1).padStart(2, '0');
    const day = String(curr.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
    curr.setDate(curr.getDate() + 1);
  }

  return dates;
};

// Convert Date object to 'YYYY-MM-DD'
export const toISODateString = (dateInput) => {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput).slice(0, 10);
  return d.toISOString().split('T')[0];
};
