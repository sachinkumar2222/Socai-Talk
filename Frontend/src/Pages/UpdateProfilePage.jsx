import { useState } from "react";
import { ArrowLeft, Camera, LogOutIcon, Mail, User, Lock } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, updatePassword } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import useLogOut from "../hooks/useLogOut";
import { THEMES } from "../constant";
import { useThemeStore } from "../store/useThemeStore";

const UpdateProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const { theme, setTheme } = useThemeStore();

  const { authUser } = useAuthUser();
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout } = useLogOut();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const { mutate: updatePasswordMutation, isPending: isUpdatingPassword } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
      setPasswordData({ oldPassword: "", newPassword: "" });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update password");
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      mutate({ profilePic: base64Image });
    };
  };

  return (
    <>
      <div className="min-h-screen bg-base-100">
        <div className="h-16 flex items-center px-2 sticky top-0 z-10 bg-base-100 border-b border-base-300">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="ml-4 text-lg font-semibold">Update Profile</h1>
        </div>
        <div className="pt-20 xs:pt-10 px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-base-300 rounded-2xl shadow p-8 space-y-10">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <p className="mt-2 text-zinc-500">
                  Manage your profile details
                </p>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4 border-base-200"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 bg-base-content hover:scale-105
                p-2 rounded-full cursor-pointer transition-transform duration-200 
                ${isPending
                        ? "animate-pulse pointer-events-none opacity-50"
                        : ""
                      }`}
                  >
                    <Camera className="w-5 h-5 text-base-200" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isPending}
                    />
                  </label>
                </div>
                <p className="text-sm text-zinc-400">
                  {isPending
                    ? "Uploading..."
                    : "Click camera icon to change photo"}
                </p>
              </div>

              {/* Profile Info */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-zinc-500 flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-sm"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <button
                      onClick={() => mutate({ fullName })}
                      className="btn btn-primary"
                      disabled={isPending || authUser?.fullName === fullName || !fullName.trim()}
                    >
                      {isPending ? <span className="loading loading-spinner loading-xs"></span> : "Update"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-500 flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    Bio
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-sm"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <button
                      onClick={() => mutate({ bio })}
                      className="btn btn-primary"
                      disabled={isPending || authUser?.bio === bio}
                    >
                      {isPending ? <span className="loading loading-spinner loading-xs"></span> : "Update"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-zinc-500 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <p className="px-4 py-2 mt-1 bg-base-200 rounded-lg border border-base-300 opacity-50 cursor-not-allowed">
                    {authUser?.email}
                  </p>
                </div>
              </div>

              {/* Account Details */}
              <div className="pt-6 border-t border-base-300">
                <h2 className="text-lg font-semibold mb-4">Account Info</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                    <span className="text-zinc-500">Member Since</span>
                    <span>{authUser?.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-zinc-500">Account Status</span>
                    <span className="text-green-500 font-medium">Active</span>
                  </div>
                </div>
              </div>

              {/* Theme Selection */}
              <div className="pt-6 border-t border-base-300">
                <h2 className="text-lg font-semibold mb-4">Theme</h2>
                <div className="dropdown dropdown-top w-full">
                  <div tabIndex={0} role="button" className="btn m-1 w-full flex justify-between items-center rounded-2xl bg-base-200 border-none hover:bg-base-300">
                    <span className="font-medium text-base-content/80">
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex gap-1" data-theme={theme}>
                        {THEMES.find(t => t.name === theme)?.colors.map((c, i) => (
                          <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }}></div>
                        ))}
                      </div>
                      {/* Chevron icon could be added here if imported, using unicode as fallback or just nothing */}
                      <span className="text-xs">▼</span>
                    </div>
                  </div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-300 rounded-2xl w-full max-h-60 overflow-y-auto block">
                    {THEMES.map((themeOpt) => (
                      <li key={themeOpt.name}>
                        <button
                          className={`flex items-center justify-between w-full my-1 rounded-xl ${theme === themeOpt.name ? 'bg-primary/10 text-primary' : ''}`}
                          onClick={() => {
                            setTheme(themeOpt.name);
                            // Close dropdown by blurring the active element (the button)
                            if (document.activeElement instanceof HTMLElement) {
                              document.activeElement.blur();
                            };
                          }}
                        >
                          <span className="font-medium">{themeOpt.label}</span>
                          <div className="flex gap-1">
                            {themeOpt.colors.map((color, i) => (
                              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                            ))}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Change Password */}
              <div className="pt-6 border-t border-base-300">
                <h2 className="text-lg font-semibold mb-4">Security</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!passwordData.oldPassword || !passwordData.newPassword) {
                      toast.error("Please fill in both fields");
                      return;
                    }
                    updatePasswordMutation(passwordData);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-sm text-zinc-500 flex items-center gap-2 mb-1">
                      <Lock className="w-4 h-4" />
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      placeholder="••••••••"
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-zinc-500 flex items-center gap-2 mb-1">
                      <Lock className="w-4 h-4" />
                      New Password
                    </label>
                    <input
                      type="password"
                      className="input input-bordered w-full"
                      placeholder="••••••••"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      disabled={isUpdatingPassword}
                    >
                      {isUpdatingPassword ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : "Change Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-5 right-5 lg:hidden">
          <button
            onClick={logout}
            className="btn btn-error text-white gap-2 shadow-lg"
          >
            <LogOutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UpdateProfilePage;
