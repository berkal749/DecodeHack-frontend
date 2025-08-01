import axios from 'axios';

const API_BASE_URL = 'link to your backend API';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export const authAPI = {
  login: (email, password) =>
    api.post('/login', { email, password }),
  
  register: (name, email, password) =>
    api.post('/register', { name, email, password }),
  
  getProfile: () => api.get('/profile'),
};

export const chatAPI = {
  getSession: () => api.get('/session'),
  pair: () => api.get('/pair'),
  getMessages: (sessionId) => api.get(`/messages/${sessionId}`),
  sendMessage: (sessionId, content) =>
    api.post('/message', { sessionId, content }),
  skip: () => api.post('/skip'),
  leave: () => api.post('/leave'),
  getSkips: () => api.get('/skips'),
};