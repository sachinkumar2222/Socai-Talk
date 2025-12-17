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
    <div className="min-h-screen bg-base-200/50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary inline-block mb-3">
            Notifications
          </h1>
          <p className="text-base-content/60 text-lg">
            Stay updated with your latest interactions
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner text-primary loading-lg"></span>
          </div>
        ) : (
          <div className="space-y-8 min-h-[500px]">

            <AnimatePresence mode="popLayout">
              {incomingRequests.length > 0 || acceptedRequests.length > 0 ? (
                <>
                  {/* Friend Requests */}
                  {incomingRequests.length > 0 && (
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-xl">
                          <UserCheckIcon className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Friend Requests</h2>
                        <span className="badge badge-primary badge-lg">{incomingRequests.length}</span>
                      </div>

                      <div className="grid gap-4">
                        {incomingRequests.map((req) => (
                          <motion.div
                            key={req._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-base-100/40 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-lg flex flex-col sm:flex-row items-center gap-5 transition-all hover:border-primary/20 hover:shadow-primary/5 group"
                          >
                            <div className="relative">
                              <img
                                src={req.sender.profilePic}
                                alt={req.sender.fullName}
                                className="size-16 rounded-2xl object-cover border-2 border-base-100 shadow-sm"
                              />
                              <div className="absolute -bottom-2 -right-2 bg-base-100 p-1 rounded-full">
                                <div className="size-3 bg-primary rounded-full animate-pulse"></div>
                              </div>
                            </div>

                            <div className="flex-1 text-center sm:text-left space-y-2">
                              <h3 className="font-bold text-lg">{req.sender.fullName}</h3>
                              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                <span className="badge badge-neutral badge-sm gap-1 pl-1 pr-2 py-3 bg-base-300/50 border-0">
                                  <span className="size-1.5 rounded-full bg-secondary"></span>
                                  Native: {req.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-neutral badge-sm gap-1 pl-1 pr-2 py-3 bg-base-300/50 border-0">
                                  <span className="size-1.5 rounded-full bg-accent"></span>
                                  Learning: {req.sender.learningLanguage}
                                </span>
                              </div>
                            </div>

                            <button
                              className="btn btn-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform w-full sm:w-auto mt-2 sm:mt-0"
                              onClick={() => mutate(req._id)}
                              disabled={isPending}
                            >
                              {isPending ? <span className="loading loading-spinner loading-xs"></span> : "Accept Request"}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Accepted Requests */}
                  {acceptedRequests.length > 0 && (
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4 mt-8">
                        <div className="p-2 bg-success/10 rounded-xl">
                          <BellIcon className="h-6 w-6 text-success" />
                        </div>
                        <h2 className="text-xl font-bold">New Connections</h2>
                      </div>

                      <div className="grid gap-3">
                        {acceptedRequests.map((noti) => (
                          <motion.div
                            key={noti._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-base-100/30 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:bg-base-100/50 transition-colors flex items-center gap-4 group"
                          >
                            <div className="relative">
                              <img
                                src={noti.receiver.profilePic}
                                alt={noti.receiver.fullName}
                                className="size-12 rounded-full object-cover ring-2 ring-base-100 group-hover:ring-success transition-all"
                              />
                              <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-0.5 border-2 border-base-100">
                                <UserCheckIcon className="size-3" />
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-base">
                                    {noti.receiver.fullName}
                                    <span className="font-normal text-base-content/70 ml-1">accepted your request</span>
                                  </h3>
                                  <p className="text-xs text-base-content/40 mt-1 flex items-center gap-1">
                                    <ClockIcon className="size-3" />
                                    Just now
                                  </p>
                                </div>
                                <div className="badge badge-success/20 text-success text-xs font-semibold border-0">
                                  Connected
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
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
