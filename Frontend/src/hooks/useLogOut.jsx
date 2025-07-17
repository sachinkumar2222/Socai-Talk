import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../lib/api';
import toast from "react-hot-toast";
import { useSocketStore } from '../store/useSocketStore';
import { useNavigate } from 'react-router';


const useLogOut = () => {
    const queryClient = useQueryClient();
    const {disconnectSocket} = useSocketStore();
     const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationFn: logout,
        onSuccess : () =>{
            queryClient.invalidateQueries({queryKey: ["authUser"]});
            navigate("/login");
            toast.success("logout successful")
            disconnectSocket();
        } 
    })

    return {mutate}
}

export default useLogOut;
