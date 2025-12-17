import { useEffect, useState } from "react";
import { EarthIcon, Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";
import useAuthUser from "../hooks/useAuthUser";
import { useSocketStore } from "../store/useSocketStore";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { mutate, isPending } = useSignUp();
  const { authUser } = useAuthUser();
  const { connectSocket } = useSocketStore();

  const handleSignup = (e) => {
    e.preventDefault();
    mutate(signupData);
  };

  useEffect(() => {
    if (authUser?._id) {
      connectSocket(authUser);
    }
  }, [authUser?._id]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden bg-base-200">
       {/* Background Decor - Global */}
       <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />
       </div>

      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-10 z-10 w-full h-full my-auto">
        <div className="w-full max-w-md space-y-4 lg:space-y-6">
          {/* Logo */}
          <div className="text-center mb-2 lg:mb-4">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary font-bold" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60 text-sm">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-3">
               {/* Full Name Input */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-medium text-xs">Full Name</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="size-4 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full pl-9 h-10 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="John Doe"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-medium text-xs">Email</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="size-4 text-base-content/40" />
                    </div>
                    <input
                      type="email"
                      className={`input input-bordered w-full pl-9 h-10 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="you@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text font-medium text-xs">Password</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="size-4 text-base-content/40" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`input input-bordered w-full pl-9 h-10 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4 text-base-content/40 cursor-pointer hover:text-primary transition-colors" />
                      ) : (
                        <Eye className="size-4 text-base-content/40 cursor-pointer hover:text-primary transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
            </div>

             {/* Terms Checkbox - Visual only for now */}
             <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded" required/>
                <span className="text-xs text-base-content/70">
                     I agree to the <Link to="/terms" className="text-primary hover:underline">Terms</Link> & <Link to="/privacy" className="text-primary hover:underline">Privacy</Link>
                </span>
             </div>

            <button type="submit" className="btn btn-primary w-full h-10 min-h-0 text-sm font-medium rounded-lg shadow-md hover:shadow-primary/40 transition-all mt-4" disabled={isPending}>
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs text-white"></span>
                  Please wait...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:flex items-center justify-center bg-base-100 relative overflow-hidden">
         {/* Pattern Background */} 
         <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>
         
         <div className="relative z-10 max-w-lg text-center p-8">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
             >
                 {/* Glow Effect behind image */}
                 <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
                 <img src="/signup.png" alt="Community" className="relative z-10 w-full drop-shadow-2xl rounded-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500" />
             </motion.div>
             
             <h2 className="text-3xl font-bold mt-10 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                 Join the Global Community
             </h2>
             <p className="text-lg text-base-content/70">
                 Connect with friends, share moments, and discover new perspectives from around the world.
             </p>
         </div>
      </div>
    </div>
  );
};
export default SignUpPage;
