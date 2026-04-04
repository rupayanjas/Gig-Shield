import dbConnect from '../lib/db.js';
import User from '../models/User.js';
import Claim from '../models/Claim.js';
import Trigger from '../models/Trigger.js';

/**
 * GET /api/dashboard?phone=...
 *
 * Aggregated endpoint that returns user, claims, and triggers in a single
 * round-trip. Fetches user + triggers in parallel, then claims once we
 * have the userId — minimising total DB round-trips to 2 sequential steps.
 */
export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    const { phone } = req.query;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'phone query param is required.' });
    }

    await dbConnect(); // reuses global.mongoose cached connection

    try {
      // Step 1 — Fetch the user first (needed to filter triggers and claims)
      const user = await User.findOne({ phone }).lean();

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      // Step 2 — Fetch triggers (specific to this user) and claims in parallel
      const [triggers, claims] = await Promise.all([
        Trigger.find({ isActive: true, userId: user._id }).sort({ createdAt: -1 }).lean(),
        Claim.find({ userId: user._id }).select('triggerId status payoutAmount createdAt').sort({ createdAt: -1 }).lean(),
      ]);



      return res.status(200).json({
        success: true,
        data: { user, claims, triggers },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } catch (globalError) {
    console.error('API /dashboard Global Error:', globalError);
    return res.status(500).json({ success: false, message: `Global Server Error: ${globalError.message}` });
  }
}
