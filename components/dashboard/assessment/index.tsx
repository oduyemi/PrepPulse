"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";


export const Assessment = () => {
  const questions = [
    {
      question: "What does useEffect do in React?",
      options: [
        "Handles side effects",
        "Manages routing",
        "Stores global state",
        "Compiles JSX",
      ],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [time, setTime] = useState(8 * 60 + 21);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const q = questions[current];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-2xl rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Question {current + 1} / {questions.length}
            </span>

            <div className="flex items-center gap-2 font-medium text-gray-800">
              <Clock className="h-4 w-4" />
              {formatTime(time)}
            </div>
          </div>

          {/* Question */}
          <h2 className="text-lg font-semibold text-gray-900">
            {q.question}
          </h2>

          {/* Options */}
          <RadioGroup
            value={selected || ""}
            onValueChange={(val) => setSelected(val)}
            className="space-y-3"
          >
            {q.options.map((opt, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 p-3 border rounded-xl hover:bg-gray-50 transition"
              >
                <RadioGroupItem value={opt} id={opt} />
                <Label htmlFor={opt} className="cursor-pointer w-full">
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              disabled={current === 0}
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="outline">Next</Button>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
