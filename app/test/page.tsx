"use client";

import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";

export default function TestPage() {
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuth();

  const [questions, setQuestions] = useState<any[]>([]);

  const urlTrack = searchParams.get("track");
  const urlLevel = searchParams.get("level");

  // 🔥 FINAL SOURCE OF TRUTH (URL → SESSION → fallback)
  const track =
    urlTrack ||
    user?.fields?.jobInterest ||
    "fullstack";

  const level =
    urlLevel ||
    user?.fields?.skillLevel ||
    "entry";

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) return;

    const fetchQuestions = async () => {
      const res = await fetch(
        `/api/test/generate?track=${track}&level=${level}`
      );

      const data = await res.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, [isHydrated, user, track, level]);

  return (
    <div className="p-6">
      <pre>{JSON.stringify({ track, level }, null, 2)}</pre>
    </div>
  );
}