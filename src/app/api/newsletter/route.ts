import { NextRequest, NextResponse } from "next/server";

interface Body {
  firstname?: string;
  lastname?: string;
  email?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const body: Body = await req.json();
  const errors: Partial<Body> = {};

  if (!body.firstname?.trim()) errors.firstname = "Förnamn är obligatoriskt.";
  if (!body.lastname?.trim()) errors.lastname = "Efternamn är obligatoriskt.";
  if (!body.email?.trim()) {
    errors.email = "E-postadress är obligatorisk.";
  } else if (!isValidEmail(body.email)) {
    errors.email = "Ange en giltig e-postadress.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 403 });
  }

  return NextResponse.json(
    { message: "Tack! Du är nu registrerad för vårt nyhetsbrev." },
    { status: 200 }
  );
}