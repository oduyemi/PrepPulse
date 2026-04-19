"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const AssessmentIntro = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100">

      {/* Soft radial glow */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-xl"
      >

        <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-none px-6 py-8 space-y-8 text-center">

          {/* TOP */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Interview Simulation
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
              Fullstack Assessment
            </h1>

            <p className="text-sm text-gray-600 max-w-md mx-auto">
              You’re about to begin a timed technical assessment designed to simulate real interview conditions.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Questions", value: "15" },
              {
                label: "Duration",
                value: (
                  <span className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" /> 10m
                  </span>
                ),
              },
              { label: "Grading", value: "Auto" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-gray-50 py-3"
              >
                <p className="text-lg font-semibold text-gray-900">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500">{item.label}</p>
              </div>
            ))}
          </div>

          {/* 📋 RULES */}
          <div className="text-sm text-gray-600 space-y-3 max-w-md mx-auto">
            <p className="font-medium text-gray-900">
              Before you begin
            </p>

            <ul className="space-y-2 text-left">
              <li>• The timer starts immediately and cannot be paused</li>
              <li>• Answer all questions for accurate evaluation</li>
              <li>• Designed to reflect real interview conditions</li>
              <li>• Results are generated instantly after submission</li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            You’ll receive a readiness score, performance insights, and clear next steps after completion.
          </div>

          <div className="space-y-3">
            <Link href="/assessment/test">
              <Button
                size="lg"
                className="group relative w-64 py-5 my-3 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md hover:shadow-lg transition-all"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>

                {/* Glow */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 blur-xl opacity-20 group-hover:opacity-40 transition" />
              </Button>
            </Link>

            <p className="text-xs text-gray-400">
              Make sure you’re ready before you begin
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};