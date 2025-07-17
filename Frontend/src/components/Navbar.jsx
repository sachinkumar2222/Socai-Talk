import useAuthUser from "../hooks/useAuthUser";
import useLogOut from "../hooks/useLogOut";
import { BellIcon, EarthIcon, LogOutIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { authUser } = useAuthUser();

  const { mutate } = useLogOut();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center w-full justify-between`}>
          <div className="pl-5 xs:pl-0">
            <Link to="/" className="flex items-center gap-2.5 lg:hidden">
              <EarthIcon className="size-9 xs:size-7 text-primary sm:size-5 md:size-7" />
              <span className="text-3xl xs:text-[16px] sm:text-xl md:text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                SocialTalk
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 xs:gap-0">

            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 xs:w-5 text-base-content opacity-70" />
              </button>
            </Link>

            <Link to="/friends" className="btn btn-ghost btn-circle lg:hidden">
              <UsersIcon className="h-6 w-6 xs:w-5 text-base-content opacity-70" />
            </Link>

            <ThemeSelector />

            <Link to="/update-profile">
              <div className="avatar mt-1.5 xs:ml-1.5">
                <div className="w-9 xs:w-7 rounded-full">
                  <img
                    src={authUser?.profilePic}
                    alt="User Avatar"
                    rel="noreferrer"
                  />
                </div>
              </div>
            </Link>

            <button className="btn btn-ghost btn-circle hidden lg:flex" onClick={mutate}>
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
