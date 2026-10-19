// Sends website enquiries to the team inbox through Gmail.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD (a Google App Password, not the account password);
// ENQUIRY_TO defaults to GMAIL_USER.
import "server-only";
import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | undefined;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return undefined;
  transporter ??= nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  return transporter;
}

const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * Emails an enquiry as a plain-text list of fields. Returns false if mail isn't configured or
 * sending failed, so the form can tell the visitor instead of pretending it went through.
 */
export async function sendEnquiryEmail(
  subject: string,
  fields: Record<string, string>,
  replyTo?: string,
): Promise<boolean> {
  const mailer = getTransporter();
  if (!mailer) {
    console.error("[mail] GMAIL_USER / GMAIL_APP_PASSWORD not set — enquiry not emailed:", subject, fields);
    return false;
  }

  const text = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value || "—"}`)
    .join("\n");

  try {
    await mailer.sendMail({
      from: `"Rogue Code website" <${process.env.GMAIL_USER}>`,
      to: process.env.ENQUIRY_TO || process.env.GMAIL_USER,
      replyTo: replyTo && looksLikeEmail(replyTo) ? replyTo : undefined,
      subject,
      text: `${text}\n\nSent from the enquiry form on roguecode.in`,
    });
    return true;
  } catch (error) {
    console.error("[mail] sending failed:", error, subject, fields);
    return false;
  }
}
