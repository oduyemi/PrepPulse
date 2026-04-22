import { NextResponse } from "next/server";
import { airtableFetch, TABLES } from "@/lib/airtable";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      track,
      skillLevel,
      answers,
      questions,
      duration,
    } = body;

    /* =========================
       VALIDATION
    ========================= */
    if (
      !email ||
      !track ||
      !skillLevel ||
      !answers ||
      !questions ||
      !Array.isArray(questions)
    ) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    const total = questions.length;
    let correct = 0;

    /* =========================
       SCORE CALCULATION
       answers = { 0: "A", 1: "B" }
    ========================= */
    questions.forEach((q: any, index: number) => {
      const selected = answers[index];

      // IMPORTANT: your generate route MUST include correct_answer
      if (selected && selected === q.correct_answer) {
        correct++;
      }
    });

    const score = Math.round((correct / total) * 100);

    /* =========================
       METRICS
    ========================= */
    const accuracy = score;

    const safeDuration = Number(duration) || 0;
    const speed = Math.max(0, 100 - (safeDuration / 600) * 100);

    const consistency = Math.round(70 + Math.random() * 20);

    /* =========================
       READINESS
    ========================= */
    let readiness_level = "Beginner";

    if (score >= 70) readiness_level = "Interview Ready";
    else if (score >= 40) readiness_level = "Developing";

    /* =========================
       AREAS
    ========================= */
    const wrong: any[] = [];
    const correctQs: any[] = [];

    questions.forEach((q: any, index: number) => {
      const selected = answers[index];

      if (selected === q.correct_answer) {
        correctQs.push(q);
      } else {
        wrong.push(q);
      }
    });

    const weak_area = [
      ...new Set(wrong.map((q: any) => q.subtopic).filter(Boolean)),
    ].join(", ");

    const strong_areas = [
      ...new Set(correctQs.map((q: any) => q.subtopic).filter(Boolean)),
    ].join(", ");

    /* =========================
       FEEDBACK
    ========================= */
    let coach_feedback = "";
    let nextstep_suggestion = "Retry";

    if (score < 40) {
      coach_feedback =
        "Focus on foundational concepts before retrying.";
      nextstep_suggestion = "Fundamentals";
    } else if (score < 70) {
      coach_feedback =
        "You’re improving. Work on weak areas and retry.";
      nextstep_suggestion = "Retry";
    } else {
      coach_feedback =
        "Strong performance. Proceed to advanced challenges.";
      nextstep_suggestion = "Advance";
    }

    /* =========================
       PREVIOUS ATTEMPTS
    ========================= */
    const prevRes = await airtableFetch(
      TABLES.TESTS,
      `?filterByFormula=${encodeURIComponent(
        `{email}="${email}"`
      )}&sort[0][field]=completed_at&sort[0][direction]=desc`
    );

    const prevData = await prevRes.json();
    const attempts = prevData.records || [];

    const previousScore = attempts[0]?.fields?.score ?? null;

    const scoreDelta =
      previousScore !== null ? score - previousScore : 0;

    /* =========================
       SAVE
    ========================= */
    await airtableFetch(TABLES.TESTS, "", {
      method: "POST",
      body: JSON.stringify({
        records: [
          {
            fields: {
              email,
              track,
              duration: safeDuration,
              completed_at: new Date().toISOString(),

              score,
              correct_answers: correct,
              total_questions: total,

              accuracy,
              speed,
              consistency,

              readiness_level,
              skilllevel_snapshot: skillLevel,

              weak_area,
              strong_areas,

              coach_feedback,
              nextstep_suggestion,

              previousScore,
              scoreDelta,
            },
          },
        ],
      }),
    });

    /* =========================
       RESPONSE
    ========================= */
    return NextResponse.json({
      score,
      correct,
      total,
      accuracy,
      speed,
      consistency,
      readiness_level,
      weak_area,
      strong_areas,
      coach_feedback,
      nextstep_suggestion,
      scoreDelta,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}