import { useState } from "react";
import { EarthIcon } from "lucide-react";
import useForgotPass from "../hooks/useForgotPass";

const ForgotPasswordPage = () => {
  const [email,setEmail] = useState("")

  const {mutate,isPending} = useForgotPass();

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(email);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 w-full max-w-md p-8 bg-base-100 rounded-xl shadow-lg">
        <div className="mb-6 flex items-center gap-2">
          <EarthIcon className="size-8 text-primary" />
          <span className="text-2xl font-bold font-mono text-primary">
            SocialTalk
          </span>
        </div>

        <h2 className="text-xl font-semibold mb-2">Forgot your password?</h2>
        <p className="text-sm opacity-70 mb-4">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="your@email.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary w-full" type="submit">
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
