"use client";
import { useAuth } from "@/app/context/AuthContext";
import { FeedbackCard } from "@/components/results/Feedback";
import { NextStepsCard } from "@/components/results/NextStep";
import { BreakdownCard } from "@/components/results/Performance";
import { ReadinessCard } from "@/components/results/Readiness";
import { ScoreCard } from "@/components/results/Score";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Results() {
  const router = useRouter();
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

  if (!user) return null;
  const score = 7;
  const total = 10;
  const percentage = 70;

  const level = percentage < 50 ? "Beginner" : percentage < 80 ? "Intermediate" : "Ready";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">
      <ScoreCard score={score} total={total} percentage={percentage} />
      <ReadinessCard level={level} percentage={percentage} />
      <BreakdownCard />
      <FeedbackCard />
      <NextStepsCard percentage={percentage} />
    </div>
  );
}

