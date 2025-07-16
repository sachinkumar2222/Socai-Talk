import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUser,
  getMyFriends,
  sendFriendRequest,
  getFriendRequest,
  acceptFriendRequest,
  getOutgoingFriendReqs,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUser);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequest);

router.get("/outgoing-friends-request", getOutgoingFriendReqs);

export default router;