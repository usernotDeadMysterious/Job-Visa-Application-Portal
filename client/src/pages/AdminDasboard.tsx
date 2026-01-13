import React, { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Overview from "@/components/DashboardAdmin/Overview";

/* ===== Admin Pages (UI placeholders) ===== */

/* ===== Layout ===== */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const user = localStorage.getItem("loggedInUser");
  const user_role = localStorage.getItem("role");

  const navItems = [
    { key: "overview", label: "Overview" },
    { key: "users", label: "Users" },
    { key: "documents", label: "Documents" },
    { key: "visa", label: "Visa" },
    { key: "jobs", label: "Jobs" },
    { key: "support", label: "Support" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <div>UsersPage</div>;
      case "documents":
        return <div>DocumentsPage</div>;
      case "visa":
        return <div>VisaApplications</div>;
      case "jobs":
        return <div>JobApplications</div>;
      case "support":
        return <div>SupportTickets</div>;
      default:
        return <Overview />;
    }
  };

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
        {/* Mobile Hamburger */}
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
              w-64 p-4
              bg-linear-to-br from-indigo-500/80 via-purple-500/20 to-pink-500/60
            "
          >
            <Sidebar
              navItems={navItems}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </SheetContent>
        </Sheet>

        <div className="font-bold">
          {user_role} • {user}
        </div>
      </header>

      {/* ===== Desktop Tabs ===== */}
      <div className="hidden lg:block px-4 pt-6">
        <div className="grid grid-cols-6 gap-2">
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

/* ===== Sidebar ===== */
function Sidebar({ navItems, activeTab, setActiveTab }: any) {
  return (
    <div className="flex flex-col gap-1">
      {navItems.map((item: any) => (
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

/* ===== Desktop Tab Button ===== */
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
