/**
 * calculateTrustScore(user)
 * 
 * Calculates a trust score between 0 and 100 for a gig worker
 * based on their activity and claims history.
 * 
 * @param {Object} user - User data object
 * @returns {number} - Rounded integer trust score (0–100)
 */
export function calculateTrustScore(user = {}) {
  let score = 50; // Base score

  // Reward consistent working days
  score += (user.successfulDays || 0) * 2;

  // Penalize high cancellation rate (0–1 scale, e.g., 0.3 = 30%)
  score -= (user.cancellationRate || 0) * 20;

  // Adjust based on claims approval rate
  const claimsMade = user.claimsMade || 0;
  const claimsApproved = user.claimsApproved || 0;
  if (claimsMade > 0) {
    const approvalRate = claimsApproved / claimsMade; // 0 to 1
    if (approvalRate >= 0.8) {
      score += 10; // Good claim behavior
    } else if (approvalRate < 0.4) {
      score -= 10; // Suspicious claim behavior
    }
  }

  // Heavy penalty for flagged accounts
  if (user.isFlagged) {
    score -= 20;
  }

  // Clamp score between 0 and 100, return as rounded integer
  return Math.round(Math.min(100, Math.max(0, score)));
}
