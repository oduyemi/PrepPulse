"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";


export function ReadinessCard({ level, percentage }: any) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Readiness Level</h2>
          <Badge className="bg-indigo-50 text-indigo-600">{level}</Badge>
        </div>

        <Progress value={percentage} className="h-2" />
      </CardContent>
    </Card>
  );
}
