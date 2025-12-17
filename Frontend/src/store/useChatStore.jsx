import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useSocketStore } from "./useSocketStore";

export const useChatStore = create((set, get) => ({
  groups: [],
  selectedGroup: null,
  messages: [],
  selectedUser: null,
  isMessageLoading: false,
  isTyping: false,

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      // Logic handles both user and group ID from backend if unified
      // But typically we might want to differentiate or backend route is same /api/message/:id
      // Our backend message controller handles both via /:id.
      const res = await axiosInstance.get(`/api/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, selectedGroup, messages } = get();
    // Determine receiver ID (either user or group)
    const receiverId = selectedUser ? selectedUser._id : selectedGroup?._id;
    if (!receiverId) return;

    try {
      const res = await axiosInstance.post(
        `/api/message/send/${receiverId}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  createGroup: async (groupData) => {
    try {
      const res = await axiosInstance.post("/api/groups/create", groupData);
      set({ groups: [res.data, ...get().groups], selectedGroup: res.data, selectedUser: null });
      toast.success("Group created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getGroups: async () => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get("/api/groups");
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  updateGroup: async (groupId, groupData) => {
    try {
      const res = await axiosInstance.put(`/api/groups/update/${groupId}`, groupData);
      set({
        groups: get().groups.map((group) => group._id === groupId ? res.data : group),
        selectedGroup: res.data
      });
      toast.success("Group updated");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  addMember: async (groupId, userId) => {
    try {
      const res = await axiosInstance.post(`/api/groups/${groupId}/add`, { userId });
      set({
        groups: get().groups.map((group) => group._id === groupId ? res.data : group),
        selectedGroup: res.data
      });
      toast.success("Member added");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  removeMember: async (groupId, userId) => {
    try {
      const res = await axiosInstance.post(`/api/groups/${groupId}/remove`, { userId });
      set({
        groups: get().groups.map((group) => group._id === groupId ? res.data : group),
        selectedGroup: res.data
      });
      toast.success("Member removed");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteMessage: async (messageId) => {
    const { messages } = get();
    // Optimistic update
    set({ messages: messages.filter((m) => m._id !== messageId) });

    try {
      await axiosInstance.delete(`/api/message/delete/${messageId}`);
      toast.success("Message deleted");
    } catch (error) {
      toast.error("Failed to delete message");
      // Use helper to refresh
      const { selectedUser, selectedGroup } = get();
      const refreshId = selectedUser ? selectedUser._id : selectedGroup?._id;
      if (refreshId) get().getMessages(refreshId);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, selectedGroup } = get();
    if (!selectedUser && !selectedGroup) return;

    const socket = useSocketStore.getState().socket;

    socket.off("newMessage");
    socket.on("newMessage", (newMessage) => {
      const { selectedUser, selectedGroup } = get(); // get latest state

      const isGroupMessage = !!newMessage.groupId;

      if (isGroupMessage) {
        if (selectedGroup && newMessage.groupId === selectedGroup._id) {
          set({ messages: [...get().messages, newMessage] });
        }
      } else {
        // 1-on-1 logic
        const isFromSelectedUser = newMessage.sender._id === selectedUser?._id; // sender is populated obj
        // Also need to handle own messages if they come back? Usually sendMessage updates state optimistically or via response.
        // Socket emits to receiver.
        if (isFromSelectedUser) {
          set({ messages: [...get().messages, newMessage] });
        }
      }
    });

    // ... typing logic (skip for groups for now or update later) ...
    // ... messagesSeen logic (skip for groups for now) ...

    // Simplification for group phase 1:
    socket.on("messageDeleted", (messageId) => {
      set({ messages: get().messages.filter(msg => msg._id !== messageId) });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useSocketStore.getState().socket;
    socket.off("newMessage");
    socket.off("typing");
    socket.off("stopTyping");
    socket.off("messagesSeen");
    socket.off("messageDeleted");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser, selectedGroup: null }),
  setSelectedGroup: (selectedGroup) => set({ selectedGroup, selectedUser: null }),
}));
