import dbConnect from '../lib/db.js';
import Trigger from '../models/Trigger.js';
import User from '../models/User.js';
import Claim from '../models/Claim.js';
import { determineClaimStatus, calculatePayout } from '../lib/claimLogic.js';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'GET': {
      // Fetch all currently active triggers
      try {
        const triggers = await Trigger.find({ isActive: true }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, count: triggers.length, data: triggers });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    case 'POST': {
      // Create a trigger and auto-generate claims for users in the same city
      try {
        const trigger = await Trigger.create(req.body);

        // --- AUTO CLAIM GENERATION ---
        // Find all users in the same city as this trigger
        const usersInCity = await User.find({ city: trigger.city });

        const claimPromises = usersInCity.map(async (user) => {
          try {
            const status = determineClaimStatus(user.trustScore);
            const payoutAmount = calculatePayout(trigger.severity, user.trustScore);

            await Claim.create({
              userId: user._id,
              triggerId: trigger._id,
              status,
              payoutAmount,
            });
          } catch (claimError) {
            // Silently skip duplicate or invalid claim creation
            // (compound index on userId+triggerId prevents duplicates)
          }
        });

        await Promise.allSettled(claimPromises);

        return res.status(201).json({
          success: true,
          message: `Trigger created. Auto-generated claims for ${usersInCity.length} user(s) in ${trigger.city}.`,
          data: trigger,
        });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
  }
}
