import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Bookmark, User, Settings, LogOut } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchPanel, { type JobSearchPayload } from "./SearchPanel";
import { handleSuccess } from "@/utils/utils";
import { useDocuments } from "../DashboardUser/hooks/useDocument";
import { useProfile } from "../DashboardUser/hooks/useProfile";

type User = {
  name?: string;
  email?: string;
  initials?: string;
};

type Props = {
  logo?: React.ReactNode;
  onSearch?: (payload: JobSearchPayload) => void;
};

const HomeNavbar: React.FC<Props> = ({ logo, onSearch }) => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
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
  const { documents } = useDocuments();
  const profileImage = documents.find((doc) => doc.type === "Profile Image");
  const { profile } = useProfile();
  return (
    <nav
      className="
        sticky top-0 z-40 w-full
        border-b border-white/10
        bg-linear-to-br from-indigo-500/30 via-purple-500/10 to-pink-500/30
        backdrop-blur
      "
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* ===== Left: Logo ===== */}
          <a href="/" className="flex items-center gap-2 font-bold">
            {logo ?? (
              <div className="h-8 w-8 rounded-md bg-linear-to-br from-sky-500 to-indigo-600 shadow" />
            )}
            <span className="hidden sm:block text-indigo-300">
              Internal Portal
            </span>
          </a>

          {/* ===== Center: Search ===== */}
          <div className="flex flex-1 max-w-lg px-2 items-center gap-3">
            {onSearch && <SearchPanel onSearch={onSearch} />}

            <a
              href={"/user-dashboard"}
              className=" rounded-lg px-2 py-1
           text-indigo-400 border
          text-sm font-medium
          hover:bg-indigo-700 hover:text-white
          transition"
            >
              Dashboard
            </a>
          </div>

          {/* ===== Right: Actions ===== */}
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Bookmarks">
              <Bookmark className="text-indigo-300 h-5 w-5" />
            </IconButton>

            <IconButton label="Notifications">
              <Bell className="text-indigo-300 h-5 w-5" />
            </IconButton>

            {/* ===== User Menu ===== */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-md p-1 hover:bg-white/10">
                  <Avatar className="h-8 w-8">
                    {profileImage && profile ? (
                      <div className="">
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${
                            profileImage.filePath
                          }`}
                          alt={profile.fullName}
                          className=""
                        />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-linear-to-t from-indigo-500/30 via-purple-500/20 to-gray-500/30 flex items-center justify-center text-sm font-medium">
                        {loggedInUser?.initials ?? "G"}
                      </div>
                    )}
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

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
                  onClick={() => navigate("/user-dashboard?overview=")}
                >
                  <User className="mr-2 h-4 w-4 " />
                  Dashboard
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
    </nav>
  );
};

export default HomeNavbar;

/* ===== Small Helper ===== */
function IconButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      className="rounded-md p-2 hover:bg-white/10 focus:outline-none"
    >
      {children}
    </button>
  );
}
