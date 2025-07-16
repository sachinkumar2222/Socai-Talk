import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPass } from "../lib/api";
import toast from "react-hot-toast";

const useForgotPass = () => {

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPass,
    onSuccess: () => {
      toast.success("Reset link sent! Check your email.")
    },
    onError: (error) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  return {mutate,isPending};
};

export default useForgotPass;