import { NextResponse } from "next/server";
import { airtableFetch, TABLES } from "@/lib/airtable";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, track, skillLevel, answers, questions, duration } = body;

    // =========================
    // NORMALIZE ANSWERS
    // =========================
    let parsedAnswers = answers;

    if (typeof parsedAnswers === "string") {
      try {
        parsedAnswers = JSON.parse(parsedAnswers);
      } catch {
        parsedAnswers = [];
      }
    }

    if (!Array.isArray(parsedAnswers)) {
      parsedAnswers = Object.entries(parsedAnswers || {}).map(
        ([questionIndex, selected]) => ({
          questionIndex: Number(questionIndex),
          selected,
        })
      );
    }

    if (!email || !questions?.length) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const normalizeLevel: Record<string, string> = {
      entry: "Entry",
      intermediate: "Intermediate",
      senior: "Senior",
    };
    
    const normalizedLevel = normalizeLevel[skillLevel] || skillLevel;

    // =========================
    // SCORE CALCULATION
    // =========================
    let correct = 0;

    questions.forEach((q: any, index: number) => {
      const ans = parsedAnswers.find(
        (a: any) => a.questionIndex === index
      );

      if (ans?.selected === q.correct_answer) {
        correct++;
      }
    });

    const total = questions.length;
    const score = Math.round((correct / total) * 100);

    // =========================
    // METRICS
    // =========================
    const accuracy = score;
    const safeDuration = Number(duration) || 0;
    const speed = Math.max(0, 100 - (safeDuration / 600) * 100);
    const consistency = Math.round(70 + Math.random() * 20);

    // =========================
    // READINESS
    // =========================
    let readiness_level = "Beginner";
    if (score >= 70) readiness_level = "Interview Ready";
    else if (score >= 40) readiness_level = "Developing";

    // =========================
    // AREAS
    // =========================
    const wrong = questions.filter((q: any, index: number) => {
      const ans = parsedAnswers.find(
        (a: any) => a.questionIndex === index
      );
      return ans?.selected !== q.correct_answer;
    });

    const correctQs = questions.filter((q: any, index: number) => {
      const ans = parsedAnswers.find(
        (a: any) => a.questionIndex === index
      );
      return ans?.selected === q.correct_answer;
    });

    const weak_areas = [
      ...new Set(wrong.map((q: any) => q.subtopic).filter(Boolean)),
    ].join(", ");

    const strong_areas = [
      ...new Set(correctQs.map((q: any) => q.subtopic).filter(Boolean)),
    ].join(", ");

    // =========================
    // FEEDBACK
    // =========================
    let coach_feedback = "";
    let nextstep_suggestion = "Retry";

    if (score < 40) {
      coach_feedback = "Focus on foundational concepts before retrying.";
      nextstep_suggestion = "Fundamentals";
    } else if (score < 70) {
      coach_feedback = "You’re improving. Work on weak areas and retry.";
      nextstep_suggestion = "Retry";
    } else {
      coach_feedback = "Strong performance. Proceed to advanced challenges.";
      nextstep_suggestion = "Advance";
    }

    // =========================
    // SAVE TO AIRTABLE
    // =========================
    const saveRes = await airtableFetch(TABLES.TESTS, "", {
      method: "POST",
      body: JSON.stringify({
        records: [
          {
            fields: {
              email,
              track,
              duration: safeDuration,

              // ✅ FIXED DATE FORMAT
              completed_at: new Date().toISOString().split("T")[0],

              score,
              correct_answers: correct,
              total_questions: total,
              accuracy,
              speed,
              consistency,
              readiness_level,
              skilllevel_snapshot: normalizedLevel,
              weak_areas,
              strong_areas,
              coach_feedback,
              nextstep_suggestion,
            },
          },
        ],
      }),
    });

    let saveData;
    try {
      saveData = await saveRes.json();
    } catch (e) {
      console.error("Airtable JSON parse failed:", e);
      throw new Error("Invalid Airtable response");
    }
    
    if (!saveRes.ok) {
      console.error("❌ Airtable Error FULL:", saveData);
      return NextResponse.json(
        { error: saveData.error?.message || "Failed to save result" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      score,
      correct,
      total,
      accuracy,
      speed,
      consistency,
      readiness_level,
      weak_areas,
      strong_areas,
      coach_feedback,
      nextstep_suggestion,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}