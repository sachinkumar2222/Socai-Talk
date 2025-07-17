import { axiosInstance } from "./axios.js";

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/api/auth/me");
    return res.data;
  } catch (error) {
    console.log("error in getAuthUser ", error);
    return null;
  }
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/api/auth/login", loginData);
  return res.data;
};

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/api/auth/signup", signupData);
  return res.data;
};

export const verifyEmail = async (code) => {
  const res = await axiosInstance.post("/api/auth/verify-email", code);
  return res.data;
};

export const resendVerificationCode = async () => {
  const res = await axiosInstance.post("/api/auth/resend-code");
  return res.data;
};

export const forgotPass = async (email) => {
  const res = await axiosInstance.post("/api/auth/forgot-password",{email});
  return res.data;
}

export const resetPassword = async ({token,password}) => {
  const res = await axiosInstance.post(`/api/auth/reset-password/${token}`,{password});
  return res.data;
}

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/api/auth/onboarding", userData);
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await axiosInstance.put("/api/auth/update-profile", userData);
  return response.data;
};

export const getRecommUser = async () => {
  const res = await axiosInstance.get("/api/users");
  return res.data;
};

export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("/api/users/outgoing-friends-request");
  return res.data;
};

export const sendFriendRequest = async (id) => {
  const res = await axiosInstance.post(`/api/users/friend-request/${id}`);
  return res.data;
};

export const getFriendReqs = async () => {
  const res = await axiosInstance.get("/api/users/friend-requests");
  return res.data;
};

export const acceptFriendReqs = async (id) => {
  const res = await axiosInstance.put(`/api/users/friend-request/${id}/accept`);
  return res.data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get(`/api/users/friends`);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
  return res.data;
};
