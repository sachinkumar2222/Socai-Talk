import cloudinary from "../Lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/auth.model.js";
import Group from "../models/group.model.js";
import { getReceiverSocketId, io } from "../Lib/socket.js"

export const getMessage = async (req, res) => {
  const { id: userToChatId } = req.params; // This could be userId OR groupId
  const myId = req.user._id;

  try {
    // Check if it's a group
    const group = await Group.findById(userToChatId);

    let messages;
    if (group) {
      // It's a group chat
      // Verify membership? Optional but good for security.
      const isMember = group.members.some(m => m.user.toString() === myId.toString()) || group.admin.toString() === myId.toString();
      if (!isMember) return res.status(403).json({ message: "Not a member of this group" });

      messages = await Message.find({ groupId: userToChatId }).sort({ createdAt: 1 }).populate("sender", "fullName profilePic");
    } else {
      // 1-on-1 chat
      messages = await Message.find({
        $or: [
          { sender: myId, receiver: userToChatId },
          { sender: userToChatId, receiver: myId },
        ],
      }).sort({ createdAt: 1 });
    }

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller ", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params; // userId OR groupId
  const senderId = req.user._id;

  try {
    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    // Check if receiverId is a Group
    const group = await Group.findById(receiverId);

    let newMessage;
    if (group) {
      // Group Message Logic

      // Check permission
      if (group.settings.sendMessage === "admin" && group.admin.toString() !== senderId.toString()) {
        return res.status(403).json({ message: "Only admin can send messages in this group" });
      }

      newMessage = await Message({
        sender: senderId,
        groupId: receiverId,
        text: text,
        image: imageUrl,
      });

      await newMessage.save();
      // Populate sender for real-time update
      await newMessage.populate("sender", "fullName profilePic");

      // Emit to all members
      group.members.forEach(member => {
        if (member.user.toString() !== senderId.toString()) {
          const socketId = getReceiverSocketId(member.user);
          if (socketId) {
            io.to(socketId).emit("newMessage", newMessage);
          }
        }
      });
      // Also emit to admin if not sender
      if (group.admin.toString() !== senderId.toString()) {
        const socketId = getReceiverSocketId(group.admin);
        if (socketId) {
          io.to(socketId).emit("newMessage", newMessage);
        }
      }

    } else {
      // 1-on-1 Message Logic
      newMessage = await Message({
        sender: senderId,
        receiver: receiverId,
        text: text,
        image: imageUrl,
      });

      await newMessage.save();

      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage)
      }
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller ", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    console.log("Attempting to delete message:", messageId, "by user:", userId);

    const message = await Message.findById(messageId);

    if (!message) {
      console.log("Message not found");
      return res.status(404).json({ message: "Message not found" });
    }

    // Only sender can delete their message
    if (message.sender.toString() !== userId.toString()) {
      console.log("Unauthorized delete attempt");
      return res.status(403).json({ message: "You are not authorized to delete this message" });
    }

    await Message.findByIdAndDelete(messageId);
    console.log("Message deleted from DB");

    // Notify receiver to remove message from their view
    const receiverSocketId = getReceiverSocketId(message.receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    return res.status(200).json({ message: "Message deleted successfully", messageId });

  } catch (error) {
    console.log("Error in deleteMessage controller ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
