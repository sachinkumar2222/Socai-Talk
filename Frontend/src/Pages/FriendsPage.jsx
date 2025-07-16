import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import FriendsList from "../components/FriendsList";

const FriendsPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="bg-base-200">
      <div className="flex items-center justify-center">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-4rem)] sm:h-[calc(100vh - 6vh)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <div className="hidden lg:flex w-full h-full">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>

            <div className="block lg:hidden w-full h-full">
              {selectedUser ? <ChatContainer /> : <FriendsList/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
