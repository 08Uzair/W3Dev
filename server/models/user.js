import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  event: { type: String, required: true },
  user_id: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String },
  date: { type: Date, default: Date.now },
});

export const user = mongoose.model("user", userSchema);
