<<<<<<< HEAD
import axios from 'axios';
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default api;
=======
// src/api.js
import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL.replace(/\/+$/, '');

export async function signIn(username) {
  const { data } = await axios.post(`${BASE}/auth/token`, { username });
  return data.access_token;
}

export async function getOpenChats(token) {
  const { data } = await axios.get(`${BASE}/chats/open`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.chats;
}

export async function getChatMessages(chatName, token) {
  const { data } = await axios.get(`${BASE}/chats/${chatName}/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data.messages;
}

export async function sendReply(chatName, message, token) {
  const { data } = await axios.post(
    `${BASE}/send`,
    { chat_name: chatName, message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.inserted;
}

export async function suggestReplies(chatName, lastMessage, token) {
  const { data } = await axios.post(
    `${BASE}/suggest`,
    { chat_name: chatName, last_message: lastMessage },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.options;
}

export async function healthcheck() {
  const { data } = await axios.get(`${BASE}/`);
  return data;
}
>>>>>>> 358c0eda6cd20f98fadba49bef627a0df480147f
