const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

function buildHeaders(includeJson = true) {
  const token = localStorage.getItem("phishguard_token");
  const headers = {};

  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(body?.error || body?.message || response.statusText || "Server error");
  }

  return body;
}

export async function submitRiskRequest(payload) {
  return request("/predict", {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });
}

export async function loginUser(email, password) {
  return request("/login", {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify({ email, password }),
  });
}

export async function signupUser(email, password) {
  return request("/signup", {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchProfile() {
  return request("/profile", {
    method: "GET",
    headers: buildHeaders(false),
  });
}
