import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  register: (name, email, password) => api.post('/api/auth/register', { name, email, password }),
  getProfile: () => api.get('/api/user/profile'),
};

// YouTube API
export const youtubeAPI = {
  getStats: (channelId) => api.get(`/api/youtube/stats?channelId=${channelId}`),
  searchChannels: (query) => api.get(`/api/youtube/search?query=${encodeURIComponent(query)}`),
};

// Instagram API
export const instagramAPI = {
  getStats: (accountId) => api.get(`/api/instagram/stats?accountId=${accountId}`),
  getInsights: (accountId) => api.get(`/api/instagram/insights?accountId=${accountId}`),
};

export default api;
