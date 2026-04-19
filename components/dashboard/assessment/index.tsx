"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

export const Assessment = () => {
  const questions = [
    {
      question: "What does useEffect do in React?",
      options: [
        "Handles side effects",
        "Manages routing",
        "Stores global state",
        "Compiles JSX",
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [time, setTime] = useState(8 * 60 + 21);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const q = questions[current];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      {/* 🔒 Container */}
      <div className="max-w-3xl mx-auto space-y-6">

        {/* 🔝 Header */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Question {current + 1} of {questions.length}
          </div>

          {/* Timer (enhanced) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-sm font-medium text-gray-800">
            <Clock className="h-4 w-4" />
            {formatTime(time)}
          </div>
        </div>

        {/* 📊 Progress bar */}
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all"
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* ❓ Question */}
        <motion.h2
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-semibold text-gray-900"
        >
          {q.question}
        </motion.h2>

        {/* ✅ Options */}
        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = selected === opt;

            return (
              <button
                key={i}
                onClick={() => setSelected(opt)}
                className={`
                  w-full text-left p-4 rounded-xl border transition-all
                  ${isSelected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:bg-gray-50"}
                `}
              >
                <span className="text-sm text-gray-800">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* 🔽 Navigation */}
        <div className="flex items-center justify-between pt-4">

          <Button
            variant="outline"
            disabled={current === 0}
            onClick={() => {
              setCurrent((c) => Math.max(0, c - 1));
              setSelected(null);
            }}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {current < questions.length - 1 ? (
              <Button
                disabled={!selected}
                onClick={() => {
                  setCurrent((c) => c + 1);
                  setSelected(null);
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                disabled={!selected}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};