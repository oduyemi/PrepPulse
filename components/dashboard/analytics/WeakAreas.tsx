"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = {
  history: any[];
};

export const WeakAreasCard = ({ history }: Props) => {
  const latest = history?.[0];

  // ✅ Normalize + split
  const weakAreasRaw = latest?.fields?.weak_areas || "";
  const weakAreas = weakAreasRaw
    ? weakAreasRaw.split(",").map((w: string) => w.trim())
    : [];

  const hasData = weakAreas.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
        <CardContent className="p-5 space-y-4">

          {/* Header */}
          <h3 className="text-sm font-medium text-gray-900">
            Weak Areas
          </h3>

          {/* Content */}
          {hasData ? (
            <div className="flex flex-wrap gap-2">
              {weakAreas.map((area: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-600 border border-red-100"
                >
                  {area}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No weak areas identified yet
            </p>
          )}

        </CardContent>
      </Card>
    </motion.div>
  );
};