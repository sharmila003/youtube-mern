import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
   },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
},
  emailid: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true
  }
},{ timestamps: true });

export default mongoose.model("User", UserSchema);