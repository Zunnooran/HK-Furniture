import mongoose from "mongoose";

//Defining Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  userName: { type: String, trim: true },
  providerId: { type: Number, trim: true },
  provider: { type: String, trim: true },
  picture: { type: String, trim: true },
  password: { type: String, trim: true },
  role: { type: Boolean, required: true, default: false },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  },
  deletedAt: { type: Date },
});

//Model
const UserModel = mongoose.model('User', userSchema)

export default UserModel