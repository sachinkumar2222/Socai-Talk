import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FriendsSidebar from "./FriendsSidebar";
import BottomNav from "./BottomNav";
import { useSocketStore } from "../store/useSocketStore";
import useAuthUser from "../hooks/useAuthUser";

import { useLocation } from "react-router";
import Footer from "./Footer";
import { useEffect } from "react";

const Layout = ({ children, showSidebar = false, showNavbar = true }) => {
  const location = useLocation();
  const { authUser } = useAuthUser();
  const { connectSocket } = useSocketStore();

  const isFriendsPage = location.pathname === "/friends";

  useEffect(() => {
    if (authUser) {
      connectSocket(authUser);
    }
  }, [authUser]);


  return (
    <div className="min-h-screen bg-base-100">
      <div className="flex">
        {showSidebar && (
          isFriendsPage ? <FriendsSidebar /> : <Sidebar />
        )}
        <div className="flex flex-1 flex-col pb-16 lg:pb-0">
          {showNavbar && <Navbar />}
          <main className="flex-1 flex-grow overflow-y-auto">{children}</main>
          {isFriendsPage ? "" : <Footer />}
        </div>
      </div>
      {/* Show BottomNav only if Navbar is shown (authenticated pages) */}
      {showNavbar && <BottomNav />}
    </div>
  );
};

export default Layout;
