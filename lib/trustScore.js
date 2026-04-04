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
  // Use safe defaults for all numeric fields
  const successfulDays = Number(user.successfulDays) || 0;
  const cancellationRate = Number(user.cancellationRate) || 0;
  const claimsMade = Number(user.claimsMade) || 0;
  const claimsApproved = Number(user.claimsApproved) || 0;
  const isFlagged = Boolean(user.isFlagged);

  let score = 50; // Base score

  // Reward consistent working days
  score += successfulDays * 2;

  // Penalize high cancellation rate (0–1 scale, e.g., 0.3 = 30%)
  // Clamp cancellation rate to 0-1 range for safety in calculations
  const safeCancellationRate = Math.min(1, Math.max(0, cancellationRate));
  score -= safeCancellationRate * 20;

  // Adjust based on claims approval rate
  if (claimsMade > 0) {
    // Avoid division by zero and ensure approval rate is realistic (0-1)
    const rawApprovalRate = claimsApproved / claimsMade;
    const approvalRate = Math.min(1, Math.max(0, rawApprovalRate));

    if (approvalRate >= 0.8) {
      score += 10; // Good claim behavior
    } else if (approvalRate < 0.4) {
      score -= 10; // Suspicious claim behavior
    }
  }

  // Heavy penalty for flagged accounts
  if (isFlagged) {
    score -= 20;
  }

  // Ensure the final score is never NaN (using || 50 as a ultimate catch-all)
  const finalScore = score || 50;

  // Clamp final score between 0 and 100, return as rounded integer
  return Math.round(Math.min(100, Math.max(0, finalScore)));
}
