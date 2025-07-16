import { useState } from "react";
import { EarthIcon } from "lucide-react";
import useVerifyEmail from "../hooks/useVerifyEmail";
import useResendCode from "../hooks/useResendCode"

const EmailVerification = () => {
  const [code, setcode] = useState({
    code : ""
  });

  const { mutate, isPending } = useVerifyEmail();
  const { mutate: resendCode, isPending: isResending } = useResendCode();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(code);
  };

  const handleResend = () => {
    resendCode();
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-4xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left */}
        <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
          <div className="mb-4 flex items-center justify-start gap-2">
            <EarthIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-t from-primary to-secondary tracking-wider">
              SocialTalk
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <div>
              <h2 className="text-xl font-semibold">Verify your email</h2>
              <p className="text-sm opacity-70 mt-1">
                Enter the 6-digit code sent to your email.
              </p>
            </div>

            <div className="w-full form-control">
              <label className="label">
                <span className="label-text">6-digit code</span>
              </label>
              <input
                type="text"
                maxLength="6"
                placeholder="123456"
                className="input input-bordered text-center tracking-widest text-lg"
                value={code.code}
                onChange={(e) => setcode({code:e.target.value})}
              />
            </div>

            <button className="btn btn-primary w-full" type="submit">
              {isPending || isResending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>

            <div className="text-sm text-center mt-2">
              Didn’t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:underline"
              >
                Resend Code
              </button>
            </div>
          </form>
        </div>

        {/* Right */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/verify.svg"
                alt="Verify Email"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Secure your account</h2>
              <p className="opacity-70">
                We’ve sent a verification code to your email. Enter it to
                complete your signup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
