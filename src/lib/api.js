/**
 * api.js — Centralized service layer for all backend API calls.
 * All frontend components should import from here, never fetch directly.
 */

const BASE = ''; // Relative URL — works with Vercel dev proxy

// ─────────────────────── Aggregated Dashboard ───────────────────────

/**
 * Single-request fetch for all dashboard data.
 * Returns { success, data: { user, claims, triggers } }
 */
export async function getDashboardData(phone) {
  const res = await fetch(`${BASE}/api/dashboard?phone=${encodeURIComponent(phone)}`);
  return res.json();
}

// ─────────────────────── Users ───────────────────────

/** Look up a user by phone. Returns { success, data } */
export async function getUserByPhone(phone) {
  const res = await fetch(`${BASE}/api/test?phone=${encodeURIComponent(phone)}`);
  return res.json();
}

/** Register a new user. Returns { success, data, trustScore } */
export async function createUser(payload) {
  const res = await fetch(`${BASE}/api/test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
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
