import mongoose from 'mongoose';

const TriggerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Trigger type is required.'],
      enum: ['rain', 'pollution', 'app_downtime', 'dark_store', 'incentive_break'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Optional for backwards compatibility, but used for new simulated triggers
    },
    city: {
      type: String,
      required: [true, 'City is required.'],
      trim: true,
    },
    severity: {
      type: String,
      required: [true, 'Severity is required.'],
      enum: ['low', 'medium', 'high'],
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required.'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required.'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Trigger || mongoose.model('Trigger', TriggerSchema);
