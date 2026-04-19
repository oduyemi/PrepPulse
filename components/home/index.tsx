"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, BarChart3, Brain, Target } from "lucide-react";
import Link from "next/link";

export const Landing = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <Badge className="mb-4">Interview Prep, Reimagined</Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Master Interviews <br />
          <span className="text-gray-500">At Your Own Pace</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Assess your skills, uncover gaps, and improve with structured tests
          and personalized coaching feedback.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" className="rounded-2xl">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-2xl">
            Try Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <Brain className="h-6 w-6 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Skill Assessment</h3>
            <p className="text-gray-600">
              Take structured tests tailored to real interview scenarios and
              evaluate your readiness instantly.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <Target className="h-6 w-6 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Gap Analysis</h3>
            <p className="text-gray-600">
              Identify weak areas and focus on what matters most for your
              success.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <BarChart3 className="h-6 w-6 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">
              Monitor improvement over time with clear, actionable insights.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              "Take a diagnostic test",
              "Get AI-powered feedback",
              "Improve with targeted practice",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 mt-1" />
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Preparing Smarter Today
        </h2>
        <p className="mt-4 text-gray-600">
          Join candidates who are improving faster with structured interview
          preparation.
        </p>

        <div className="mt-8">
          <Button size="lg" className="rounded-2xl">
            Create Free Account
          </Button>
        </div>
      </section>
    </main>
  );
}
