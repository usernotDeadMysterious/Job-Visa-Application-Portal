import React, { useEffect, useState, type FormEvent } from "react";
// import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell, User, LogOut, Settings, Bookmark } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleSuccess } from "@/utils/utils";

type User = {
  name?: string;
  email?: string;
  initials?: string;
};

type Props = {
  logo?: React.ReactNode;
  onSearch?: (query: string) => void;
  user?: User | null;
};

const UserNavbar: React.FC<Props> = ({ logo, onSearch, user = null }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // lock body scroll when drawer open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close on Esc
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    if (onSearch) onSearch(query);
  }
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToDashboard = () => {
    if (location.pathname === "/user-dashboard") {
      alert("You already on dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    localStorage.removeItem("payment_status");

    setTimeout(() => {
      handleSuccess("Logged Out! Take Care");
      navigate("/new-login");
    }, 1000);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) return;

    try {
      const parsedUser = JSON.parse(storedUser);

      setLoggedInUser({
        name: parsedUser.name,
        email: parsedUser.email,
        initials: parsedUser.name
          ?.split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase(),
      });
    } catch {
      // ❗ stored value is NOT JSON (like "Aizaz Khalid")
      setLoggedInUser({
        name: storedUser,
        initials: storedUser
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      });
    }
  }, []);

  return (
    <nav className="w-full border-b bg-linear-to-br from-indigo-500/30 via-purple-500/2 to-pink-500/3 p[1px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* left: hamburger + logo */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-2">
                {logo ?? (
                  <div className="w-8 h-8 bg-linear-to-br from-sky-500 to-indigo-600 rounded-md shadow" />
                )}
                <span className="hidden sm:inline-block font-bold">
                  Internal Portal
                </span>
              </a>

              {/* Primary nav - shown on md+ */}
              <div className="hidden md:flex items-center ml-6 space-x-1">
                <a
                  href="/applications"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Home
                </a>
              </div>
            </div>
          </div>

          <button
            aria-label="Notifications"
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* right actions */}
          <div className="flex items-center gap-2">
            {/* Saved Jobs Button  */}
            <button
              aria-label="Bookmarks"
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            {/* Notifications button  */}
            <button
              aria-label="Notifications"
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <Bell className="w-5 h-5" />
            </button>
            {/* profile icon / dashboard  */}
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center gap-2 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none">
                    <Avatar>
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/3 p[1px] flex items-center justify-center">
                        {user?.initials ?? "G"}
                      </div>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                {/* <DropdownMenuContent
                  align="end"
                  sideOffset={4}
                  className="w-48 bg-white"
                >
                  <div className="px-3 py-2">
                    <div className="text-sm font-medium">
                      {user?.name ?? "Guest User"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {user?.email ?? "guest@portal.com"}
                    </div>
                  </div>
                  <DropdownMenuItem
                    className="hover:bg-slate-100"
                    onClick={navigateToDashboard}
                  >
                    <User className="w-4 h-4 mr-2 hover:bg-slate-100" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-100">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-100">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent> */}
                <DropdownMenuContent
                  align="end"
                  className="w-48  bg-linear-to-t from-indigo-500/70 via-purple-500/70 to-gray-500/70"
                >
                  <div className="px-3 py-2 hover:bg-slate-500/20 hover:border hover:rounded-lg hover:cursor-pointer">
                    <div className="text-sm text-slate-200 font-medium">
                      {loggedInUser?.name ?? "Guest User"}
                    </div>
                  </div>

                  <DropdownMenuItem
                    className="hover:bg-slate-500/20 hover:border hover:cursor-pointer "
                    onClick={() => navigate("/new-home")}
                  >
                    <User className="mr-2 h-4 w-4 " />
                    Home
                  </DropdownMenuItem>

                  <DropdownMenuItem className="hover:bg-slate-500/20 hover:border hover:cursor-pointer ">
                    <Settings className="mr-2 h-4 w-4 hover:bg-amber-100" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="hover:bg-slate-500/20 hover:border hover:cursor-pointer "
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4 " />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <style>{`nav { position: sticky; top: 0; z-index: 40; }`}</style>
    </nav>
  );
};

export default UserNavbar;
