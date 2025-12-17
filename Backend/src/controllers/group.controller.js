import Group from "../models/group.model.js";
import User from "../models/auth.model.js";
import cloudinary from "../Lib/cloudinary.js";

export const createGroup = async (req, res) => {
    try {
        const { name, members, groupPic } = req.body;
        const adminId = req.user._id;

        if (!name || !members || members.length === 0) {
            return res.status(400).json({ message: "Group name and at least one member are required" });
        }

        // Prepare members array: Admin + selected users
        // Ensure admin is added as a member with 'admin' role
        const groupMembers = members.map(userId => ({ user: userId, role: "member" }));
        groupMembers.push({ user: adminId, role: "admin" });

        let imageUrl = "";
        if (groupPic) {
            const uploadResponse = await cloudinary.uploader.upload(groupPic);
            imageUrl = uploadResponse.secure_url;
        }

        const newGroup = new Group({
            name,
            admin: adminId,
            members: groupMembers,
            groupPic: imageUrl,
        });

        await newGroup.save();

        // Populate members for response
        const populatedGroup = await Group.findById(newGroup._id).populate("members.user", "-password");

        res.status(201).json(populatedGroup);
    } catch (error) {
        console.log("Error in createGroup: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getGroups = async (req, res) => {
    try {
        const userId = req.user._id;
        // Find groups where the user is listed in members
        const groups = await Group.find({ "members.user": userId })
            .populate("members.user", "-password")
            .populate("admin", "-password")
            .sort({ updatedAt: -1 });

        res.status(200).json(groups);
    } catch (error) {
        console.log("Error in getGroups: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getGroupMessages = async (req, res) => {
    // This might be better placed in message.controller but commonly requested here too.
    // We will stick to message.controller for fetching messages to keep it unified.
    // Placeholder if needed.
};

export const updateGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { name, groupPic, settings } = req.body;
        const userId = req.user._id;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        // Check permissions
        // If setting is 'admin' only, check if user is admin
        const isAdmin = group.admin.toString() === userId.toString();

        // Check if user is allowed to edit info based on settings
        const canEdit = isAdmin || group.settings.editInfo === "everyone";

        if (!canEdit) {
            return res.status(403).json({ message: "You do not have permission to edit this group" });
        }

        if (name) group.name = name;
        if (settings && isAdmin) { // Only admin can change settings
            group.settings = { ...group.settings, ...settings };
        }

        if (groupPic) {
            const uploadResponse = await cloudinary.uploader.upload(groupPic);
            group.groupPic = uploadResponse.secure_url;
        }

        await group.save();

        const updatedGroup = await Group.findById(groupId).populate("members.user", "-password");
        res.status(200).json(updatedGroup);

    } catch (error) {
        console.log("Error in updateGroup: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addMember = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userId } = req.body;
        const adminId = req.user._id;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        // Only admin can add members (or based on settings? stick to Admin only for now)
        if (group.admin.toString() !== adminId.toString()) {
            return res.status(403).json({ message: "Only admin can add members" });
        }

        const isMember = group.members.some(m => m.user.toString() === userId);
        if (isMember) return res.status(400).json({ message: "User is already a member" });

        group.members.push({ user: userId, role: "member" });
        await group.save();

        const updatedGroup = await Group.findById(groupId).populate("members.user", "-password");
        res.status(200).json(updatedGroup);
    } catch (error) {
        console.log("Error in addMember: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeMember = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userId } = req.body; // User to remove
        const reqUserId = req.user._id; // Requesting user

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        // Check permissions
        const isAdmin = group.admin.toString() === reqUserId.toString();
        const isSelf = userId === reqUserId.toString();

        if (!isAdmin && !isSelf) {
            return res.status(403).json({ message: "You don't have permission to remove this user" });
        }

        group.members = group.members.filter(m => m.user.toString() !== userId);

        // If admin leaves, we might need to handle behavior.
        // For MVP, if admin leaves, group might be headless or we could delete it if empty.
        // Currently relying on basic removal.

        await group.save();

        const updatedGroup = await Group.findById(groupId).populate("members.user", "-password");
        res.status(200).json(updatedGroup);
    } catch (error) {
        console.log("Error in removeMember: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
