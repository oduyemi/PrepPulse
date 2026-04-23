"use client";


import { useState } from "react";
import { CheckCircle } from "lucide-react";

export const CourseViewer = ({ course }: any) => {
  const [index, setIndex] = useState(0);
  const module = course.modules[index];

  const progress = ((index + 1) / course.modules.length) * 100;

  return (
    <div className="grid md:grid-cols-4 gap-8">

      {/* SIDEBAR */}
      <div className="bg-white rounded-2xl border p-4 space-y-2 h-fit sticky top-6">
        <h3 className="text-sm font-semibold mb-2">Modules</h3>

        {course.modules.map((m: any, i: number) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition
              ${
                i === index
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-gray-50"
              }`}
          >
            <span className="truncate">{m.title}</span>
            {i < index && (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="md:col-span-3 space-y-6">

        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>
              Module {index + 1} of {course.modules.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 space-y-4">
          <h2 className="text-2xl font-semibold">{module.title}</h2>

          {module.image && (
            <img
              src={module.image}
              className="rounded-xl w-full object-cover"
            />
          )}

          <p className="text-gray-600 leading-relaxed">
            {module.content}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            disabled={index === 0}
            onClick={() => setIndex((i) => i - 1)}
            className="text-sm text-gray-500 disabled:opacity-30"
          >
            Previous
          </button>

          <button
            disabled={index === course.modules.length - 1}
            onClick={() => setIndex((i) => i + 1)}
            className="text-sm text-indigo-600 font-medium disabled:opacity-30"
          >
            Next Module
          </button>
        </div>

      </div>
    </div>
  );
};