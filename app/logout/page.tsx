"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function LogoutPage() {
  const { logout, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;

    logout(); 
    router.replace("/"); 
  }, [isHydrated, logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
      Logging you out...
    </div>
  );
}