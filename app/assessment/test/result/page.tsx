"use client";
import { useAuth } from "@/app/context/AuthContext";
import { FeedbackCard } from "@/components/results/Feedback";
import { NextStepsCard } from "@/components/results/NextStep";
import { BreakdownCard } from "@/components/results/Performance";
import { ReadinessCard } from "@/components/results/Readiness";
import { ScoreCard } from "@/components/results/Score";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Attempt = {
  fields: {
    score: number;
    correct_answers: number;
    total_questions: number;
    readiness_level: string;
    weak_areas: string;
    strong_areas: string;
    coach_feedback: string;
    nextstep_suggestion: string;
  };
};

export default function Results() {
  const router = useRouter();
  const { user, isHydrated } = useAuth();

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     AUTH GUARD
  ========================= */
  useEffect(() => {
    if (isHydrated && !user) {
      router.push("/");
    }
  }, [isHydrated, user, router]);

  /* =========================
     FETCH RESULTS
  ========================= */
  useEffect(() => {
    if (!isHydrated || !user?.fields?.email) return;

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `/api/test/results?email=${user.fields.email}`
        );

        const data = await res.json();
        setAttempts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [isHydrated, user]);

  /* =========================
     LOADING STATES
  ========================= */
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading results...</p>
      </div>
    );
  }

  if (!user) return null;

  if (!attempts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No results found.</p>
      </div>
    );
  }

  /* =========================
     USE LATEST ATTEMPT
  ========================= */
  const latest = attempts[0].fields;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">

      {/* SCORE */}
      <ScoreCard
        score={latest.correct_answers}
        total={latest.total_questions}
        percentage={latest.score}
      />

      {/* READINESS */}
      <ReadinessCard
        level={latest.readiness_level}
        percentage={latest.score}
      />

      {/* BREAKDOWN */}
      <BreakdownCard
        strengths={latest.strong_areas}
        weaknesses={latest.weak_areas}
      />

      {/* FEEDBACK */}
      <FeedbackCard feedback={latest.coach_feedback} />

      {/* NEXT STEP */}
      <NextStepsCard
        percentage={latest.score}
        suggestion={latest.nextstep_suggestion}
      />

    </div>
  );
}