import { useState } from "react";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import useForgotPass from "../hooks/useForgotPass";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgotPass();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(email, {
      onSuccess: () => setIsSubmitted(true)
    });
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-base-200 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md p-8 bg-base-100/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-xl bg-primary/10 mb-4 group hover:bg-primary/20 transition-colors">
            <MessageSquare className="size-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Forgot Password?
          </h2>
          <p className="text-base-content/60 mt-2 text-sm">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label pl-1 pt-0">
                <span className="label-text font-medium text-xs">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-4 text-base-content/40" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-9 h-11 rounded-xl bg-base-50/50 focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="btn btn-primary w-full h-11 rounded-xl shadow-lg hover:shadow-primary/30 transition-all text-base font-medium"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="p-4 bg-success/10 text-success rounded-xl border border-success/20">
              <p className="font-medium">Check your inbox!</p>
              <p className="text-sm mt-1 opacity-80">We have sent a password reset link to <span className="font-bold">{email}</span>.</p>
            </div>

            <p className="text-xs text-base-content/50">
              Did not receive the email? Check your spam folder or <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline">try again</button>.
            </p>
          </motion.div>
        )}

        <div className="mt-8 text-center border-t border-base-content/10 pt-4">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors">
            <ArrowLeft className="size-4" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
