"use client";
import { Card, CardContent } from "@/components/ui/card";


export function FeedbackCard() {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 space-y-2">
        <h2 className="font-semibold">Coaching Feedback</h2>
        <p className="text-sm text-gray-600">
          You need to improve on async JavaScript and React state management to perform better in real interview scenarios.
        </p>
      </CardContent>
    </Card>
  );
}


