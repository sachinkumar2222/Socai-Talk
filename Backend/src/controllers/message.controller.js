import cloudinary from "../Lib/cloudinary.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../Lib/socket.js"

export const getMessage = async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  try {
    const message = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    });

    return res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessage controller ", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  try {
    let imageUrl;
    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const newMessage = await Message({
      sender: senderId,
      receiver: receiverId,
      text: text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if(receiverSocketId ){
        io.to(receiverSocketId).emit("newMessage",newMessage)
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller ", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
};
