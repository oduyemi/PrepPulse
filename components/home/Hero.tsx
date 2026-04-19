"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";
import { AuthDialog } from "@/dialogs/AuthDialog";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[750px] h-[750px] 
                        bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 
                        blur-[100px] rounded-full" />

        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
      </div>

      {/* 📐 Layout Container */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 text-center flex flex-col items-center">

        {/* Badge */}
        <Badge className="mb-6 px-4 py-1.5 text-sm font-medium bg-white border border-gray-200 text-gray-700 shadow-sm">
          AI-Powered Interview Coach
        </Badge>

        {/* Heading */}
        <h1 className="
          w-full
          max-w-[320px] 
          sm:max-w-xl 
          md:max-w-2xl 
          lg:max-w-4xl
          font-semibold tracking-tight text-gray-900
          leading-[1.15]
          text-3xl 
          sm:text-4xl 
          md:text-5xl 
          lg:text-6xl
        ">
          From Practice to{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                           bg-clip-text text-transparent block sm:inline">
            Interview Confidence
          </span>
        </h1>

        {/* Description */}
        <p className="
          mt-5
          w-full
          max-w-[320px] 
          sm:max-w-lg 
          md:max-w-xl 
          lg:max-w-2xl
          text-gray-600
          leading-relaxed
          text-base 
          sm:text-lg
        ">
          Sharpen your responses, identify blind spots, and walk into interviews
          fully prepared with structured simulations and actionable feedback —
          all at your own pace.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <AuthDialog>
            <Button
              size="lg"
              className="group relative rounded-2xl px-8 py-6 text-base font-medium
                         bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                         shadow-[0_10px_25px_rgba(79,70,229,0.35)]
                         hover:shadow-[0_18px_35px_rgba(79,70,229,0.45)]
                         hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>

              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r 
                               from-indigo-600 to-purple-600 blur-lg opacity-30" />
            </Button>
          </AuthDialog>
        </div>

        {/* Trust */}
        <p className="mt-5 text-sm text-gray-500">
          No credit card required • 2-minute setup
        </p>

        {/* Preview */}
        <div className="mt-14 w-full max-w-5xl">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl p-2">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
};