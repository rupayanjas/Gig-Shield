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
    // Step 1 — user and triggers are independent; fetch in parallel
    const [user, triggers] = await Promise.all([
      User.findOne({ phone }).lean(), // .lean() returns plain JS object — faster than Mongoose doc
      Trigger.find({ isActive: true }).sort({ createdAt: -1 }).lean(),
    ]);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Step 2 — claims need userId from step 1
    const claims = await Claim
      .find({ userId: user._id })
      .select('triggerId status payoutAmount createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: { user, claims, triggers },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
