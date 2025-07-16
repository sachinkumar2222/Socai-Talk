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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendedUsers.map((user) => {
        const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

        return (
          <div
            key={user._id}
            className="rounded-2xl bg-base-200 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full overflow-hidden border border-base-300 shadow-sm">
                  <img
                    src={user.profilePic}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg text-base-content">
                    {user.fullName}
                  </h3>
                  {user.location && (
                    <div className="flex items-center text-xs text-base-content/70 mt-1">
                      <MapPinIcon className="size-3 mr-1" />
                      {user.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-secondary-content font-medium">
                  {getLanguageFlag(user.nativeLanguage)}
                  Native: {capitialize(user.nativeLanguage)}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-base-300 text-base-content/80 bg-base-100">
                  {getLanguageFlag(user.learningLanguage)}
                  Learning: {capitialize(user.learningLanguage)}
                </span>
              </div>

              {user.bio && (
                <p className="text-sm text-base-content/80 leading-relaxed line-clamp-3">
                  {user.bio}
                </p>
              )}

              <button
                className={`btn w-full mt-1 ${
                  hasRequestBeenSent
                    ? "btn-disabled bg-base-300 text-base-content/60"
                    : "btn-primary"
                }`}
                onClick={() => mutate(user._id)}
                disabled={hasRequestBeenSent || isPending}
              >
                {hasRequestBeenSent ? (
                  <>
                    <CheckCircleIcon className="size-4 mr-2" />
                    Request Sent
                  </>
                ) : (
                  <>
                    <UserPlusIcon className="size-4 mr-2" />
                    Send Friend Request
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
