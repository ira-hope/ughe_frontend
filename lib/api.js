// Address of the Django backend, set in .env.local or as a Docker build argument
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Name of the browser storage key that keeps the login token
const TOKEN_KEY = "ughe_token";

// Read, save and remove the login token in the browser
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Send the username and password to Django, returns the token if correct
export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Login failed.");
  return data;
}

// Tell Django to delete the token
export async function logout(token) {
  await fetch(`${API_URL}/api/logout/`, {
    method: "POST",
    headers: { Authorization: `Token ${token}` },
  }).catch(() => {});
}

// Public site info (logo) shown on the login page
export async function fetchSiteInfo() {
  const res = await fetch(`${API_URL}/api/site/`);
  return res.ok ? res.json() : {};
}

// All home page content added in Django Admin (needs the login token)
export async function fetchHome(token) {
  const res = await fetch(`${API_URL}/api/home/`, {
    headers: { Authorization: `Token ${token}` },
  });
  // 401 means the token is missing or no longer valid
  if (res.status === 401) throw new Error("UNAUTHORIZED");
  if (!res.ok) throw new Error("Could not load content from the backend.");
  return res.json();
}
