import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommUser,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { UsersIcon } from "lucide-react";
import NoUserFound from "../components/NoUserFound";
import RecommandUser from "../components/RecommandUser";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: recommUser = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["user"],
    queryFn: getRecommUser,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onMutate: async (userId) => {
      setOutgoingRequestsIds((prev) => new Set(prev).add(userId));
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    if (!outgoingFriendReqs) return;

    const ids = new Set(outgoingFriendReqs.map((req) => req.receiver._id));
    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-base-200/50">
      <div className="container mx-auto space-y-12 max-w-6xl">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 glass-panel p-6 rounded-2xl bg-base-100/40">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Your Dashboard
            </h1>
            <p className="text-base-content/60 mt-1">Manage friends and requests.</p>
          </div>
          <Link to="/notifications" className="btn btn-primary rounded-xl shadow-lg shadow-primary/20">
            <UsersIcon className="mr-2 size-5" />
            Friend Requests
          </Link>
        </div>

        {/* Suggestions Section */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-8 bg-primary rounded-full"></span>
              Meet New Learners
            </h2>
            <p className="opacity-70 mt-2 text-lg lg:max-w-2xl ml-4">
              Discover perfect language exchange partners based on your profile and interests.
            </p>
          </div>

          <div className="bg-base-100/30 backdrop-blur-sm rounded-3xl p-6 border border-base-content/5 min-h-[400px]">
            {loadingUsers ? (
              <div className="flex justify-center py-24">
                <span className="loading loading-spinner text-primary loading-lg" />
              </div>
            ) : recommUser.length === 0 ? (
              <NoUserFound />
            ) : (
              <RecommandUser
                recommendedUsers={recommUser}
                outgoingRequestsIds={outgoingRequestsIds}
                mutate={mutate}
                isPending={isPending}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
