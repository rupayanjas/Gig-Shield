import dbConnect from './lib/db.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function run() {
  try {
    await dbConnect();
    const result = await User.updateMany(
      { successfulDays: 0, trustScore: 50 },
      { $set: { trustScore: 85 } }
    );
    console.log(`Updated ${result.modifiedCount} users to trustScore 85`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
run();
