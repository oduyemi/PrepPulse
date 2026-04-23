"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReadinessCard } from "@/components/dashboard/home/Readiness";
import { PerformanceCard } from "@/components/dashboard/home/Performance";
import { NextStepCard } from "@/components/dashboard/home/NextSteps";

export default function PortalHome() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  const [history, setHistory] = useState<any[]>([]);
  const [latest, setLatest] = useState<any>(null);

  useEffect(() => {
    if (isHydrated && !user) router.push("/");
  }, [isHydrated, user, router]);

  useEffect(() => {
    if (!user?.fields?.email) return;

    const email = user.fields.email;

    // 🔹 ALL ATTEMPTS (for stats)
    fetch(`/api/test/history?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []);
      });

    // 🔹 LATEST ONLY (for main score)
    fetch(`/api/test/latest?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setLatest(data?.fields || null);
      });
  }, [user]);

  if (!isHydrated) return <div>Loading...</div>;
  if (!user) return null;
  if (!latest) return <div>No data yet</div>;

  // ✅ DERIVE STATS FROM HISTORY (THIS IS THE FIX)
  const attempts = history.length;

  const avg = (key: string) =>
    history.length
      ? Math.round(
          history.reduce(
            (sum, h) => sum + (Number(h.fields?.[key]) || 0),
            0
          ) / history.length
        )
      : 0;

  const stats = {
    speed: avg("speed"),
    accuracy: avg("accuracy"),
    consistency: avg("consistency"),
  };

  return (
    <main className="min-h-screen p-6 space-y-6">

      <ReadinessCard
        score={latest.score}
        skillLevel={user.fields.skillLevel}
        stats={stats}
        readinessLevel={latest.readiness_level} 
      />

      <PerformanceCard
        score={latest.score}
        weakArea={latest.weak_areas}
      />

      <NextStepCard
        suggestion={latest.nextstep_suggestion}
        score={latest.score}
      />

      <div className="text-sm text-gray-500">
        Attempts: {attempts}
      </div>

    </main>
  );
}