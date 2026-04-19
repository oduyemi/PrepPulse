"use client";
import { Menu, Bell } from "lucide-react";

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      
      {/* 🔒 Shared layout container (must match main content) */}
      <div className="mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">

          {/* Mobile menu */}
          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <div className="flex flex-col justify-center min-w-0 max-w-[220px] sm:max-w-xs md:max-w-md">
            <h1 className="
              text-base sm:text-lg md:text-xl 
              font-semibold tracking-tight text-gray-900 
              leading-tight truncate
            ">
              Welcome back, John <span>👋</span>
            </h1>

            <p className="
              text-xs sm:text-sm text-gray-500 
              leading-tight mt-0.5 
              truncate
            ">
              Your Interview Readiness Pulse
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          {/* Notifications */}
          <button className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3">

            {/* Text */}
            <div className="hidden sm:flex flex-col justify-center text-right">
              <span className="text-sm font-medium text-gray-900 leading-tight">
                John Doe
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                Candidate
              </span>
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                            flex items-center justify-center text-white text-sm font-medium shadow-sm">
              J
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};