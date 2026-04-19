"use client";
import {
  X,
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) => {
  const links = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed md:static z-50 top-0 left-0 h-full w-64",
          "bg-white/95 backdrop-blur-xl border-r border-gray-200",
          "flex flex-col transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* 🔒 Inner layout (alignment system) */}
        <div className="flex flex-col h-full px-4 py-5">

          {/* Header */}
          <div className="flex items-center justify-between h-10">
            <h2 className="text-base font-semibold tracking-tight text-gray-900">
              PrepPulse
            </h2>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Divider */}
          <div className="mt-5 mb-4 border-t border-gray-100" />

          {/* Nav */}
          <nav className="flex-1 space-y-1">
            {links.map((link, i) => (
              <button
                key={i}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  link.active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <link.icon
                  className={cn(
                    "h-4 w-4",
                    link.active ? "text-indigo-600" : "text-gray-400"
                  )}
                />
                {link.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};