"use client";
import { AssessmentIntro } from "@/components/dashboard/assessment/Intro";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !user) router.push("/");
  }, [isHydrated, user]);

  if (!isHydrated) return <div>Loading...</div>;

  const track = user.fields.jobInterest!;
  const level = user.fields.skillLevel!;

  return <AssessmentIntro track={track} level={level} />;
}