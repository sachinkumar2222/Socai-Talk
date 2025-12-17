import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: false,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    seenAt: {
      type: Date,
      default: null,
    },
    conversationId: {
      type: String,
      index: true,
      // Logic: sorted(userId1, userId2).join('_')
      // This optimizes message fetching by avoiding $or queries on sender/receiver
    }
  },
  { timestamps: true }
);

// Indexes for high-performance reading
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 }); // Fast history fetch
messageSchema.index({ receiver: 1, seen: 1 }); // Fast unread count
messageSchema.index({ conversationId: 1, createdAt: -1 }); // Extremely fast history pagination

const Message = mongoose.model("Message", messageSchema);

export default Message;