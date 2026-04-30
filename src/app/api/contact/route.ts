import { NextResponse } from "next/server";
import {
  buildContactEmailHtml,
  buildContactEmailText,
  type ContactFormValues,
  validateContactForm,
} from "@/shared/lib/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const values = (await request.json()) as ContactFormValues;
  const validationError = validateContactForm(values);

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "메일 설정이 완료되지 않았습니다. RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL 값을 확인해주세요.",
      },
      { status: 500 },
    );
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: values.email.trim(),
      subject: `[Portfolio Contact] ${values.name.trim()}님의 문의`,
      html: buildContactEmailHtml(values),
      text: buildContactEmailText(values),
    }),
  });

  const result = (await resendResponse.json()) as {
    error?: { message?: string };
    id?: string;
  };

  if (!resendResponse.ok) {
    return NextResponse.json(
      {
        message:
          result.error?.message || "메일 발송 서비스 호출에 실패했습니다.",
      },
      { status: resendResponse.status },
    );
  }

  return NextResponse.json({ id: result.id, ok: true });
}
