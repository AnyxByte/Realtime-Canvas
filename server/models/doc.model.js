import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const Doc = mongoose.model("Doc", documentSchema);
