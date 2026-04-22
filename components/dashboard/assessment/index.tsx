"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

type Question = {
  id: string;
  question: string;
  options: string[];
};

const TOTAL_TIME = 10 * 60;

export const AssessmentWa = () => {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [time, setTime] = useState(TOTAL_TIME);
  const [fetched, setFetched] = useState(false);

  const track = user?.fields?.jobInterest;
  const level = user?.fields?.skillLevel;

  /* =========================
     REDIRECT (SAFE)
  ========================= */
  useEffect(() => {
    if (!isHydrated) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (!user.fields?.jobInterest || !user.fields?.skillLevel) {
      router.replace("/track");
    }
  }, [isHydrated, user, router]);

  /* =========================
     RESTORE STATE
  ========================= */
  useEffect(() => {
    const saved = localStorage.getItem("assessment");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers || {});
      setCurrent(parsed.current || 0);
      setTime(parsed.time || TOTAL_TIME);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "assessment",
      JSON.stringify({ answers, current, time })
    );
  }, [answers, current, time]);

  /* =========================
     FETCH QUESTIONS
  ========================= */
  useEffect(() => {
    if (!isHydrated || fetched) return;
    if (!track || !level) return;

    const fetchQuestions = async () => {
      setFetched(true);

      try {
        const res = await fetch(
          `/api/test/generate?track=${track}&level=${level}`
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setQuestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [isHydrated, fetched, track, level]);

  /* =========================
     TIMER
  ========================= */
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  /* =========================
     AUTO SUBMIT
  ========================= */
  useEffect(() => {
    if (time === 0 && questions.length > 0) {
      handleSubmit();
    }
  }, [time, questions]);

  /* =========================
     UI GUARDS (CRITICAL)
  ========================= */

  // ⛔ WAIT for hydration FIRST
  if (!isHydrated) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading session...
      </div>
    );
  }

  // ⛔ THEN validate user
  if (!user || !track || !level) {
    return null; // redirect will handle this
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Preparing assessment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        No questions available.
      </div>
    );
  }

  const q = questions[current];
  const selected = answers[current];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSelect = (opt: string) => {
    setAnswers((prev) => ({
      ...prev,
      [current]: opt,
    }));
  };

  const handleSubmit = async () => {
    if (!user.fields?.email) return;

    try {
      const res = await fetch("/api/test/submit", {
        method: "POST",
        body: JSON.stringify({
          answers,
          questions,
          duration: TOTAL_TIME - time,
          email: user.fields.email,
          track,
          skillLevel: level,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.removeItem("assessment");
      router.push(`/assessment/test/result`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="flex justify-between">
          <span>Q {current + 1}/{questions.length}</span>
          <span className="flex gap-2">
            <Clock size={16} />
            {formatTime(time)}
          </span>
        </div>

        <motion.h2 key={current}>{q.question}</motion.h2>

        <div className="space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              className={`w-full p-3 border rounded ${
                selected === opt ? "bg-indigo-100 border-indigo-500" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
          >
            Prev
          </Button>

          {current < questions.length - 1 ? (
            <Button
              disabled={!selected}
              onClick={() => setCurrent((c) => c + 1)}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
};