/**
 * api.js — Centralized service layer for all backend API calls.
 * All frontend components should import from here, never fetch directly.
 */

const BASE = ''; // Relative URL — works with Vercel dev proxy

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Server returned non-JSON response: ${text.substring(0, 50)}...`);
  }
  return res.json();
}

// ─────────────────────── Aggregated Dashboard ───────────────────────

/**
 * Single-request fetch for all dashboard data.
 * Returns { success, data: { user, claims, triggers } }
 */
export async function getDashboardData(phone) {
  return fetchJson(`${BASE}/api/dashboard?phone=${encodeURIComponent(phone)}`);
}

// ─────────────────────── Users ───────────────────────

/** Look up a user by phone. Returns { success, data } */
export async function getUserByPhone(phone) {
  return fetchJson(`${BASE}/api/test?phone=${encodeURIComponent(phone)}`);
}

/** Register a new user. Returns { success, data, trustScore } */
export async function createUser(payload) {
  return fetchJson(`${BASE}/api/test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// ─────────────────────── Triggers ───────────────────────

/** Fetch all active triggers. Returns { success, data } */
export async function getActiveTriggers() {
  const res = await fetch(`${BASE}/api/trigger`);
  return res.json();
}

/** Create a new trigger. Returns { success, data, message } */
export async function createTrigger(payload) {
  const res = await fetch(`${BASE}/api/trigger`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// ─────────────────────── Claims ───────────────────────

/** Fetch all claims for a user by userId. Returns { success, data } */
export async function getClaimsByUser(userId) {
  const res = await fetch(`${BASE}/api/claim?userId=${userId}`);
  return res.json();
}
