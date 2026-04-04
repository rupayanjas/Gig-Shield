/**
 * Determines claim status based on the user's trust score.
 * @param {number} trustScore
 * @returns {'approved' | 'pending' | 'rejected'}
 */
export function determineClaimStatus(trustScore) {
  if (trustScore > 70) return 'approved';
  if (trustScore >= 40) return 'pending';
  return 'rejected';
}

/**
 * Calculates the payout amount based on trigger severity and user trust score.
 * @param {string} severity - 'low' | 'medium' | 'high'
 * @param {number} trustScore
 * @returns {number} - Final payout amount (rounded to 2 decimal places)
 */
export function calculatePayout(severity, trustScore) {
  // Base payout by severity
  let base = 100;
  if (severity === 'high') base = 150;
  else if (severity === 'low') base = 50;

  // Modify based on trust score
  let multiplier = 1;
  if (trustScore > 80) multiplier = 1.2;   // +20%
  else if (trustScore < 50) multiplier = 0.8; // -20%

  return Math.round(base * multiplier * 100) / 100;
}
