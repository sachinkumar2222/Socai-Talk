import { useMutation } from "@tanstack/react-query";
import { resendVerificationCode } from "../lib/api";
import toast from "react-hot-toast";

const useResendCode = () => {
  return useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: () => toast.success("Code resent to your email"),
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Failed to resend code"),
  });
};

export default useResendCode;
