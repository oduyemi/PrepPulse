"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const ReadinessCard = ({ level, percentage }: any) => {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Readiness Level</h2>
          <Badge className="bg-indigo-50 text-indigo-600">{level}</Badge>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">{percentage}%</h1>
          <p className="text-sm text-gray-500">Overall Score</p>
        </div>

        {/* Progress Bar */}
        <Progress value={percentage} className="h-2" />

      </CardContent>
    </Card>
  );
}