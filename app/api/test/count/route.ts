import { NextResponse } from "next/server";
import { airtableFetch, TABLES } from "@/lib/airtable";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const safeEmail = email.trim().toLowerCase();

  const formula = `LOWER({email})="${safeEmail}"`;

  const res = await airtableFetch(
    TABLES.TESTS,
    `?filterByFormula=${encodeURIComponent(formula)}&pageSize=100`
  );

  const data = await res.json();

  const count = Array.isArray(data.records) ? data.records.length : 0;

  return NextResponse.json({ count });
}