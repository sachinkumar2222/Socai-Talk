import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        groupPic: {
            type: String,
            default: "",
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                role: {
                    type: String,
                    enum: ["admin", "member"],
                    default: "member",
                },
            },
        ],
        settings: {
            editInfo: {
                type: String,
                enum: ["admin", "everyone"],
                default: "everyone",
            },
            sendMessage: {
                type: String,
                enum: ["admin", "everyone"],
                default: "everyone",
            },
        },
    },
    { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;
