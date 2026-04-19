"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const TRACKS = {
  fullstack: {
    title: "Fullstack Development Track",
    intro:
      "Master both frontend and backend systems and prepare for real-world engineering interviews.",
    foundationCourse: {
      title: "Fullstack Foundations",
      duration: "2–3 hours",
      level: "Beginner → Intermediate",
      description:
        "Build a solid mental model of how modern web apps actually work — before diving into assessments.",
      modules: [
        "Client → Server architecture",
        "React component thinking",
        "APIs & data flow",
      ],
    },
    aiInsight:
      "Most candidates struggle with connecting frontend logic to backend systems. This track will help you bridge that gap early.",
    coreConcepts: [
      "React fundamentals",
      "API integration",
      "Database basics",
    ],
    testedOn: [
      "System thinking",
      "Frontend architecture",
      "Backend logic",
    ],
    expectations: [
      "Build real-world apps",
      "Think end-to-end",
      "Write scalable code",
    ],
  },
};

export const TrackIntro = ({ track = "fullstack" }) => {
    const data = TRACKS[track];
  
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
  
        {/* HERO HEADER */}
        <div className="space-y-4 text-center">
          <Badge className="bg-indigo-50 text-indigo-600">
            Guided Learning Entry Point
          </Badge>
  
          <h1 className="text-4xl font-bold tracking-tight">
            {data.title}
          </h1>
  
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data.intro}
          </p>
  
          {/* Progress */}
          <div className="flex justify-center">
            <div className="px-4 py-2 rounded-full bg-gray-100 text-sm">
              You’re just getting started • 0% complete
            </div>
          </div>
        </div>
  
        {/* AI INSIGHT */}
        <Card className="border-0 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm rounded-2xl">
          <CardContent className="p-6 flex gap-4">
            <Sparkles className="text-indigo-600 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Insight for your track
              </p>
              <p className="text-sm text-gray-600">
                {data.aiInsight}
              </p>
            </div>
          </CardContent>
        </Card>
  
        {/* FOUNDATION COURSE */}
        <Card className="rounded-2xl border shadow-sm hover:shadow-md transition">
          <CardContent className="p-6 space-y-5">
  
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {data.foundationCourse.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {data.foundationCourse.level} • {data.foundationCourse.duration}
                </p>
              </div>
  
              <BookOpen className="text-indigo-600" />
            </div>
  
            <p className="text-gray-600 text-sm">
              {data.foundationCourse.description}
            </p>
  
            <ul className="space-y-2 text-sm">
              {data.foundationCourse.modules.map((m, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-600">•</span>
                  {m}
                </li>
              ))}
            </ul>
  
            <Button className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700">
              Start Learning Path <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
  
          </CardContent>
        </Card>
  
        {/* STRUCTURED LEARNING */}
        <div className="grid md:grid-cols-3 gap-4">
          <Section title="Core Concepts" items={data.coreConcepts} />
          <Section title="What You'll Be Tested On" items={data.testedOn} />
          <Section title="Key Expectations" items={data.expectations} />
        </div>
  
        {/* 🔥 PREMIUM CTA SECTION */}
        <Card className="rounded-2xl border-0 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
  
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Ready to test your skills?
              </h3>
              <p className="text-sm text-indigo-100">
                Jump into a real interview-style assessment and see where you stand.
              </p>
            </div>
  
            <div className="flex gap-3">
                <Link href="/assessment">
                    <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-xl">
                    Start Assessment
                    </Button>
                </Link>

                <Link href="/portal">
                    <Button variant="secondary" className="rounded-xl">
                        Enter Portal
                    </Button>
                </Link>
            </div>
  
          </CardContent>
        </Card>
  
      </div>
    );
  };