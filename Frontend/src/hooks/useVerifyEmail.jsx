import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyEmail } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/onboarding");
      toast.success("verification successful");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Verification failed");
    },
  });

  return { mutate, isPending };
};

export default useVerifyEmail;
