import { useState } from "react";
import {
  Menu,
  Users,
  FileCheck,
  LayoutDashboard,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/* ===== Super Admin Pages (UI placeholders) ===== */
function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard title="Total Users" value="1,248" />
      <StatCard title="Pending Documents" value="132" />
      <StatCard title="Verified Documents" value="3,421" />
    </div>
  );
}

function UserManagement() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">User Management</h2>

      {/* Filters */}
      <div className="flex flex-col gap-2 md:flex-row">
        <input
          placeholder="Search users..."
          className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm"
        />
        <select className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
        </select>
      </div>

      {/* Table placeholder */}
      <div className="rounded-lg border border-white/10 p-4 text-sm text-slate-300">
        User list table goes here
      </div>
    </div>
  );
}

function UserProfileViewer() {
  return (
    <div className="rounded-lg border border-white/10 p-4">
      <h2 className="font-semibold mb-2">User Profile</h2>
      <p className="text-sm text-slate-300">
        Full profile view with documents & applications
      </p>
    </div>
  );
}

function DocumentVerification() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Document Verification</h2>

      <div className="rounded-lg border border-white/10 p-4 text-sm">
        <p className="mb-2">📄 Passport.pdf</p>
        <div className="flex gap-2">
          <Button size="sm">Verify</Button>
          <Button size="sm" variant="outline">
            Request Resubmission
          </Button>
        </div>
      </div>
    </div>
  );
}

function VerificationLogs() {
  return (
    <div className="rounded-lg border border-white/10 p-4 text-sm text-slate-300">
      Verification logs with timestamps
    </div>
  );
}

/* ===== Layout ===== */
export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { key: "users", label: "Users", icon: <Users size={16} /> },
    { key: "profile", label: "Profiles", icon: <Users size={16} /> },
    { key: "documents", label: "Documents", icon: <FileCheck size={16} /> },
    { key: "logs", label: "Logs", icon: <FileText size={16} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManagement />;
      case "profile":
        return <UserProfileViewer />;
      case "documents":
        return <DocumentVerification />;
      case "logs":
        return <VerificationLogs />;
      default:
        return <DashboardOverview />;
    }
  };
  const user = localStorage.getItem("loggedInUser");
  const user_role = localStorage.getItem("role");

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
          {user_role} • {user}{" "}
        </div>
      </header>

      {/* ===== Desktop Tabs ===== */}
      <div className="hidden lg:block px-4 pt-6">
        <div className="grid grid-cols-5 gap-2">
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

/* ===== Shared UI ===== */
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

function TabButton({ active, onClick, children }: any) {
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

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 p-4 bg-white/5">
      <div className="text-xs text-slate-400">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
