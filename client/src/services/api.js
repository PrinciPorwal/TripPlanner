import axios from 'axios';

/**
 * Determine the API base URL:
 * 1. Checks `import.meta.env.VITE_API_URL` (configured in Vercel / .env)
 * 2. Normalizes the URL so both "https://domain.com" and "https://domain.com/api" work properly
 * 3. Defaults to '/api' for local development (which Vite proxies to http://localhost:5000)
 */
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl || !envUrl.trim()) {
    return '/api';
  }

  const trimmed = envUrl.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  // 60-second timeout to handle Render free tier spin-up delays gracefully
  timeout: 60000,
});

// Response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;

