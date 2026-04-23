import { NextResponse } from "next/server";
import { airtableFetch, TABLES } from "@/lib/airtable";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const formula = `({email} = "${email}")`;

  const res = await airtableFetch(
    TABLES.TESTS,
    `?filterByFormula=${encodeURIComponent(formula)}&sort[0][field]=completed_at&sort[0][direction]=desc`
  );

  const data = await res.json();

  console.log("AIRTABLE RAW HISTORY:", data);

  return NextResponse.json(data.records || []);
}