"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { OverviewCard } from "@/components/dashboard/analytics/OverviewCard";
import { ProgressChart } from "@/components/dashboard/analytics/ProgressChart";
import { WeakAreasCard } from "@/components/dashboard/analytics/WeakAreas";
import { HistoryList } from "@/components/dashboard/analytics/HistoryList";

export default function AnalyticsPage() {
  const { user } = useAuth();

  const [latest, setLatest] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (!user) return;

    const email = user.fields.email;

    // latest attempt
    fetch(`/api/test/latest?email=${email}`)
      .then((res) => res.json())
      .then(setLatest);

    // full history (THIS IS REQUIRED for chart)
    fetch(`/api/test/history?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 HISTORY:", data);
        setHistory(Array.isArray(data) ? data : []);
      });

    // attempt count
    fetch(`/api/test/count?email=${email}`)
      .then((res) => res.json())
      .then((data) => setAttempts(data?.count || 0));
  }, [user]);

  return (
    <div className="space-y-6">
      <OverviewCard latest={latest} attempts={attempts} />

      <ProgressChart history={history} />

      <div className="grid md:grid-cols-2 gap-4">
        <WeakAreasCard history={history} />
        <HistoryList history={history} />
      </div>
    </div>
  );
}