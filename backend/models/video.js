import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  videoId: {
     type: String, 
     required: true,
     unique: true
   },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

export default mongoose.model("Video", VideoSchema);
