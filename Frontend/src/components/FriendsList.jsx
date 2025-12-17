import { useState } from "react";
import { useSocketStore } from "../store/useSocketStore";
import { useChatStore } from "../store/useChatStore";
import useFriends from "../hooks/useFriends";

const FriendsList = () => {
  const { friends, loadingFriends } = useFriends();
  const { onlineUsers } = useSocketStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { selectedUser, setSelectedUser } = useChatStore();

  const friendsWithStatus = friends.map((friend) => ({
    ...friend,
    isOnline: onlineUsers.includes(friend._id),
  }));

  const onlineFriends = friendsWithStatus.filter((f) => f.isOnline);

  const filteredFriends = showOnlineOnly
    ? friendsWithStatus.filter((f) => f.isOnline)
    : friendsWithStatus;

  return (
    <div className="flex flex-col h-full">
      {/* Filter Toggle */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-base-content/60">
        <span className="font-medium">{onlineFriends.length} Online</span>
        <label className="cursor-pointer flex items-center gap-2 hover:text-primary transition-colors">
          <span>Show Online</span>
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-xs checkbox-primary"
          />
        </label>
      </div>

      <div className="overflow-y-auto w-full flex-1 p-2 space-y-1">
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner text-primary loading-md" />
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-50 space-y-2">
            <div className="text-4xl">😴</div>
            <p className="text-sm font-medium">No friends found</p>
          </div>
        ) : (
          filteredFriends.map((friend) => (
            <button
              key={friend._id}
              onClick={() => setSelectedUser(friend)}
              className={`
                group flex items-center gap-3 px-3 py-3 w-full text-left rounded-xl transition-all duration-200
                ${selectedUser?._id === friend._id
                  ? "bg-primary/20 border-l-4 border-primary shadow-sm"
                  : "hover:bg-base-content/5 hover:pl-4 border-l-4 border-transparent"
                }
              `}
            >
              <div className="relative">
                <img
                  src={friend.profilePic || "/avatar.png"}
                  alt={friend.fullName}
                  className="size-12 object-cover rounded-full border-2 border-base-100 group-hover:border-primary/50 transition-colors"
                />
                {friend.isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100 animate-pulse" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${selectedUser?._id === friend._id ? "text-primary" : "text-base-content"}`}>
                  {friend.fullName}
                </p>
                <p className="text-xs text-base-content/50 truncate">
                  {friend.isOnline ? "Online now" : "Offline"}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsList;
