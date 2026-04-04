import dbConnect from '../lib/db.js';
import User from '../models/User.js';
import Trigger from '../models/Trigger.js';
import Claim from '../models/Claim.js';
import { determineClaimStatus, calculatePayout } from '../lib/claimLogic.js';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST': {
      // Manually create a claim for a specific user + trigger
      try {
        const { userId, triggerId } = req.body;

        if (!userId || !triggerId) {
          return res.status(400).json({
            success: false,
            message: 'Both userId and triggerId are required.',
          });
        }

        // Fetch user and trigger in parallel
        const [user, trigger] = await Promise.all([
          User.findById(userId),
          Trigger.findById(triggerId),
        ]);

        // Validate both exist
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found.' });
        }
        if (!trigger) {
          return res.status(404).json({ success: false, message: 'Trigger not found.' });
        }

        // Validate city match
        if (user.city.toLowerCase() !== trigger.city.toLowerCase()) {
          return res.status(400).json({
            success: false,
            message: `City mismatch: User is in "${user.city}", trigger is in "${trigger.city}".`,
          });
        }

        // Validate trigger is active
        if (!trigger.isActive) {
          return res.status(400).json({
            success: false,
            message: 'Trigger is no longer active. Claims cannot be created.',
          });
        }

        // Prevent duplicate claims (compound index will also catch this, but we give a clean message)
        const existingClaim = await Claim.findOne({ userId, triggerId });
        if (existingClaim) {
          return res.status(409).json({
            success: false,
            message: 'A claim for this user and trigger already exists.',
            existingClaim,
          });
        }

        // Determine status and payout
        const status = determineClaimStatus(user.trustScore);
        const payoutAmount = calculatePayout(trigger.severity, user.trustScore);

        const claim = await Claim.create({
          userId: user._id,
          triggerId: trigger._id,
          status,
          payoutAmount,
        });

        return res.status(201).json({
          success: true,
          message: `Claim ${status === 'approved' ? 'approved' : status === 'pending' ? 'created and pending review' : 'rejected due to low trust score'}.`,
          trustScore: user.trustScore,
          status,
          payoutAmount,
          data: claim,
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({
            success: false,
            message: 'Duplicate claim: A claim for this user and trigger already exists.',
          });
        }
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
