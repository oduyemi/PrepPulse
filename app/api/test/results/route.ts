import { NextResponse } from "next/server";
import { airtableFetch, TABLES } from "@/lib/airtable";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Airtable filter formula
    const formula = `filterByFormula={email}="${email}"&sort[0][field]=createdTime&sort[0][direction]=desc`;

    const res = await airtableFetch(
      TABLES.TESTS,
      `?${formula}`
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Airtable fetch error:", data);
      return NextResponse.json(
        { error: "Failed to fetch results" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.records || []);

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}