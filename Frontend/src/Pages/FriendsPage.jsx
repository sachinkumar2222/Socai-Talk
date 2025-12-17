import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import FriendsList from "../components/FriendsList";
import GroupList from "../components/GroupList";
import CreateGroupModal from "../components/CreateGroupModal";
import { Link } from "react-router";
import { ArrowLeft, Users, User, Plus } from "lucide-react";

const FriendsPage = () => {
  const { selectedUser, selectedGroup, setSelectedUser, setSelectedGroup } = useChatStore();
  const [activeTab, setActiveTab] = useState("friends"); // "friends" | "groups"
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isChatOpen = selectedUser || selectedGroup;

  return (
    <div className="h-screen w-screen overflow-hidden bg-base-200/50 relative">
      <div className="w-full h-full flex flex-col lg:flex-row bg-base-100/20 backdrop-blur-3xl">

        {/* Sidebar / List Area */}
        <div className={`
                ${isChatOpen ? 'hidden lg:flex' : 'flex'} 
                w-full lg:w-96 flex-col border-r border-base-content/5 bg-base-100/40 backdrop-blur-xl h-full
            `}>
          <div className="h-auto flex flex-col gap-2 px-4 py-4 border-b border-base-content/5 bg-base-100/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/" className="btn btn-circle btn-sm btn-ghost hover:bg-base-content/10">
                  <ArrowLeft className="size-5" />
                </Link>
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Chats
                </h2>
              </div>
              {activeTab === "groups" && (
                <button onClick={() => setShowCreateModal(true)} className="btn btn-circle btn-sm btn-primary tooltip tooltip-left flex justify-center items-center" data-tip="Create Group">
                  <Plus className="size-5" />
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex bg-base-200/50 p-1 rounded-xl mt-2">
              <button
                onClick={() => setActiveTab("friends")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "friends" ? 'bg-base-100 shadow-sm text-primary' : 'hover:bg-base-100/50 text-base-content/70'}`}
              >
                <User className="size-4" /> Friends
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "groups" ? 'bg-base-100 shadow-sm text-primary' : 'hover:bg-base-100/50 text-base-content/70'}`}
              >
                <Users className="size-4" /> Groups
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === "friends" ? <FriendsList /> : <GroupList />}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`
                ${!isChatOpen ? 'hidden lg:flex' : 'flex'} 
                flex-1 flex-col h-full bg-base-100/60 backdrop-blur-md relative
            `}>
          {/* Mobile Back Button (when chat is open) */}
          {isChatOpen && (
            <div className="lg:hidden absolute top-4 left-4 z-50">
              <button
                onClick={() => { setSelectedUser(null); setSelectedGroup(null); }}
                className="btn btn-circle btn-sm btn-ghost bg-base-100/50 backdrop-blur text-base-content"
              >
                <ArrowLeft className="size-5" />
              </button>
            </div>
          )}

          {/* Background Decor */}
          <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/30 rounded-full filter blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/30 rounded-full filter blur-[100px]"></div>
          </div>

          {!isChatOpen ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>

      {showCreateModal && <CreateGroupModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
};

export default FriendsPage;
