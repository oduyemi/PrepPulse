"use client";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, LineChart } from "lucide-react";


export const Value = () => {
    return (
      <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge className="bg-purple-50 text-purple-600">Why it works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for real outcomes, not just practice
          </h2>
          <p className="text-gray-600">
            PrepPulse focuses on measurable improvement with structured
            insights and guided learning paths.
          </p>
  
          <div className="space-y-4">
            {[
              "Role-specific simulations",
              "Actionable feedback",
              "Continuous progress tracking",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
  
        <ValueVisual />
      </section>
    );
  }
  
  
  function ValueVisual() {
    return (
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-purple-200 blur-2xl rounded-3xl" />
        <div className="relative bg-white rounded-2xl border shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Performance</span>
            <LineChart className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="h-32 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 bg-indigo-50 rounded-lg" />
            <div className="h-16 bg-purple-50 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }