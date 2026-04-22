import { NextResponse } from "next/server";
import { airtableFetch, TABLES } from "@/lib/airtable";


export const revalidate = 60;

const shuffle = (arr: any[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const fetchAllQuestions = async (formula: string) => {
  let all: any[] = [];
  let offset = "";

  do {
    const res = await airtableFetch(
      TABLES.QUESTIONS,
      `?filterByFormula=${encodeURIComponent(formula)}${
        offset ? `&offset=${offset}` : ""
      }`
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Airtable fetch failed");
    }

    all = [...all, ...(data.records || [])];
    offset = data.offset;
  } while (offset);

  return all;
};

const pick = (arr: any[], n: number) => shuffle(arr).slice(0, n);

const safePick = (arr: any[], n: number) =>
  arr.length >= n ? pick(arr, n) : arr;

/* =========================
   ROUTE
========================= */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const track = searchParams.get("track");
    const level = searchParams.get("level");
    

    if (!track || !level) {
      return NextResponse.json(
        { error: "Missing track or level" },
        { status: 400 }
      );
    }

    const normalizeTrack: Record<string, string> = {
      fullstack: "Fullstack Development",
      hr: "Human Resources",
      pm: "Project Management",
    };
    
    const normalizeLevel: Record<string, string> = {
      entry: "Entry",
      intermediate: "Intermediate",
      senior: "Senior",
    };

    if (!normalizeTrack[track]) {
      return NextResponse.json(
        { error: "Invalid track" },
        { status: 400 }
      );
    }

    if (!normalizeLevel[level]) {
      return NextResponse.json(
        { error: "Invalid level" },
        { status: 400 }
      );
    }

    const formula = `AND(
      {domain}="${normalizeTrack[track]}",
      {level}="${normalizeLevel[level]}",
      {is_active}=TRUE()
    )`

    const records = await fetchAllQuestions(formula);
    console.log("TRACK:", normalizeTrack[track]);
    console.log("LEVEL:", normalizeLevel[level]);
    console.log("FORMULA:", formula);
    console.log("RECORD COUNT:", records.length);

    const questions = records.map((q: any) => ({
      id: q.id,
      question: q.fields.question,
      options: [
        q.fields["option a"],
        q.fields["option b"],
        q.fields["option c"],
        q.fields["option d"],
      ],
      difficulty: Number(q.fields["difficulty score"] || 0),
    }));

    const easy = questions.filter((q) => q.difficulty <= 2);
    const medium = questions.filter((q) => q.difficulty === 3);
    const hard = questions.filter((q) => q.difficulty >= 4);

    let selected = [
      ...safePick(easy, 5),
      ...safePick(medium, 5),
      ...safePick(hard, 5),
    ];

    // Fill missing slots
    if (selected.length < 15) {
      const remaining = shuffle(questions).filter(
        (q) => !selected.includes(q)
      );
      selected = [...selected, ...remaining.slice(0, 15 - selected.length)];
    }

    return NextResponse.json(shuffle(selected));
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}