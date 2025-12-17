import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Prevent duplicate friend requests at DB level
requestSchema.index({ sender: 1, receiver: 1 }, { unique: true });

// Fast lookup for "My Pending Requests"
requestSchema.index({ receiver: 1, status: 1 });

const FriendRequest = mongoose.model("FriendRequest", requestSchema);

export default FriendRequest;
