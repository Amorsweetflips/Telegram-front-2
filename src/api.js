import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// request interceptor (optional)
api.interceptors.request.use(cfg => {
  // e.g. attach auth token
  // cfg.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return cfg;
}, err => Promise.reject(err));

// response interceptor (optional)
api.interceptors.response.use(res => res, err => Promise.reject(err));

// Auth
export const signIn = async (credentials) => {
  // POST /auth/signin { username, password }
  const { data } = await api.post('/auth/signin', credentials);
  return data;
};

// Chats
export const getOpenChats = async () => {
  // GET /chats/open
  const { data } = await api.get('/chats/open');
  return data;
};

export const getChatMessages = async (chatId) => {
  // GET /chats/:chatId/messages
  const { data } = await api.get(`/chats/${chatId}/messages`);
  return data;
};

export const sendReply = async (chatId, message) => {
  // POST /chats/:chatId/reply { message }
  const { data } = await api.post(`/chats/${chatId}/reply`, { message });
  return data;
};

// Suggestions
export const suggestReplies = async (text) => {
  // POST /suggestions { text }
  const { data } = await api.post('/suggestions', { text });
  return data;
};

export default api;
