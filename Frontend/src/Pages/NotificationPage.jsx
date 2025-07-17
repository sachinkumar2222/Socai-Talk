import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendReqs, getFriendReqs } from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { motion, AnimatePresence } from "framer-motion";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendReqs,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: acceptFriendReqs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 xs:h-[100vh]">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <AnimatePresence>
            {incomingRequests.length > 0 || acceptedRequests.length > 0 ? (
              <>
                {/* Friend Requests */}
                {incomingRequests.length > 0 && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <UserCheckIcon className="h-5 w-5 text-primary" />
                      Friend Requests
                      <span className="badge badge-primary ml-2">
                        {incomingRequests.length}
                      </span>
                    </h2>

                    <div className="space-y-3">
                      {incomingRequests.map((req) => (
                        <motion.div
                          key={req._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="card-body p-4">
                            <div className="flex items-center justify-between">
                              {/* Left: User Info */}
                              <div className="flex items-center gap-3">
                                <div className="avatar w-14 h-14 rounded-full bg-base-300 overflow-hidden">
                                  <img
                                    src={req.sender.profilePic}
                                    alt={req.sender.fullName}
                                    className="object-cover w-full h-full"
                                  />
                                </div>

                                <div>
                                  <h3 className="font-semibold">
                                    {req.sender.fullName}
                                  </h3>
                                  <div className="flex flex-wrap gap-1.5 mt-1 text-sm">
                                    <span className="badge badge-secondary badge-sm">
                                      Native: {req.sender.nativeLanguage}
                                    </span>
                                    <span className="badge badge-outline badge-sm">
                                      Learning: {req.sender.learningLanguage}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Accept Button */}
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => mutate(req._id)}
                                disabled={isPending}
                              >
                                {isPending ? "Accepting..." : "Accept"}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {acceptedRequests.length > 0 && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <BellIcon className="h-5 w-5 text-success" />
                      New Connections
                    </h2>

                    <div className="space-y-3">
                      {acceptedRequests.map((noti) => (
                        <motion.div
                          key={noti._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="card bg-base-200 shadow-sm"
                        >
                          <div className="card-body p-4">
                            <div className="flex items-start gap-3">
                              <div className="avatar mt-1 size-10 rounded-full overflow-hidden bg-base-300">
                                <img
                                  src={noti.receiver.profilePic}
                                  alt={noti.receiver.fullName}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">
                                  {noti.receiver.fullName}
                                </h3>
                                <p className="text-sm mt-0.5">
                                  {noti.receiver.fullName} accepted your friend
                                  request
                                </p>
                                <p className="text-xs flex items-center text-gray-500 mt-1">
                                  <ClockIcon className="h-3 w-3 mr-1" />
                                  Recently
                                </p>
                              </div>
                              <div className="badge badge-success text-xs">
                                <MessageSquareIcon className="h-3 w-3 mr-1" />
                                New Friend
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <NoNotificationsFound />
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
