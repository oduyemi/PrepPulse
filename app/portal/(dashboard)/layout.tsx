"use client";
import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading session...</p>
      </div>
    );
  }

  console.log(user)
  if (!user) return null;

  return (
    <div className="bg-gray-50 flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        <Header toggleSidebar={() => setOpen(!open)} />

        <main className="flex-1">
          
          {/* 🔥 THIS IS THE FIX */}
          <div className="
            mx-auto 
            w-full 
            max-w-7xl 
            px-4 sm:px-6 lg:px-8 
            py-6
            space-y-6
          ">
            {children}
          </div>

        </main>
      </div>
    </div>
  );
}