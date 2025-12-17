import { BellIcon } from "lucide-react";

const NoNotificationsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center min-h-[50vh]">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
        <div className="size-24 rounded-3xl bg-base-100/50 backdrop-blur-xl border border-white/10 flex items-center justify-center relative shadow-xl ring-4 ring-base-100/20">
          <BellIcon className="size-10 text-primary animate-bounce-slow" />
          <div className="absolute -top-2 -right-2 size-6 bg-secondary rounded-full border-4 border-base-100 animate-bounce delay-75"></div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/50">
        All Caught Up!
      </h3>
      <p className="text-base-content/60 max-w-sm text-lg leading-relaxed">
        No new notifications at the moment. <br />
        We'll verify you when something important happens.
      </p>
    </div>
  );
};

export default NoNotificationsFound;
