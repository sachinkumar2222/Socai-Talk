import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/verify-email");
      toast.success("Signup successful! Please verify your email.")
    },
    onError: () => {
      toast.error(error.response.data.message);
    },
  });

  return { mutate, isPending };
};

export default useSignUp;