import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { useSocketStore } from "../store/useSocketStore";
import { Check, CheckCheck, Trash } from "lucide-react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils.jsx";
import useAuthUser from "../hooks/useAuthUser.jsx";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    selectedGroup,
    isTyping,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessage,
  } = useChatStore();
  const { authUser } = useAuthUser();
  const { socket } = useSocketStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    const id = selectedUser?._id || selectedGroup?._id;
    if (id) getMessages(id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, selectedGroup?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Mark messages as seen (Phase 1: 1-on-1 only)
    if (selectedUser) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.sender !== authUser._id && !lastMsg.seen) {
        socket.emit("markMessagesAsSeen", { senderId: selectedUser._id });
      }
    }

  }, [messages, authUser._id, selectedUser, selectedGroup, socket, isTyping]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-300">
        <ChatHeader />
      </div>

      {/* Messages area (scrollable, no scrollbar shown) */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {messages?.map((message) => {
          const isOwnMessage = message.sender === authUser._id || message.sender?._id === authUser._id;
          // Sender profile pic logic: populated sender object vs ID
          const senderPic = message.sender?.profilePic || (isOwnMessage ? authUser.profilePic : selectedUser?.profilePic) || "/avatar.png";
          const senderName = message.sender?.fullName; // For groups

          return (
            <div
              key={message._id}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"} group relative`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={senderPic}
                    alt="profile"
                  />
                </div>
              </div>

              {/* Header with Time and Delete Button */}
              <div className="chat-header mb-1 flex items-center gap-1">
                {/* In group, show name if not own message */}
                {selectedGroup && !isOwnMessage && <span className="text-xs font-bold mr-1">{senderName}</span>}

                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>

                {/* Delete Button - Only for own messages */}
                {isOwnMessage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(message._id);
                    }}
                    className="text-error opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-base-200 rounded-full btn btn-xs btn-ghost"
                    title="Delete Message"
                  >
                    <Trash className="size-3" />
                  </button>
                )}
              </div>

              <div className={`chat-bubble flex flex-col relative pr-8 ${!isOwnMessage && selectedGroup ? 'chat-bubble-zinc' : ''}`}> {/* Optional styling for group messages */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}

                {/* Ticks for sent messages (Only 1-on-1 for now) */}
                {isOwnMessage && selectedUser && (
                  <div className="absolute bottom-1 right-2 flex items-center gap-1">
                    {message.seen ? (
                      <CheckCheck className="size-3 text-blue-500" />
                    ) : (
                      <CheckCheck className="size-3 text-base-content/30" />
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator (1-on-1 only) */}
        {isTyping && selectedUser && (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={selectedUser.profilePic || "/avatar.png"} alt="profile" />
              </div>
            </div>
            <div className="chat-bubble bg-base-200 text-base-content/50 text-sm flex items-center gap-1 italic">
              Typing<span className="loading loading-dots loading-xs"></span>
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      {/* Fixed ChatInput */}
      <div className="sticky bottom-0 z-10 bg-base-100 border-t border-base-300">
        <ChatInput />
      </div>
    </div>
  );
};
export default ChatContainer;