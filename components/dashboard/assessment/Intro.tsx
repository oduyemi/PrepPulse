"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Timer, ListChecks, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";


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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-20">

        {/* HERO */}
        <div className="text-center space-y-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" />
              Assessment Ready
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Let’s evaluate your readiness
            </h1>

            <p className="text-gray-600 max-w-xl mx-auto">
              This assessment is tailored for
              <span className="font-medium text-gray-900"> {trackLabel}</span>
              {" "}at
              <span className="font-medium text-gray-900"> {levelLabel}</span> level.
            </p>
          </motion.div>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            {
              icon: ListChecks,
              title: "15 Questions",
              desc: "Carefully structured to test depth and clarity",
            },
            {
              icon: Timer,
              title: "10 Minutes",
              desc: "Simulates real interview time pressure",
            },
            {
              icon: ArrowRight,
              title: "Instant Feedback",
              desc: "Get scoring and improvement insights instantly",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                <item.icon className="h-5 w-5" />
              </div>

              <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleStart}
            className="h-12 px-10 py-5 mt-4  rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:shadow-lg transition"
          >
            &emsp;Start Assessment
            <ArrowRight className="ml-2 h-4 w-4" />&emsp;
          </Button>

          <p className="text-xs text-gray-500">
            Takes less than 10 minutes • No interruptions once started
          </p>
        </div>

      </div>
    </div>
  );
};