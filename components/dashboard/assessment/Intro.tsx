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

  const getTimerColor = () => {
    if (time < 60) return "text-red-500";
    if (time < 180) return "text-yellow-500";
    return "text-gray-800";
  };

  const q = questions[current];

  return (
    <div className="relative min-h-screen flex items-start justify-center px-4 py-10 bg-gray-950 text-white overflow-hidden">

      {/* 🔥 Background glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full" />
      </div>

      {/* 🔒 Main container */}
      <div className="relative w-full max-w-3xl space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>
            Question {current + 1} of {questions.length}
          </span>

          {/* ⏱ Timer */}
          <motion.div
            key={time}
            initial={{ scale: 1 }}
            animate={{ scale: time < 60 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur ${getTimerColor()}`}
          >
            <Clock className="h-4 w-4" />
            {formatTime(time)}
          </motion.div>
        </div>

        {/* PROGRESS */}
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((current + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        </div>

        {/* QUESTION */}
        <motion.h2
          key={current}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold tracking-tight text-white"
        >
          {q.question}
        </motion.h2>

        {/* OPTIONS */}
        <div className="space-y-4">
          {q.options.map((opt, i) => {
            const isSelected = selected === opt;

            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(opt)}
                className={`
                  relative w-full text-left p-4 rounded-xl transition-all
                  border backdrop-blur
                  ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(99,102,241,0.5)]"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }
                `}
              >
                <span className="text-sm text-gray-200">{opt}</span>

                {/* Glow on select */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-xl bg-indigo-500/10 blur-md pointer-events-none" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* NAVIGATION */}
        <div className="flex items-center justify-between pt-4">

          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white"
            disabled={current === 0}
            onClick={() => {
              setCurrent((c) => Math.max(0, c - 1));
              setSelected(null);
            }}
          >
            Previous
          </Button>

          {current < questions.length - 1 ? (
            <Button
              disabled={!selected}
              className="bg-white text-black hover:bg-gray-200"
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
  );
};