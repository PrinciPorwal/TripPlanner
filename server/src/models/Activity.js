import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: [true, 'Trip ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Activity title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    type: {
      type: String,
      enum: ['Attraction', 'Restaurant', 'Hotel', 'Transport', 'Shopping', 'Other'],
      default: 'Other',
    },
    date: {
      type: String, // Stored as 'YYYY-MM-DD' for exact day matching
      required: [true, 'Activity date is required'],
    },
    startTime: {
      type: String, // 'HH:mm'
      default: '',
    },
    endTime: {
      type: String, // 'HH:mm'
      default: '',
      validate: {
        validator: function (value) {
          if (this.startTime && value) {
            return value >= this.startTime;
          }
          return true;
        },
        message: 'End time cannot be earlier than start time',
      },
    },
    location: {
      type: String,
      trim: true,
      default: '',
    },
    cost: {
      type: Number,
      default: 0,
      min: [0, 'Cost cannot be negative'],
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Activity', activitySchema);
