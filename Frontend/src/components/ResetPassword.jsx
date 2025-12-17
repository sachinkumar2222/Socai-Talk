import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useResetPass from "../hooks/useResetPass.jsx"
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useResetPass();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    mutate({ token, password }, {
      onSuccess: () => {
        // Optional: redirect to login after a delay handled by hook or user interaction
        // Assuming hook handles basic success toast
        setTimeout(() => navigate('/login'), 2000);
      }
    })
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-base-200 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md p-8 bg-base-100/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-xl bg-primary/10 mb-4 group hover:bg-primary/20 transition-colors">
            <KeyRound className="size-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Set New Password
          </h2>
          <p className="text-base-content/60 mt-2 text-sm">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="form-control">
            <label className="label pl-1 pt-0">
              <span className="label-text font-medium text-xs">New Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-4 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full pl-9 pr-10 h-11 rounded-xl bg-base-50/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-4 text-base-content/40 hover:text-primary transition-colors" />
                ) : (
                  <Eye className="size-4 text-base-content/40 hover:text-primary transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label pl-1 pt-0">
              <span className="label-text font-medium text-xs">Confirm Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-4 text-base-content/40" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input input-bordered w-full pl-9 pr-10 h-11 rounded-xl bg-base-50/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4 text-base-content/40 hover:text-primary transition-colors" />
                ) : (
                  <Eye className="size-4 text-base-content/40 hover:text-primary transition-colors" />
                )}
              </button>
            </div>
          </div>

          {/* Password Strength Visual - Simple */}
          <div className="flex gap-1 h-1 mt-2">
            <div className={`flex-1 rounded-full bg-base-300 transition-colors ${password.length > 0 ? (password.length < 6 ? 'bg-error' : 'bg-primary') : ''}`}></div>
            <div className={`flex-1 rounded-full bg-base-300 transition-colors ${password.length >= 8 ? 'bg-primary' : ''}`}></div>
            <div className={`flex-1 rounded-full bg-base-300 transition-colors ${password.length >= 10 ? 'bg-primary' : ''}`}></div>
          </div>
          <p className="text-xs text-base-content/50 text-right">
            {password.length < 6 ? 'At least 6 characters' : 'Strong enough!'}
          </p>


          <button
            className="btn btn-primary w-full h-11 rounded-xl shadow-lg hover:shadow-primary/30 transition-all text-base font-medium mt-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
