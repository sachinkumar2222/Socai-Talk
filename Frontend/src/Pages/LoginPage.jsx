import { useState } from "react";
import { EarthIcon, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link } from "react-router"; // Fixed import for react-router
import useLogIn from "../hooks/useLogIn";
import { motion } from "framer-motion";

const LogInPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* left */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <EarthIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-t from-primary to-secondary tracking-wider">
              SocialTalk
            </span>
          </div>

          <div className="w-full">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome Back</h2>
                <p className="text-sm opacity-70">
                  Sign in to your account to continue your language journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label pl-1">
                      <span className="label-text font-medium">Email Address</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        className="input w-full pl-10 glass-input rounded-xl transition-all"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({ ...loginData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label pl-1 flex justify-between">
                      <span className="label-text font-medium">Password</span>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-primary hover:text-primary-focus transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="size-5 text-base-content/40" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="input w-full pl-10 pr-10 glass-input rounded-xl transition-all"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({ ...loginData, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-5 text-base-content/40 hover:text-primary transition-colors" />
                        ) : (
                          <Eye className="size-5 text-base-content/40 hover:text-primary transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full rounded-xl text-lg font-medium shadow-lg hover:shadow-primary/20 transition-all"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center mt-6">
                  <p className="text-sm text-base-content/60">
                    New to SocialTalk?{" "}
                    <Link to="/signup" className="text-primary font-medium hover:underline">
                      Create an account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Visual */}
        <div className="hidden lg:flex w-1/2 p-12 items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 relative">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center space-y-6 relative z-10 max-w-md bg-base-100/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10"
          >
            <div className="relative aspect-square w-full max-w-[280px] mx-auto mb-6">
              {/* Use a better image or the existing one with better styling */}
              <img
                src="/signup.png"
                alt="Community"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70">
              Connect Globally
            </h3>
            <p className="text-lg text-white/70 leading-relaxed">
              Experience seamless video calls and chats with friends from every corner of the world.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
