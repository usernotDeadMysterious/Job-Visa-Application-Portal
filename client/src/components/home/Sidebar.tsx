import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";

type User = {
  name?: string;
  email?: string;
  initials?: string;
};
type Props = {
  logo?: React.ReactNode;
  //   onSearch?: (query: string) => void;
  user?: User | null;
};
const Sidebar: React.FC<Props> = ({ logo, user = null }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* just icon with functionality ,  */}
      {/* can be edited later */}

      {/* Mobile hamburger -> opens custom drawer */}
      <div className="md:hidden -ml-2">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
      {/* ---------- CUSTOM MOBILE DRAWER ---------- */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-50 flex pointer-events-none`}
          aria-hidden={!open}
        >
          {/* Backdrop - fades in/out */}
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-[3000ms] 
      ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }
    `}
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel - always in DOM, translate-x toggled for sliding */}
          <aside
            className={`relative z-60 w-80 max-w-[80%] bg-white  shadow-xl h-full overflow-y-auto
      transform transition-transform duration-[1000ms] ease-in
      ${open ? "translate-x-0" : "-translate-x-full"}
      pointer-events-auto
    `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {logo ?? (
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-md shadow" />
                  )}
                  <span className="font-semibold text-lg">Portal</span>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Applications
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Documents
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Support
                </a>
              </nav>

              <div className="mt-6 border-t pt-4 flex items-center gap-3">
                <Avatar>
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                    {user?.initials ?? "U"}
                  </div>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">
                    {user?.name ?? "Guest User"}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.email ?? "not signed in"}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Button className="w-full">Open profile</Button>
                <Button variant="ghost" className="w-full">
                  Sign out
                </Button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
