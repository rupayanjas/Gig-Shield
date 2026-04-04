import dbConnect from '../lib/db.js';
import User from '../models/User.js';
import { calculateTrustScore } from '../lib/trustScore.js';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const userData = req.body;

        // Calculate trust score before saving
        const trustScore = calculateTrustScore(userData);
        userData.trustScore = trustScore;

        const user = await User.create(userData);

        res.status(201).json({
          success: true,
          trustScore,
          data: user,
        });
      } catch (error) {
        // Handle duplicate key errors gracefully
        if (error.code === 11000) {
          return res.status(409).json({
            success: false,
            message: 'A user with this phone number already exists.',
          });
        }
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, message: `Method ${method} Not Allowed` });
      break;
  }
}
