// src/api.js
const baseUrl = process.env.REACT_APP_API_URL.replace(/\/+$/, '');

export async function getData() {
  const res = await fetch(`${baseUrl}/data`);
  if (!res.ok) throw new Error(res.statusText);
  const json = await res.json();
  // unwrap the `data` key
  return json.data;
}

export default { getData };
