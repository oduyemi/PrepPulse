"use client";
import { ReactNode, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <Header toggleSidebar={() => setOpen(!open)} />
        <main className="flex-1 w-full">
          <div className="
            mx-auto 
            w-full 
            max-w-7xl 
            px-4 sm:px-6 lg:px-8 
            py-6
          ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}