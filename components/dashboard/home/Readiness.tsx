"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const ReadinessCard = () => {
  const score = 72;

  const getColor = () => {
    if (score < 40) return "from-red-500 to-orange-500";
    if (score < 70) return "from-yellow-500 to-amber-500";
    return "from-indigo-500 to-purple-600";
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const spotlight = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(280px at ${latestX}px ${latestY}px, rgba(99,102,241,0.12), transparent 80%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      {/* Spotlight */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 rounded-3xl pointer-events-none"
      />

      <Card className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        <CardContent className="p-6 space-y-6">

          {/* 🔒 Header (aligned properly) */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                Readiness Score
              </h2>
              <p className="text-sm text-gray-500">
                Level:{" "}
                <span className="font-medium text-gray-700">
                  Intermediate
                </span>
              </p>
            </div>

            {/* Score circle */}
            <div className="relative h-16 w-16 shrink-0">
              <svg className="rotate-[-90deg]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * score) / 100}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{
                    strokeDashoffset: 283 - (283 * score) / 100,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />

                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-900">
                {score}%
              </div>
            </div>
          </div>

          {/* 📊 Stats (visually grouped) */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Speed", value: "80%" },
              { label: "Accuracy", value: "68%" },
              { label: "Consistency", value: "70%" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center"
              >
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            className={`group w-full h-11 py-5 rounded-xl bg-gradient-to-r ${getColor()} text-white font-medium shadow-md hover:opacity-90 transition`}
          >
            <span>Start New Assessment</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};