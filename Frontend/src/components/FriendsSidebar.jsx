import { useEffect, useState } from "react";
import { Link } from "react-router";
import { EarthIcon } from "lucide-react";

import useAuthUser from "../hooks/useAuthUser";
import useFriends from "../hooks/useFriends";
import { useSocketStore } from "../store/useSocketStore";
import { useChatStore } from "../store/useChatStore";

const FriendsSidebar = () => {
  const { authUser } = useAuthUser();
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
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-[13.5px] border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <EarthIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            SocialTalk
          </span>
        </Link>
      </div>

      <div className="ml-6 mt-3 hidden lg:flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">
          ({onlineFriends.length} online)
        </span>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="text-center text-zinc-500 py-4">
            No friends to show
          </div>
        ) : (
          filteredFriends.map((friend) => (
            <button
              key={friend._id}
              onClick={() => setSelectedUser(friend)} 
              className={`flex items-center gap-3 px-4 py-2 w-full text-left
                          hover:bg-base-300 transition rounded-lg
                         ${
                           selectedUser?._id === friend._id ? "bg-base-300 ring-1 ring-base-300" : ""
                          }
             `}
            >
              <div className="relative">
                <img
                  src={friend.profilePic || "/avatar.png"}
                  alt={friend.fullName}
                  className="size-10 object-cover rounded-full"
                />
                {friend.isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              <div className="hidden lg:block min-w-0">
                <p className="font-medium truncate">{friend.fullName}</p>
                <p className="text-sm text-zinc-400">
                  {friend.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Bottom user info */}
      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FriendsSidebar;
