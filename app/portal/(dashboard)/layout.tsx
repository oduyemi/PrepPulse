"use client";
import { ReactNode, useState } from "react";
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
  const { user, logout } = useAuth();

  if (user) {
    console.log(user.fields.firstname);
  }
  if (!user) router.push("/");

  return (
    <div className="bg-gray-50 flex">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col min-w-0">
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