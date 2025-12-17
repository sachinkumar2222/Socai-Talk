import { Bell, MessageSquare, User, Home } from "lucide-react";
import { Link, useLocation } from "react-router";

const BottomNav = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-base-100 border-t border-base-300 lg:hidden">
            <div className="grid h-full grid-cols-4 mx-auto font-medium">
                <Link
                    to="/"
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-base-200 group ${isActive("/") ? "text-primary" : "text-zinc-500"
                        }`}
                >
                    <Home className={`w-6 h-6 mb-1 ${isActive("/") ? "fill-current" : ""}`} />
                    <span className="text-xs">Home</span>
                </Link>

                <Link
                    to="/friends"
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-base-200 group ${isActive("/friends") ? "text-primary" : "text-zinc-500"
                        }`}
                >
                    <MessageSquare className={`w-6 h-6 mb-1 ${isActive("/friends") ? "fill-current" : ""}`} />
                    <span className="text-xs">Chat</span>
                </Link>

                <Link
                    to="/notifications"
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-base-200 group ${isActive("/notifications") ? "text-primary" : "text-zinc-500"
                        }`}
                >
                    <Bell className={`w-6 h-6 mb-1 ${isActive("/notifications") ? "fill-current" : ""}`} />
                    <span className="text-xs">Updates</span>
                </Link>
                <Link
                    to="/update-profile"
                    className={`inline-flex flex-col items-center justify-center px-5 hover:bg-base-200 group ${isActive("/update-profile") ? "text-primary" : "text-zinc-500"
                        }`}
                >
                    <User className={`w-6 h-6 mb-1 ${isActive("/update-profile") ? "fill-current" : ""}`} />
                    <span className="text-xs">Profile</span>
                </Link>
            </div>
        </div>
    );
};

export default BottomNav;
