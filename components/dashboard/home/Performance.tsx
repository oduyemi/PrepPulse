"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function PerformanceCard() {
  const score = 65;

  const getColor = () => {
    if (score < 40) return "text-red-400";
    if (score < 70) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="mt-3 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300">
        
        {/* subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent opacity-50 pointer-events-none" />

        <CardContent className="relative p-5 space-y-4">

          {/* Top Row */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold tracking-tight">
                Performance
              </h2>
              <p className="text-xs text-gray-400">Latest insight</p>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              <span className={`text-sm font-semibold ${getColor()}`}>
                {score}%
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Weak:</span>
            <span className="text-red-400 font-medium">Async JS</span>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}