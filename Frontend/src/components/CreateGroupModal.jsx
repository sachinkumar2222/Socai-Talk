import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import useFriends from "../hooks/useFriends";
import { X, Search, Camera } from "lucide-react";
import toast from "react-hot-toast";

const CreateGroupModal = ({ onClose }) => {
    const { createGroup } = useChatStore();
    const { friends, loadingFriends } = useFriends();
    const [groupName, setGroupName] = useState("");
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const filteredFriends = friends.filter(friend =>
        friend.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFriend = (id) => {
        if (selectedFriends.includes(id)) {
            setSelectedFriends(selectedFriends.filter(fid => fid !== id));
        } else {
            setSelectedFriends([...selectedFriends, id]);
        }
    };

    const handleCreate = async () => {
        if (!groupName.trim()) return toast.error("Group name is required");
        if (selectedFriends.length === 0) return toast.error("Select at least one friend");

        setLoading(true);
        await createGroup({ name: groupName, members: selectedFriends });
        setLoading(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-base-100 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-base-300 flex justify-between items-center bg-base-200/50">
                    <h3 className="font-bold text-lg">New Group</h3>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
                        <X className="size-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Group Name Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content/70">Group Name</label>
                        <input
                            type="text"
                            placeholder="Enter group name..."
                            className="input input-bordered w-full rounded-xl focus:outline-none focus:border-primary"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </div>

                    {/* Member Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-base-content/70">Select Members ({selectedFriends.length})</label>

                        {/* Search Friends */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 size-4 text-base-content/40" />
                            <input
                                type="text"
                                placeholder="Search friends..."
                                className="input input-bordered input-sm w-full pl-9 rounded-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-1 mt-2 border border-base-300 rounded-xl p-2 bg-base-200/30">
                            {loadingFriends ? (
                                <div className="flex justify-center p-4"><span className="loading loading-spinner" /></div>
                            ) : filteredFriends.length === 0 ? (
                                <div className="text-center p-4 text-base-content/50 text-sm">No friends found</div>
                            ) : (
                                filteredFriends.map(friend => (
                                    <div
                                        key={friend._id}
                                        onClick={() => toggleFriend(friend._id)}
                                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedFriends.includes(friend._id) ? 'bg-primary/10' : 'hover:bg-base-200'}`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedFriends.includes(friend._id)}
                                            readOnly
                                            className="checkbox checkbox-primary checkbox-sm rounded-md"
                                        />
                                        <img src={friend.profilePic || "/avatar.png"} alt={friend.fullName} className="size-8 rounded-full object-cover" />
                                        <span className="text-sm font-medium truncate">{friend.fullName}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-base-300 bg-base-200/50 flex justify-end gap-2">
                    <button onClick={onClose} className="btn btn-ghost">Cancel</button>
                    <button
                        onClick={handleCreate}
                        className="btn btn-primary px-8"
                        disabled={loading || !groupName.trim() || selectedFriends.length === 0}
                    >
                        {loading ? <span className="loading loading-spinner" /> : "Create Group"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;
