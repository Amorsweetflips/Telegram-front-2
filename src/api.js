// src/api.js

// Example named export
export async function getData() {
  const res = await fetch(process.env.REACT_APP_API_URL + '/data');
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

// Bundle named exports into a default export
const api = { getData };

export default api;
