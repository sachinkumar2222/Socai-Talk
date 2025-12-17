import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"
import { getMessage, sendMessage, deleteMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/delete/:id", protectRoute, deleteMessage);

export default router;