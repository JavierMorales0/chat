import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    max: "50",
    required: true,
  },
  email: {
    type: String,
    max: "150",
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: "",
  },
  status: {
    type: String,
    enum: ["active", "blocked", "inactive"],
    default: "active",
  },
});

export const UserModel = mongoose.model("User", userSchema);
