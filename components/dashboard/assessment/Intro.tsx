"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Timer, ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";


type Props = {
  track: "fullstack" | "hr" | "pm";
  level: "entry" | "intermediate" | "senior";
};


export const AssessmentIntro = ({ track, level }: Props) => {
  const router = useRouter();

  const handleStart = () => {
    if (!track || !level) return;
    router.push(`/assessment/test?track=${track}&level=${level}`);
  };

  const trackLabel = {
    fullstack: "Fullstack Development",
    hr: "Human Resources",
    pm: "Project Management",
  }[track] ?? "Your Track";

  const levelLabel = {
    entry: "Entry Level",
    intermediate: "Intermediate",
    senior: "Senior",
  }[level] ?? "Your Level";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">

      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">
          Ready for your assessment?
        </h1>

        <p className="text-gray-600">
          Tailored for{" "}
          <span className="font-medium">{trackLabel}</span>{" "}
          at{" "}
          <span className="font-medium">{levelLabel}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: ListChecks, title: "15 Questions", desc: "Mixed difficulty evaluation" },
          { icon: Timer, title: "10 Minutes", desc: "Timed interview simulation" },
          { icon: ArrowRight, title: "Instant Results", desc: "Readiness scoring + feedback" },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-2xl border bg-gray-50 space-y-2">
            <item.icon className="h-5 w-5 text-indigo-600" />
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-6">
        <Link href="/assessment/test">
          <Button
            onClick={handleStart}
            className="h-12 px-8 py-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          >
            Start Test
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};