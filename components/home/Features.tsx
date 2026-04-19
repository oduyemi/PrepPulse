"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Brain,
  Target,
} from "lucide-react";


export const FeatureGrid = () => {
    const features = [
      {
        icon: Brain,
        title: "Adaptive Assessments",
        desc: "Interview questions that evolve with your skill level.",
        color: "text-indigo-600",
      },
      {
        icon: Target,
        title: "Precision Gap Analysis",
        desc: "Know exactly what to fix to improve faster.",
        color: "text-purple-600",
      },
      {
        icon: BarChart3,
        title: "Progress Intelligence",
        desc: "Track performance with clear metrics and insights.",
        color: "text-pink-600",
      },
    ];
  
    return (
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card
              key={i}
              className="group rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
            >
              <CardContent className="p-6">
                <f.icon
                  className={`h-6 w-6 mb-4 ${f.color} group-hover:scale-110 transition`}
                />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }
  