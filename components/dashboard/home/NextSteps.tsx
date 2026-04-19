"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";

export const NextStepCard = () => {
  return (
    <Card className="md:col-span-2 mt-3 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-purple-600" />
          <h2 className="text-base font-medium text-gray-900">
            Suggested Next Step
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 max-w-md">
          Based on your recent performance, this is the most impactful area to improve next.
        </p>

        {/* 🎯 Action Block */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              React Hooks Test
            </span>
            <span className="text-xs text-gray-500">
              Improve component logic & state handling
            </span>
          </div>

          <Button
            size="sm"
            className="rounded-lg px-4 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Start
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};