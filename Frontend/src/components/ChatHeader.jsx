import { X, Info } from "lucide-react";
import { useSocketStore } from "../store/useSocketStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
import GroupInfoModal from "./GroupInfoModal";

const ChatHeader = () => {
  const { selectedUser, selectedGroup, setSelectedUser, setSelectedGroup } = useChatStore();
  const { onlineUsers } = useSocketStore();
  const [showInfoModal, setShowInfoModal] = useState(false);

  const isGroup = !!selectedGroup;
  const chatName = isGroup ? selectedGroup.name : selectedUser?.fullName;
  const chatPic = isGroup ? (selectedGroup.groupPic || "/avatar.png") : (selectedUser?.profilePic || "/avatar.png");
  const subText = isGroup
    ? `${selectedGroup.members?.length} members`
    : (onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline");

  return (
    <>
      <div className="p-4 border-b border-base-content/5 bg-base-100/30 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => isGroup && setShowInfoModal(true)}>
            <div className="avatar">
              <div className="size-10 relative">
                <img src={chatPic} alt={chatName} className="object-cover rounded-full w-full h-full" />
                {!isGroup && onlineUsers.includes(selectedUser?._id) && (
                  <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base capitalize">{chatName}</h3>
              <p className="text-xs text-base-content/60 font-medium flex items-center gap-1">
                {!isGroup && onlineUsers.includes(selectedUser?._id) ? (
                  <span className="text-emerald-500 font-medium">Online</span>
                ) : (
                  subText
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isGroup && (
              <button onClick={() => setShowInfoModal(true)} className="btn btn-ghost btn-circle btn-sm text-base-content/50">
                <Info size={20} />
              </button>
            )}
            <button
              onClick={() => { setSelectedUser(null); setSelectedGroup(null); }}
              className="btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-base-content hover:bg-base-content/10"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
      {showInfoModal && <GroupInfoModal onClose={() => setShowInfoModal(false)} />}
    </>
  );
};
export default ChatHeader;