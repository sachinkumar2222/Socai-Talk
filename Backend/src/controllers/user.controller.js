import User from "../models/auth.model.js";
import FriendRequest from "../models/request.model.js";

export const getRecommendedUser = async (req, res) => {
  const currentUserId = req.user._id;
  const currentUser = req.user;

  try {

    const recommendedUser = await User.find({
      $and: [
        {
          _id: { $ne: currentUserId },
        },
        {
          _id: { $nin: currentUser.friends },
        },
        {
          isOnboarded: true,
        },
      ],
    });

    return res.status(200).json(recommendedUser);
  } catch (error) {
    console.log("Error in getRecommendedUser controller ", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
};

export const getMyFriends = async (req, res) => {
  const correntUserId = req.user._id;

  try {
    const user = await User.findById(correntUserId)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage loaction"
      );

    return res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getMyFriends controller ", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: receiverId } = req.params;

    if (myId === receiverId) {
      return res
        .status(400)
        .json({ message: "You can't send a friend request to yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "receiver not found" });
    }

    if (receiver.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, receiver: receiverId },
        { sender: receiverId, receiver: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({
          message: "A friend request already exists between you and this user",
        });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      receiver: receiverId,
    });

    return res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFriendRequest = async (req, res) => {
  try {
    const incomingReqs = await FriendRequest.find({
      receiver: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("receiver", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend Request not found" });
    }

    if (friendRequest.receiver.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.receiver },
    });
    await User.findByIdAndUpdate(friendRequest.receiver, {
      $addToSet: { friends: friendRequest.sender },
    });

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingRequest = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("receiver", "fullName nativeLanguage learingLanguage");

    return res.status(200).json(outgoingRequest);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller ", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
};
