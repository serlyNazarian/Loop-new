/**
 * Single entry point for talking to the Node backend.
 *
 * Replaces the scattered `fetch('/api/...')` calls from the old Next.js
 * pages. Centralizes: base URL, cookie credentials (the JWT cookie the
 * backend sets), JSON encode/decode, and a uniform error shape.
 *
 * Cross-origin note: the CRA app and the Node API are on different
 * origins, so `credentials: 'include'` is required AND the backend must
 * send `Access-Control-Allow-Credentials: true` with a specific
 * `Access-Control-Allow-Origin`. In dev you can instead set
 * `"proxy": "http://localhost:4000"` in package.json and leave
 * REACT_APP_API_BASE_URL empty to keep everything same-origin.
 */

const BASE = process.env.REACT_APP_API_BASE_URL || '';

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

async function request(path, { method = 'GET', body, headers, signal, ...rest } = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      credentials: 'include',
      headers: {
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
      ...rest,
    });
  } catch (networkErr) {
    // fetch only rejects on network failure / CORS / abort
    if (networkErr.name === 'AbortError') throw networkErr;
    throw new ApiError('Network error — could not reach the server.', 0, null);
  }

  // 204 No Content and empty bodies shouldn't blow up JSON.parse
  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    throw new ApiError(data?.error || data?.message || res.statusText, res.status, data);
  }
  return data;
}

function safeJson(text) {
  try { return JSON.parse(text); } catch { return null; }
}

const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};

export default api;
