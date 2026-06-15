import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { responses, sessionId, email } = await req.json();

  const fieldMap: Record<string, string> = {
    country: "fldpmAdlHqwe9PsCS",
    role: "fldO5uCGgefs7gpRa",
    "build-goal": "fldXVQk3ouHwAr3hx",
    "ai-journey": "fld05GrR98I7o28pc",
    "ai-experience": "fldbrAiv6dWIXAVwn",
    "learning-history": "fldn21ariYL7s0moq",
    "ai-goals": "fldjAyOibMPBESy3Y",
    "team-size": "fld0btfsVQ4gCxiO1",
    "compute-experience": "fld1YpOi7NBcyO59C",
  };

  const fields: Record<string, any> = {
    fldPSqbodvtYcTqc1: sessionId,
    fldrxV7JnxDL7HR1s: email || `${sessionId}@placeholder.ai`, // Use actual email if provided
    fldDEhp5uQe7DHjIk: new Date().toISOString(),
  };

  responses.forEach((r: any) => {
    const fieldId = fieldMap[r.questionId];
    if (fieldId) {
      fields[fieldId] = r.answerText;
    }
  });

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${process.env.NEXT_PRIVATE_AIRTABLE_BASE_ID}/${process.env.NEXT_PRIVATE_AIRTABLE_TABLE_NAME}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PRIVATE_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields, typecast: true }),
      },
    );

    if (!res.ok) throw new Error(await res.text());
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Airtable save failed", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
