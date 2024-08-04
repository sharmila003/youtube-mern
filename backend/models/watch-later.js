import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const WatchLaterSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoId: {
    type: String, 
    required: true
  },
}, { timestamps: true });

export default mongoose.model("WatchLater", WatchLaterSchema);
