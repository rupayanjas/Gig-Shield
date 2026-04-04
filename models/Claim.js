import mongoose from 'mongoose';

const ClaimSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required.'],
    },
    triggerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trigger',
      required: [true, 'Trigger ID is required.'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    payoutAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate claims for same user + trigger
ClaimSchema.index({ userId: 1, triggerId: 1 }, { unique: true });

export default mongoose.models.Claim || mongoose.model('Claim', ClaimSchema);
