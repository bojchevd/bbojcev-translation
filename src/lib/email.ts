import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  languagePair: string;
  documentType?: string;
  pages?: number;
  urgent: boolean;
  message: string;
}) {
  const to = process.env.CONTACT_EMAIL || "biljanabojcev@gmail.com";

  const html = `
    <h2>New Translation Quote Request</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;font-weight:bold">Name:</td><td style="padding:8px">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Email:</td><td style="padding:8px">${escapeHtml(data.email)}</td></tr>
      ${data.phone ? `<tr><td style="padding:8px;font-weight:bold">Phone:</td><td style="padding:8px">${escapeHtml(data.phone)}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold">Service:</td><td style="padding:8px">${escapeHtml(data.serviceType)}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Language Pair:</td><td style="padding:8px">${escapeHtml(data.languagePair)}</td></tr>
      ${data.documentType ? `<tr><td style="padding:8px;font-weight:bold">Document Type:</td><td style="padding:8px">${escapeHtml(data.documentType)}</td></tr>` : ""}
      ${data.pages ? `<tr><td style="padding:8px;font-weight:bold">Pages:</td><td style="padding:8px">${data.pages}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold">Urgent:</td><td style="padding:8px">${data.urgent ? "Yes" : "No"}</td></tr>
    </table>
    <h3>Message:</h3>
    <p>${escapeHtml(data.message)}</p>
  `;

  return resend.emails.send({
    from: "Website <onboarding@resend.dev>",
    to,
    replyTo: data.email,
    subject: `New Quote Request: ${data.serviceType} — ${data.name}`,
    html,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
