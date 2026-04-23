"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import Link from "next/link";


export function NextStepsCard({ percentage }: { percentage: number }) {
  let recommendation = "";

  if (percentage < 50) {
    recommendation = "Take the foundational module to build core understanding.";
  } else if (percentage < 80) {
    recommendation = "Retry the assessment and improve weak areas.";
  } else {
    recommendation = "Great job! Attempt the next level assessment.";
  }

  return (
    <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="font-semibold text-lg">Suggested Next Steps</h2>

        <p className="text-sm text-indigo-100">{recommendation}</p>

        <div className="flex gap-3 flex-wrap">
          <Link href="/portal">
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-xl">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/assessment/test">
            <Button variant="secondary" className="rounded-xl">
              Retry Assessment <RotateCcw className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
