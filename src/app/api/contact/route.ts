import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, serviceType, languagePair, message } = body;
    if (!name || !email || !serviceType || !languagePair || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    await sendContactEmail({
      name,
      email,
      phone: body.phone || undefined,
      serviceType,
      languagePair,
      documentType: body.documentType || undefined,
      pages: body.pages ? parseInt(body.pages) : undefined,
      urgent: body.urgent === true,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
