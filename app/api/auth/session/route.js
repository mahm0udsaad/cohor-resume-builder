import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/firebase";

export async function POST(request) {
  const { idToken } = await request.json();

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create session" },
      { status: 401 },
    );
  }
}

export async function DELETE() {
  cookies().delete("session");
  return NextResponse.json({ status: "success" }, { status: 200 });
}
