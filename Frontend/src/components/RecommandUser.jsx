import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
} from "lucide-react";
import { getLanguageFlag, capitialize } from "../lib/utils.jsx";

const RecommandUser = ({
  recommendedUsers,
  outgoingRequestsIds,
  mutate,
  isPending,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendedUsers.map((user) => {
        const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

        return (
          <div
            key={user._id}
            className="group relative rounded-3xl bg-base-100/40 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
          >
            {/* Decorative Gradient Blob */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-colors"></div>

            <div className="p-6 flex flex-col h-full relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="size-16 rounded-2xl overflow-hidden border-2 border-base-100 shadow-md group-hover:border-primary/50 transition-colors">
                    <img
                      src={user.profilePic}
                      alt={user.fullName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                    {user.fullName}
                  </h3>
                  {user.location && (
                    <div className="flex items-center text-xs font-medium text-base-content/60 mt-1">
                      <MapPinIcon className="size-3 mr-1 text-primary" />
                      {user.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge border-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-500 font-bold px-3 py-3 h-auto">
                  <span className="mr-1 text-lg">{getLanguageFlag(user.nativeLanguage)}</span>
                  <span className="text-xs">Native: {capitialize(user.nativeLanguage)}</span>
                </span>
                <span className="badge border-0 bg-base-200/50 text-base-content/80 font-medium px-3 py-3 h-auto">
                  <span className="mr-1 text-lg">{getLanguageFlag(user.learningLanguage)}</span>
                  <span className="text-xs">Learning: {capitialize(user.learningLanguage)}</span>
                </span>
              </div>

              <div className="flex-1">
                {user.bio ? (
                  <p className="text-sm text-base-content/70 leading-relaxed line-clamp-2 mb-4">
                    {user.bio}
                  </p>
                ) : (
                  <p className="text-sm text-base-content/40 italic mb-4">
                    No bio provided
                  </p>
                )}
              </div>

              <button
                className={`btn btn-block border-none shadow-md transition-all duration-300 ${hasRequestBeenSent
                    ? "bg-base-300 text-base-content/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                  }`}
                onClick={() => mutate(user._id)}
                disabled={hasRequestBeenSent || isPending}
              >
                {hasRequestBeenSent ? (
                  <>
                    <CheckCircleIcon className="size-5 mr-1" />
                    Request Sent
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="size-5 mr-1" />
                    Connect
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommandUser;
