"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = {
  history: any;
};

export const ProgressChart = ({ history }: Props) => {
  const safeHistory = Array.isArray(history) ? history : [];

  const scores = safeHistory
    .map((h: any) => Number(h?.fields?.score))
    .filter((n: number) => !isNaN(n))
    .reverse();

  const hasData = scores.length > 0;

  const getBarColor = (value: number) => {
    if (value < 40) return "bg-red-400";
    if (value < 70) return "bg-yellow-400";
    return "bg-indigo-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
        <CardContent className="p-6 space-y-5">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Progress Trend
            </h3>
            <span className="text-xs text-gray-500">
              Last {scores.length} attempts
            </span>
          </div>

          {/* Chart */}
          <div className="relative h-36">

            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400">
              <span>100%</span>
              <span>70%</span>
              <span>40%</span>
              <span>0%</span>
            </div>

            {hasData ? (
              <div className="absolute inset-0 flex items-end gap-2">
                {scores.map((value, i) => {
                  const safe = Math.min(100, Math.max(0, value));

                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${safe}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`flex-1 rounded-md ${getBarColor(safe)}`}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-500">
                No progress data yet
              </div>
            )}
          </div>

          {/* Footer */}
          {hasData && (
            <div className="text-xs text-gray-500 border-t pt-3">
              Latest:{" "}
              <span className="font-medium text-gray-900">
                {scores[scores.length - 1]}%
              </span>
              {" • "}
              Best:{" "}
              <span className="font-medium text-gray-900">
                {Math.max(...scores)}
              </span>
            </div>
          )}

        </CardContent>
      </Card>
    </motion.div>
  );
};