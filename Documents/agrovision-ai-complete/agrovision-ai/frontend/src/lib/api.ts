import axios from 'axios';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
const ML = process.env.NEXT_PUBLIC_ML_SERVICE_URL || 'http://localhost:8000';

const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('agrovision_token') : null);

export const api = axios.create({ baseURL: `${BACKEND}/api` });
export const mlApi = axios.create({ baseURL: ML });

api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('agrovision_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── Auth ────────────────────────────────────────────
export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: object) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

// ─── Disease Detection ───────────────────────────────
export const diseaseAPI = {
  detect: (formData: FormData) => mlApi.post('/predict-disease', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  history: () => api.get('/disease/history'),
};

// ─── Recommendations ─────────────────────────────────
export const recommendAPI = {
  getCrop: (params: object) => mlApi.post('/recommend-crop', params),
};

// ─── Weather ─────────────────────────────────────────
export const weatherAPI = {
  getCurrent: (city: string) => api.get(`/weather?city=${encodeURIComponent(city)}`),
  getForecast: (city: string) => api.get(`/weather/forecast?city=${encodeURIComponent(city)}`),
};

// ─── Chatbot ─────────────────────────────────────────
export const chatAPI = {
  send: (messages: object[], language: string) => api.post('/chatbot', { messages, language }),
};

// ─── Analytics ───────────────────────────────────────
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getDiseaseStats: () => api.get('/analytics/diseases'),
};
