"use client";
import { CheckCircle } from "lucide-react";

export const Process = () => {
  const steps = [
    {
      title: "Simulate",
      desc: "Practice real interview scenarios tailored to your role.",
    },
    {
      title: "Analyze",
      desc: "Receive structured feedback on your performance and responses.",
    },
    {
      title: "Improve",
      desc: "Follow targeted steps to close gaps and build confidence.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      {/* 🔒 Alignment container */}
      <div className="mx-auto max-w-6xl px-6 flex flex-col items-center">

        {/* 🧠 Header block (single alignment system) */}
        <div className="w-full max-w-2xl text-center">
          <h2 className="
            text-2xl sm:text-3xl md:text-4xl 
            font-semibold tracking-tight text-gray-900
          ">
            A Better Way to Prepare
          </h2>

          <p className="
            mt-4
            text-sm sm:text-base 
            leading-relaxed 
            text-gray-600
          ">
            A simple, structured workflow designed to help you move from practice
            to real interview confidence.
          </p>
        </div>

        {/* 📦 Steps */}
        <div className="
          mt-16
          w-full
          grid gap-8
          sm:grid-cols-2
          md:grid-cols-3
        ">
          {steps.map((step, i) => (
            <div
              key={i}
              className="
                relative
                h-full
                p-6
                rounded-2xl
                border border-gray-200
                bg-white
                text-left
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-md
              "
            >
              {/* Step number */}
              <div className="mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 text-xs font-semibold rounded-full bg-indigo-600 text-white">
                  {i + 1}
                </span>
                <CheckCircle className="h-5 w-5 text-indigo-600" />
              </div>

              {/* Title */}
              <h4 className="text-base font-semibold text-gray-900">
                {step.title}
              </h4>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};