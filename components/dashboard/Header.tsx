"use client";
import { Menu, Bell } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user } = useAuth();
  const firstname = user?.fields?.firstName;
  const surname = user?.fields?.surname || "";
  const fullName = `${firstname} ${surname}`.trim();

  const initial = firstname.charAt(0).toUpperCase();
  const roleMap: Record<string, string> = {
    fullstack: "Fullstack Candidate",
    hr: "HR Candidate",
    pm: "Project Manager",
  };

  const role =
    roleMap[user?.fields?.jobInterest || ""] || "Candidate";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <div className="flex flex-col justify-center min-w-0">
            <div className="mt-2"></div>
            <h6 className="mt-6 text-sm sm:text-base font-medium text-gray-700 leading-tight truncate">
              Welcome back, {firstname} <span>👋</span>
            </h6>
            <p className="text-xs text-gray-500 leading-tight mt-0.5 truncate">
              Your Interview Readiness Pulse
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-[6px] right-[6px] w-2 h-2 bg-indigo-600 rounded-full" />
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex flex-col justify-center text-right">
              <span className="text-sm font-medium text-gray-900 leading-tight">
                {fullName}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {role}
              </span>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                            flex items-center justify-center text-white text-sm font-medium shadow-sm">
              {initial}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};