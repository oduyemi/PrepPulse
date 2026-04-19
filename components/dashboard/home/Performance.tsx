"use client";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function PerformanceCard() {
  const score = 65;

  const getColor = () => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mt-3 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
        <CardContent className="p-5 space-y-5">

          {/* 🔒 Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-sm font-medium text-gray-900">
                Performance
              </h2>
              <p className="text-xs text-gray-500">
                Latest insight
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-indigo-500" />
              <span className={`text-sm font-semibold ${getColor()}`}>
                {score}%
              </span>
            </div>
          </div>

          {/* 📊 Progress block */}
          <div className="space-y-2">
            <div className="relative h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>

            {/* Labels */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Progress</span>
              <span className="text-gray-500">{score}% complete</span>
            </div>
          </div>

          {/* ⚠️ Weak area (grouped properly) */}
          <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3">
            <span className="text-gray-500">Needs improvement</span>
            <span className="text-red-500 font-medium">
              Async JS
            </span>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}