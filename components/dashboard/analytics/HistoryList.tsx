"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = {
  history: any[];
};

export const HistoryList = ({ history }: Props) => {
  const items = history?.slice(0, 5) || [];

  const getColor = (score: number) => {
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
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
        <CardContent className="p-5 space-y-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Recent Attempts
            </h3>
            <span className="text-xs text-gray-500">
              Last {items.length}
            </span>
          </div>

          {/* List */}
          {items.length > 0 ? (
            <div className="space-y-3">
              {items.map((h, i) => {
                const score = Number(h?.fields?.score) || 0;
                const date = h?.fields?.completed_at;

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-none"
                  >
                    <span className={`font-semibold ${getColor(score)}`}>
                      {score}%
                    </span>

                    <span className="text-gray-500">
                      {date
                        ? new Date(date).toLocaleDateString()
                        : "--"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No attempts yet
            </p>
          )}

        </CardContent>
      </Card>
    </motion.div>
  );
};