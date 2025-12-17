import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/30">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center
             justify-center animate-bounce shadow-xl ring-4 ring-primary/5"
            >
              <MessageSquare className="w-12 h-12 text-primary drop-shadow-md" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary/20 p-2 rounded-full animate-bounce delay-100">
              <div className="w-4 h-4 bg-secondary rounded-full"></div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-base-content to-base-content/50">
          Welcome to SocialTalk!
        </h2>
        <p className="text-base-content/60 text-lg">
          Select a conversation from the sidebar to start chatting comfortably.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;