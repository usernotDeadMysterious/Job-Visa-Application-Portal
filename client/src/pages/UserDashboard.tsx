import React, { useEffect, useState } from "react";
import { Bell, Bookmark, Menu, User, Settings, LogOut } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Overview from "@/components/DashboardUser/Overview";
import UserDetailsCard from "@/components/DashboardUser/UserDetails";
import { EducationDetailsCard } from "@/components/DashboardUser/EducationDetails";
import UserDocuments from "@/components/DashboardUser/UserDocuments";
import JobApplication from "@/components/DashboardUser/JobApplication";

import { useNavigate, useSearchParams } from "react-router-dom";

import { Visa } from "@/components/DashboardUser/Visa";
import { handleSuccess } from "@/utils/utils";
import AppliedVisa from "@/components/DashboardUser/AppliedVisa";
import { useDocuments } from "@/components/DashboardUser/hooks/useDocument";
import { useProfile } from "@/components/DashboardUser/hooks/useProfile";
type TabKey =
  | "overview"
  | "personal"
  | "education"
  | "additional"
  | "job"
  | "visa"
  | "appliedvisa"
  | "support";

type User = {
  name?: string;
  email?: string;
  initials?: string;
};
export default function UserDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const TAB_QUERY_MAP: Record<TabKey, string> = {
    overview: "overview",
    personal: "personal-details",
    education: "education",
    additional: "documents",
    job: "jobs",
    visa: "visa",
    appliedvisa: "applied-visa",
    support: "support",
  };

  const QUERY_TAB_MAP: Record<string, TabKey> = {
    overview: "overview",
    "personal-details": "personal",
    education: "education",
    documents: "additional",
    jobs: "job",
    visa: "visa",
    "applied-visa": "appliedvisa",
    support: "support",
  };

  const queryKey = [...searchParams.keys()][0];
  const activeTab: TabKey = QUERY_TAB_MAP[queryKey] ?? "overview";

  const setActiveTab = (tabKey: TabKey) => {
    setSearchParams({ [TAB_QUERY_MAP[tabKey]]: "" });
  };

  const navItems: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "personal", label: "Personal Details" },
    { key: "education", label: "Education Details" },
    { key: "additional", label: "Additional Documents" },
    { key: "visa", label: "Visa" },
    { key: "job", label: "Applied Jobs" },
    { key: "appliedvisa", label: "Applied VISAs" },
    { key: "support", label: "Support" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "personal":
        return <UserDetailsCard />;
      case "education":
        return <EducationDetailsCard />;

      case "additional":
        return <UserDocuments />;
      case "visa":
        return <Visa />;
      case "appliedvisa":
        return <AppliedVisa />;
      case "job":
        return <JobApplication />;

      case "support":
        return <div className="text-center">Help & Support</div>;
      default:
        return <Overview />;
    }
  };

  const Navigate = useNavigate();

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
      //  stored value is NOT JSON (like "Aizaz Khalid")
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
      Navigate("/new-login");
    }, 1000);
  };
  const { documents } = useDocuments();
  const profileImage = documents.find((doc) => doc.type === "Profile Image");
  const { profile } = useProfile();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* ===== Top Navbar ===== */}
      <header
        className="
          sticky top-0 z-40 h-14
          border-b border-white/10
          bg-linear-to-br from-indigo-500/30 via-purple-500/10 to-pink-500/30
          backdrop-blur
          px-4 flex items-center justify-between
        "
      >
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          {/* Mobile Sidebar */}
          <SheetContent
            side="left"
            className="
              pt-22 w-64 
              bg-linear-to-br from-indigo-500/90 via-purple-500/80 to-pink-500/90
            "
          >
            <SidebarTabs
              navItems={navItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div>
          <a
            href="/"
            className="flex items-center gap-2 font-bold hover:cursor-pointer"
          >
            <div className="h-8 w-8 rounded-md bg-linear-to-br from-sky-500 to-indigo-600" />
            <span className="hidden sm:block">Internal Portal</span>
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <IconButton icon={<Bookmark className="h-5 w-5" />} />
          <IconButton icon={<Bell className="h-5 w-5" />} />

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
              <div className="px-3 py-2 ">
                <div className="text-sm text-slate-200 font-medium">
                  {loggedInUser?.name ?? "Guest User"}
                </div>
              </div>

              <DropdownMenuItem
                className="hover:bg-slate-500/20 hover:border hover:cursor-pointer "
                onClick={() => Navigate("/new-home")}
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
      </header>

      {/* ===== Desktop Tabs ===== */}
      <div className="hidden lg:block px-4 pt-6">
        <div className="grid grid-cols-7 gap-2">
          {navItems.map((item) => (
            <TabButton
              key={item.key}
              active={activeTab === item.key}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </TabButton>
          ))}
        </div>
      </div>

      {/* ===== Content ===== */}
      <main className="p-4 md:p-6">{renderContent()}</main>
    </div>
  );
}

/* ===== Sidebar Tabs ===== */
function SidebarTabs({
  navItems,
  activeTab,
  setActiveTab,
}: {
  navItems: { key: TabKey; label: string }[];
  activeTab: TabKey;
  setActiveTab: (key: TabKey) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => setActiveTab(item.key)}
          className={`rounded-md px-3 py-2 text-sm text-left transition
            ${
              activeTab === item.key
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/10"
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

/* ===== UI Helpers ===== */
function IconButton({ icon }: { icon: React.ReactNode }) {
  return <button className="rounded-md p-2 hover:bg-white/10">{icon}</button>;
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-xs font-medium transition
        ${
          active
            ? "bg-linear-to-br from-blue-800/70 via-green-500/15 to-red-500/70 shadow"
            : "border border-white/10 hover:bg-white/5"
        }`}
    >
      {children}
    </button>
  );
}
