import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Camera, Earth, Loader2, MapPin, Sparkles, User, MessageSquareText, BookOpen } from "lucide-react";
import { completeOnboarding } from "../lib/api";
import { LANGUAGES } from "../constant/index";
import { motion } from "framer-motion";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    profilePic: authUser?.profilePic || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  const handlePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-200 relative overflow-hidden">
      {/* Background Decor - Global */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Left Side - Visual (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-base-100/50 backdrop-blur-sm relative border-r border-white/5">
        <div className="max-w-lg text-center space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 blur-3xl rounded-full" />
            <div className="relative bg-base-100/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-xl">
              <div className="size-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                <Sparkles className="size-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">You're Almost There!</h2>
              <p className="text-lg text-base-content/70 leading-relaxed">
                Completing your profile helps us find the perfect language partners tailored to your interests and goals.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="p-4 rounded-2xl bg-base-100/40 border border-white/5">
              <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                <User className="size-5" />
                <span>Showcase</span>
              </div>
              <p className="text-sm text-base-content/60 text-left">Share your bio and interests with the community.</p>
            </div>
            <div className="p-4 rounded-2xl bg-base-100/40 border border-white/5">
              <div className="flex items-center gap-2 mb-2 text-secondary font-bold">
                <Earth className="size-5" />
                <span>Connect</span>
              </div>
              <p className="text-sm text-base-content/60 text-left">Find partners based on location and language.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex justify-center items-center p-4 sm:p-8 lg:p-12 z-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl space-y-8"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block">
              Complete Profile
            </h1>
            <p className="text-base-content/60 mt-2">Just a few more details to get you started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="relative group">
                <div className="size-32 rounded-3xl overflow-hidden border-4 border-base-100 shadow-2xl bg-base-300">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-base-200 text-base-content/30">
                      <User className="size-12" />
                    </div>
                  )}
                </div>

                <label htmlFor="fileInput" className="absolute bottom-[-10px] right-[-10px] btn btn-circle btn-primary shadow-lg border-2 border-base-100 cursor-pointer hover:scale-110 transition-transform">
                  <Camera className="size-5 text-white" />
                </label>
                <input id="fileInput" type="file" accept="image/*" onChange={handlePicture} className="hidden" />
              </div>
              <p className="text-xs text-base-content/50">Supported formats: JPG, PNG, GIF</p>
            </div>

            <div className="space-y-5">
              {/* Full Name */}
              <div className="form-control">
                <label className="label pl-1 pt-0"><span className="label-text font-medium">Full Name</span></label>
                <div className="relative">
                  <User className="absolute top-1/2 -translate-y-1/2 left-3 size-5 text-base-content/40" />
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="input input-bordered w-full pl-10 h-12 rounded-xl focus:ring-2 focus:ring-primary/20" placeholder="Your Name" />
                </div>
              </div>

              {/* Bio */}
              <div className="form-control">
                <label className="label pl-1 pt-0"><span className="label-text font-medium">Bio</span></label>
                <div className="relative">
                  <MessageSquareText className="absolute top-4 left-3 size-5 text-base-content/40" />
                  <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="textarea textarea-bordered w-full pl-10 min-h-[100px] rounded-xl focus:ring-2 focus:ring-primary/20 text-base py-3 leading-relaxed" placeholder="Tell us about your language journey..." />
                </div>
              </div>

              {/* Languages Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label pl-1 pt-0"><span className="label-text font-medium">Native Language</span></label>
                  <div className="relative">
                    <Earth className="absolute top-1/2 -translate-y-1/2 left-3 size-5 text-base-content/40 pointer-events-none" />
                    <select value={formData.nativeLanguage} onChange={(e) => setFormData({ ...formData, nativeLanguage: e.target.value })} className="select select-bordered w-full pl-10 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 bg-base-100">
                      <option value="">Select Native</option>
                      {LANGUAGES.map((lang) => <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label pl-1 pt-0"><span className="label-text font-medium">Learning Language</span></label>
                  <div className="relative">
                    <BookOpen className="absolute top-1/2 -translate-y-1/2 left-3 size-5 text-base-content/40 pointer-events-none" />
                    <select value={formData.learningLanguage} onChange={(e) => setFormData({ ...formData, learningLanguage: e.target.value })} className="select select-bordered w-full pl-10 h-12 rounded-xl focus:ring-2 focus:ring-primary/20 bg-base-100">
                      <option value="">Select Learning</option>
                      {LANGUAGES.map((lang) => <option key={`learn-${lang}`} value={lang.toLowerCase()}>{lang}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label pl-1 pt-0"><span className="label-text font-medium">Location</span></label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 -translate-y-1/2 left-3 size-5 text-base-content/40" />
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="input input-bordered w-full pl-10 h-12 rounded-xl focus:ring-2 focus:ring-primary/20" placeholder="City, Country" />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all disabled:bg-primary/80 disabled:text-primary-content disabled:cursor-not-allowed"
              disabled={isPending}
            >
              <div className="flex items-center justify-center gap-2">
                {isPending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span>Setting up...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <Sparkles className="size-5" />
                  </>
                )}
              </div>
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;
