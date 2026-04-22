import { NextResponse } from "next/server";
import { airtableTestFetch, TABLES } from "@/lib/airtable";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const formula = `{email}="${email}"`;
  const res = await airtableTestFetch(
    TABLES.TESTS,
    `?filterByFormula=${encodeURIComponent(formula)}&sort[0][field]=completed_at&sort[0][direction]=desc&maxRecords=1`
  );

  const data = await res.json();
  return NextResponse.json(data.records?.[0] || null);
}