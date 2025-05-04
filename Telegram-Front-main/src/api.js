import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

export function fetchMessages() {
  return axios.get(`${API_URL}/messages`).then(res => res.data);
}

export function sendMessage(chatId, message) {
  return axios.post(`${API_URL}/send`, {
    chat_name: chatId,
    sender_username: '@Amor',
    message
  });
}

export function loginWithTelegram() {
  window.TelegramLoginWidget && TelegramLoginWidget.login();
}
// Axios backend connector
