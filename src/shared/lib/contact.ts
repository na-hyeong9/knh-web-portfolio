export interface ContactFormValues {
  name: string;
  email: string;
  tel: string;
  message: string;
}

export const emptyContactForm: ContactFormValues = {
  name: "",
  email: "",
  tel: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues) {
  if (!values.name.trim()) {
    return "이름을 입력해주세요.";
  }

  if (!values.email.trim()) {
    return "이메일을 입력해주세요.";
  }

  if (!emailPattern.test(values.email.trim())) {
    return "올바른 이메일 형식을 입력해주세요.";
  }

  if (!values.message.trim()) {
    return "내용을 입력해주세요.";
  }

  return null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildContactEmailHtml(values: ContactFormValues) {
  const tel = values.tel.trim() || "미입력";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h1 style="margin-bottom: 24px; font-size: 24px;">포트폴리오 문의가 도착했습니다.</h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; width: 120px; font-weight: 700;">이름</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${escapeHtml(values.name.trim())}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 700;">이메일</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${escapeHtml(values.email.trim())}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 700;">전화번호</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb;">${escapeHtml(tel)}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 700;">내용</td>
            <td style="padding: 12px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(values.message.trim())}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `.trim();
}

export function buildContactEmailText(values: ContactFormValues) {
  const tel = values.tel.trim() || "미입력";

  return [
    "포트폴리오 문의가 도착했습니다.",
    "",
    `이름: ${values.name.trim()}`,
    `이메일: ${values.email.trim()}`,
    `전화번호: ${tel}`,
    "",
    "[내용]",
    values.message.trim(),
  ].join("\n");
}
