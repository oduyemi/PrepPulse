import { airtableFetch, TABLES } from "@/lib/airtable";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await airtableFetch(TABLES.USERS, "", {
    method: "POST",
    body: JSON.stringify({
      records: [
        {
          fields: {
            firstname: body.firstName,
            surname: body.surname,
            email: body.email,
            password: body.password,
            track: body.jobInterest,
            level: body.skillLevel,
          },
        },
      ],
    }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    return NextResponse.json(
      { error: data.error?.message || "Failed to create user" },
      { status: 500 }
    );
  }

  return NextResponse.json(data.records[0]);
}