import { Outlet, NavLink } from "react-router-dom";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  User,
  FileText,
  Globe2,
  Briefcase,
  LifeBuoy,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function DashboardLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 p-4 gap-4">
        <div className="text-xl font-semibold">Internal Portal</div>

        <nav className="flex flex-col gap-1 text-sm text-slate-300">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={16} />}>
            Dashboard
          </NavItem>
          <NavItem to="/dashboard/profile" icon={<User size={16} />}>
            Profile
          </NavItem>
          <NavItem to="/dashboard/documents" icon={<FileText size={16} />}>
            Documents
          </NavItem>
          <NavItem to="/dashboard/visa" icon={<Globe2 size={16} />}>
            Visa
          </NavItem>
          <NavItem to="/dashboard/jobs" icon={<Briefcase size={16} />}>
            Job Applications
          </NavItem>
          <NavItem to="/dashboard/support" icon={<LifeBuoy size={16} />}>
            Support
          </NavItem>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-slate-800 px-4 flex items-center justify-between gap-3">
          {/* Mobile left: menu + title */}
          <div className="flex items-center gap-2 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-slate-800"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-slate-950 border-slate-800 p-0"
              >
                <SheetHeader className="px-4 py-3 border-b border-slate-800 text-left">
                  <SheetTitle className="text-base">Internal Portal</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-3 text-sm text-slate-300">
                  <NavItem to="/dashboard" icon={<LayoutDashboard size={16} />}>
                    Dashboard
                  </NavItem>
                  <NavItem to="/dashboard/profile" icon={<User size={16} />}>
                    Profile
                  </NavItem>
                  <NavItem
                    to="/dashboard/documents"
                    icon={<FileText size={16} />}
                  >
                    Documents
                  </NavItem>
                  <NavItem to="/dashboard/visa" icon={<Globe2 size={16} />}>
                    Visa
                  </NavItem>
                  <NavItem to="/dashboard/jobs" icon={<Briefcase size={16} />}>
                    Job Applications
                  </NavItem>
                  <NavItem
                    to="/dashboard/support"
                    icon={<LifeBuoy size={16} />}
                  >
                    Support
                  </NavItem>
                </nav>
              </SheetContent>
            </Sheet>

            <span className="text-sm font-semibold">Internal Portal</span>
          </div>

          {/* Desktop left title */}
          <div className="hidden md:block text-sm font-semibold">
            Student Dashboard
          </div>

          {/* Right side: user + theme + logout */}
          <div className="flex items-center gap-3 text-xs md:text-sm">
            {/* <ThemeToggle /> */}
            <span className="text-slate-300 max-w-[140px] truncate md:max-w-xs">
              {user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-slate-700"
            >
              Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        [
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
          isActive
            ? "bg-slate-800 text-slate-50"
            : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-50",
        ].join(" ")
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
}
