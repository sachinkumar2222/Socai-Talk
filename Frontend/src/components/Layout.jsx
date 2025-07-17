import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import FriendsSidebar from "./FriendsSidebar"; 
import { useSocketStore } from "../store/useSocketStore";
import useAuthUser from "../hooks/useAuthUser";

import { useLocation } from "react-router";
import Footer from "./Footer";
import { useEffect } from "react";

const Layout = ({ children, showSidebar = false }) => {
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
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
          { isFriendsPage ? "" : <Footer/> }
        </div>
      </div>
    </div>
  );
};

export default Layout;
