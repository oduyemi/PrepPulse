"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
  score: number;
  skillLevel: "entry" | "intermediate" | "senior";
  readinessLevel?: string;
  stats: {
    speed: number;
    accuracy: number;
    consistency: number;
  };
};

export const ReadinessCard = ({
  score = 0,
  skillLevel = "intermediate",
  readinessLevel,
  stats,
}: Props) => {

  const safeScore = Math.min(100, Math.max(0, Number(score) || 0));

  // ✅ FIX: TRUST AIRTABLE FIRST
  const readiness = readinessLevel?.trim() || "Unknown";

  const formatSkillLevel = () => {
    const map = {
      entry: "Entry Level",
      intermediate: "Intermediate",
      senior: "Senior",
    };
    return map[skillLevel];
  };

  const getColor = (value: number) => {
    if (value < 40) return "from-red-500 to-orange-500";
    if (value < 70) return "from-yellow-500 to-amber-500";
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
    ([lx, ly]) =>
      `radial-gradient(280px at ${lx}px ${ly}px, rgba(99,102,241,0.12), transparent 80%)`
  );

  const circumference = 283;
  const strokeOffset = circumference - (circumference * safeScore) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 rounded-3xl pointer-events-none"
      />

      <Card className="relative overflow-hidden rounded-3xl border bg-white shadow-xl">
        <CardContent className="p-6 space-y-6">

          <div className="flex items-center justify-between">

            <div className="space-y-1">
              <h2 className="text-lg font-semibold">
                Readiness Score
              </h2>

              <div className="text-sm text-gray-500">
                <p>
                  Skill Level:{" "}
                  <span className="font-medium text-gray-800">
                    {formatSkillLevel()}
                  </span>
                </p>

                <p>
                  Readiness:{" "}
                  <span className="font-medium text-gray-900">
                    {readiness}
                  </span>
                </p>
              </div>
            </div>

            {/* ring */}
            <div className="relative h-16 w-16">
              <svg className="rotate-[-90deg]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeOffset }}
                />

                <defs>
                  <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                {safeScore}%
              </div>
            </div>

          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(stats || {}).map(([key, value], i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="text-xs text-gray-500">{key}</p>
                <p className="text-sm font-semibold">{Number(value) || 0}%</p>
              </div>
            ))}
          </div>

          <Button className={`w-full bg-gradient-to-r ${getColor(safeScore)} text-white`}>
            Start New Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

        </CardContent>
      </Card>
    </motion.div>
  );
};