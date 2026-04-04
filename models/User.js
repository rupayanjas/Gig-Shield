import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      unique: true,
      trim: true,
    },
    partnerId: {
      type: String,
      required: [true, 'Partner ID is required.'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required.'],
      trim: true,
    },
    trustScore: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    totalDeliveries: {
      type: Number,
      default: 0,
    },
    successfulDays: {
      type: Number,
      default: 0,
    },
    cancellationRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 1,
    },
    claimsMade: {
      type: Number,
      default: 0,
    },
    claimsApproved: {
      type: Number,
      default: 0,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
