/**
 * liveHelpers.js
 * Lightweight computed values derived from live backend data.
 * These are NOT API calls — just pure data transformations.
 */

/**
 * Sums all approved claim payout amounts.
 * @param {Array} claims - Array of claim objects from /api/claim
 * @returns {number}
 */
export function getShieldedIncome(claims = []) {
  return claims
    .filter(c => c.status === 'approved')
    .reduce((sum, c) => sum + (c.payoutAmount || 0), 0);
}

/**
 * Derives coverage tier label from trust score.
 * @param {number} trustScore
 * @returns {{ name: string, hours: number }}
 */
export function getCoverageTier(trustScore) {
  if (trustScore > 80) return { name: 'Premium', hours: 160 };
  if (trustScore >= 50) return { name: 'Basic', hours: 100 };
  return { name: 'Risk', hours: 40 };
}

/**
 * Derives risk level from the number of active triggers.
 * @param {Array} triggers - Array of active trigger objects from /api/trigger
 * @returns {{ level: string, prob: number }}
 */
export function getRiskLevel(triggers = []) {
  const count = triggers.length;
  if (count >= 3) return { level: 'HIGH', prob: 75 };
  if (count >= 1) return { level: 'MEDIUM', prob: 40 };
  return { level: 'LOW', prob: 10 };
}
