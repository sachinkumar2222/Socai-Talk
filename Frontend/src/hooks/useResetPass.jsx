import { useMutation} from "@tanstack/react-query";
import { resetPassword } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const useResetPass = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password Reset successful.")
      navigate("/login")
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return {mutate,isPending};
};

export default useResetPass;
