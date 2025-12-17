import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useSocketStore } from "../store/useSocketStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { socket } = useSocketStore();
  const { selectedUser, selectedGroup } = useChatStore();
  const timeoutRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Stop typing immediately
      if (selectedUser) socket.emit("stopTyping", { receiverId: selectedUser._id });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);

    // Emit typing event - Groups skipped for now
    if (selectedUser) socket.emit("typing", { receiverId: selectedUser._id });

    // Debounce stop typing
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (selectedUser) socket.emit("stopTyping", { receiverId: selectedUser._id });
    }, 2000);
  };

  return (
    <div className="p-4 w-full bg-base-100/30 backdrop-blur-md border-t border-base-content/5">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700 shadow-md transition-transform group-hover:scale-105"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-white
              flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2 relative">
          <input
            type="text"
            className="w-full input input-bordered rounded-full input-md bg-base-100/50 border-base-content/10 focus:border-primary focus:ring-1 focus:ring-primary/50 pl-4 pr-12 transition-all"
            placeholder="Type a message..."
            value={text}
            onChange={handleInput}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`absolute right-3 top-1/2 -translate-y-1/2 btn btn-xs btn-ghost btn-circle
                     ${imagePreview ? "text-success" : "text-base-content/50 hover:text-primary"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-circle btn-primary shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};
export default ChatInput;