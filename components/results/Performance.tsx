"use client";
import { Card, CardContent } from "@/components/ui/card";


export function BreakdownCard() {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-6 space-y-4">
        <h2 className="font-semibold">Performance Breakdown</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm font-medium text-green-700">Strengths</p>
            <ul className="text-sm text-green-600 mt-2 space-y-1">
              <li>• React basics</li>
              <li>• API understanding</li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-4">
            <p className="text-sm font-medium text-red-700">Weak Areas</p>
            <ul className="text-sm text-red-600 mt-2 space-y-1">
              <li>• Async JavaScript</li>
              <li>• State management</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

