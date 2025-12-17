import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import useAuthUser from "../hooks/useAuthUser";
import { X, Camera, UserPlus, Trash2, LogOut } from "lucide-react";
import toast from "react-hot-toast";

const GroupInfoModal = ({ onClose }) => {
    const { selectedGroup, updateGroup, addMember, removeMember, setSelectedGroup } = useChatStore();
    const { authUser } = useAuthUser();
    const [activeTab, setActiveTab] = useState("info"); // "info" | "members" | "settings"
    const [editingName, setEditingName] = useState(false);
    const [groupName, setGroupName] = useState(selectedGroup?.name || "");
    const [loading, setLoading] = useState(false);
    const [newMemberId, setNewMemberId] = useState(""); // Simplified for now, ideally a search

    if (!selectedGroup) return null;

    const isAdmin = selectedGroup.admin === authUser._id || selectedGroup.admin?._id === authUser._id;
    const canEdit = isAdmin || selectedGroup.settings.editInfo === "everyone";

    const handleUpdateName = async () => {
        if (!groupName.trim()) return;
        setLoading(true);
        await updateGroup(selectedGroup._id, { name: groupName });
        setLoading(false);
        setEditingName(false);
    };

    const handleLeaveGroup = async () => {
        // confirm logic? 
        if (!window.confirm("Are you sure you want to leave this group?")) return;
        await removeMember(selectedGroup._id, authUser._id);
        onClose();
        setSelectedGroup(null); // Clear selection
    };

    const handleRemoveMember = async (userId) => {
        if (!window.confirm("Remove this member?")) return;
        await removeMember(selectedGroup._id, userId);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-base-100 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-base-300 flex justify-between items-center bg-base-200/50">
                    <h3 className="font-bold text-lg">Group Info</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Group Header */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <img src={selectedGroup.groupPic || "/avatar.png"} alt={selectedGroup.name} className="size-24 rounded-full object-cover border-4 border-base-200" />
                            {canEdit && <button className="absolute bottom-0 right-0 btn btn-circle btn-xs btn-primary"><Camera className="size-3" /></button>}
                        </div>
                        {editingName ? (
                            <div className="flex gap-2">
                                <input className="input input-sm input-bordered" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                                <button onClick={handleUpdateName} className="btn btn-sm btn-primary">Save</button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold">{selectedGroup.name}</h2>
                                {canEdit && <button onClick={() => setEditingName(true)} className="text-xs text-primary hover:underline">Edit</button>}
                            </div>
                        )}
                        <p className="text-sm text-base-content/60">{selectedGroup.members?.length} members</p>
                    </div>

                    {/* Tabs */}
                    <div role="tablist" className="tabs tabs-bordered">
                        <a role="tab" className={`tab ${activeTab === "members" ? "tab-active" : ""}`} onClick={() => setActiveTab("members")}>Members</a>
                        {isAdmin && <a role="tab" className={`tab ${activeTab === "settings" ? "tab-active" : ""}`} onClick={() => setActiveTab("settings")}>Settings</a>}
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        {activeTab === "members" && (
                            <div className="space-y-2">
                                {selectedGroup.members?.map((member) => (
                                    <div key={member.user._id} className="flex items-center justify-between p-2 hover:bg-base-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <img src={member.user.profilePic || "/avatar.png"} className="size-10 rounded-full object-cover" />
                                            <div>
                                                <p className="font-medium">{member.user.fullName} {member.user._id === authUser._id && "(You)"}</p>
                                                <p className="text-xs text-base-content/50 capitalize">{member.role}</p>
                                            </div>
                                        </div>
                                        {isAdmin && member.user._id !== authUser._id && (
                                            <button onClick={() => handleRemoveMember(member.user._id)} className="btn btn-ghost btn-circle btn-sm text-error">
                                                <Trash2 className="size-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {/* Simple Add Logic (Incomplete UI for searching, just placeholder or use modal) */}
                                {/* For MVP, assuming creation is main way to add, or need 'Add Member' modal. Skipping complex add for now as user asked for 'privilege to give name/dp' etc. */}
                                <button onClick={handleLeaveGroup} className="btn btn-error btn-outline w-full mt-4 gap-2">
                                    <LogOut className="size-4" /> Leave Group
                                </button>
                            </div>
                        )}

                        {activeTab === "settings" && isAdmin && (
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Who can edit group info?</span>
                                        <select
                                            className="select select-bordered select-sm"
                                            value={selectedGroup.settings?.editInfo}
                                            onChange={(e) => updateGroup(selectedGroup._id, { settings: { ...selectedGroup.settings, editInfo: e.target.value } })}
                                        >
                                            <option value="everyone">Everyone</option>
                                            <option value="admin">Admin Only</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Who can send messages?</span>
                                        <select
                                            className="select select-bordered select-sm"
                                            value={selectedGroup.settings?.sendMessage}
                                            onChange={(e) => updateGroup(selectedGroup._id, { settings: { ...selectedGroup.settings, sendMessage: e.target.value } })}
                                        >
                                            <option value="everyone">Everyone</option>
                                            <option value="admin">Admin Only</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupInfoModal;
