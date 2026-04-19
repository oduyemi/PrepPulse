import { airtableFetch } from "@/lib/airtable";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { email, password } = await req.json();

  const formula = `AND({email}="${email}", {password}="${password}")`;

  const res = await airtableFetch(`?filterByFormula=${encodeURIComponent(formula)}`);
  const data = await res.json();

  if (data.records.length === 0) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json(data.records[0]);
}