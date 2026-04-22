"use client";
import { useAuth } from "@/app/context/AuthContext";
import { AssessmentWa } from "@/components/dashboard/assessment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Assessments() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return <AssessmentWa />;
}