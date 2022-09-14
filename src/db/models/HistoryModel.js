import mongoose from "mongoose";

const Schema = mongoose.Schema;

const historySchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  connectionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  disconnectionDate: {
    type: Date,
    default: null,
    required: false,
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "online",
  },
  ipAddress: {
    type: String,
    default: "",
  },
  socketId: {
    type: String,
    default: "",
  },
});

export const HistoryModel = mongoose.model("History", historySchema);
