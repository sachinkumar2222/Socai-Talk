import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import toast from "react-hot-toast";
import { useSocketStore } from "../store/useSocketStore";

const useLogIn = () => {
  const queryClient = useQueryClient();
  const { connectSocket } = useSocketStore();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      const data = await queryClient.fetchQuery({
        queryKey: ["authUser"],
      });
      connectSocket(data.user);
      toast.success("Login successful.");
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return { mutate, isPending };
};

export default useLogIn;
