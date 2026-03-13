import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, interests, business } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Log submission for now — replace with email delivery or database write
    // when RESEND_API_KEY or DATABASE_URL are configured
    console.log("[MOCO Interest]", {
      name,
      email,
      business: business || "N/A",
      interests: interests?.length ? interests.join(", ") : "None selected",
      timestamp: new Date().toISOString(),
    });

    // TODO: Send notification email via Resend when API key is configured
    // const resendKey = process.env.RESEND_API_KEY;
    // if (resendKey) {
    //   await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${resendKey}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       from: "MOCO <noreply@askmoco.com>",
    //       to: "moco@askmoco.com",
    //       subject: `New Early Access Signup: ${name}`,
    //       html: `<p><strong>Name:</strong> ${name}</p>
    //              <p><strong>Email:</strong> ${email}</p>
    //              <p><strong>Business:</strong> ${business || "N/A"}</p>
    //              <p><strong>Interests:</strong> ${interests?.join(", ") || "None"}</p>`,
    //     }),
    //   });
    // }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
