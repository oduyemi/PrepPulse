"use client";
import { useAuth } from "@/app/context/AuthContext";
import { FeedbackCard } from "@/components/results/Feedback";
import { NextStepsCard } from "@/components/results/NextStep";
import { BreakdownCard } from "@/components/results/Performance";
import { ReadinessCard } from "@/components/results/Readiness";
import { ScoreCard } from "@/components/results/Score";
import { useRouter } from "next/navigation";

export default function Results() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (user) {
    console.log(user.fields.firstname);
  }
  if (!user) router.push("/");
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

