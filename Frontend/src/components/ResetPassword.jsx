import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useResetPass from "../hooks/useResetPass.jsx"


const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
 
  const {mutate,isPending} = useResetPass();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    mutate({token, password})
  };

  return (
    <div className="h-screen flex items-center justify-center" data-theme="forest">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-xl shadow-lg border border-primary/20">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full" type="submit">
            {isPending ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
