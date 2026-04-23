"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    if (!isHydrated) return;
  
    const saved = localStorage.getItem("assessment");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers || {});
      setCurrent(parsed.current || 0);
      setTime(parsed.time || TOTAL_TIME);
    }
  }, [isHydrated]);

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
  const progress = ((current + 1) / questions.length) * 100;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-6">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Assessment</h1>
            <p className="text-sm text-gray-500">
              {track?.toUpperCase()} · {level}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
            <Clock size={16} />
            <span className="font-medium">{formatTime(time)}</span>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-lg font-medium mb-6">{q.question}</h2>

              <div className="space-y-3">
                {q.options.map((opt: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition
                      ${
                        selected === opt
                          ? "border-indigo-600 bg-indigo-50"
                          : "hover:border-gray-400"
                      }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* FOOTER NAV */}
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
          >
            Previous
          </Button>

          {current < questions.length - 1 ? (
            <Button
            className="bg-indigo-600"
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