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

  const { data: outgoingFriendReqs = [] } = useQuery({
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
  if (!Array.isArray(outgoingFriendReqs)) return;

  const ids = new Set(outgoingFriendReqs.map((req) => req.receiver._id));
  setOutgoingRequestsIds(ids);
}, [outgoingFriendReqs]);



  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
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
        </section>
      </div>
    </div>
  );
};

export default HomePage;
