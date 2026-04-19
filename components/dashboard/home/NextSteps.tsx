"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";


export const NextStepCard = () => {
  return (
    <Card className="md:col-span-2 rounded-2xl border shadow-sm hover:shadow-md transition">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-purple-600" />
          <h2 className="text-lg font-semibold">Suggested Next Step</h2>
        </div>

        <p className="text-sm text-gray-600">
          Based on your performance, we recommend focusing on:
        </p>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
          <span className="font-medium">React Hooks Test</span>
          <Button size="sm" className="rounded-xl">
            Start
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
