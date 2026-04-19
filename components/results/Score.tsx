"use client";
import { Card, CardContent } from "@/components/ui/card";


export function ScoreCard({ score, total, percentage }: any) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 text-center space-y-3">
        <p className="text-sm text-gray-500">Your Score</p>
        <h1 className="text-4xl font-bold">{score}/{total}</h1>
        <p className="text-gray-600">{percentage}%</p>
      </CardContent>
    </Card>
  );
}


