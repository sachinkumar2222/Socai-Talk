import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createGroup, getGroups, updateGroup, addMember, removeMember } from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);
router.get("/", protectRoute, getGroups);
router.put("/update/:groupId", protectRoute, updateGroup);
router.post("/add/:groupId", protectRoute, addMember);
router.put("/remove/:groupId", protectRoute, removeMember);

export default router;
