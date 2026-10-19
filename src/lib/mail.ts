// Sends website enquiries to the team inbox through Gmail.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD (a Google App Password, not the account password);
// ENQUIRY_TO defaults to GMAIL_USER.
import "server-only";
import { resolveMx } from "node:dns/promises";
import nodemailer from "nodemailer";
import { isValidEmail } from "@/lib/validation";

let transporter: nodemailer.Transporter | undefined;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return undefined;
  transporter ??= nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  return transporter;
}

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
      replyTo: replyTo && isValidEmail(replyTo) ? replyTo : undefined,
      subject,
      text: `${text}\n\nSent from the enquiry form on roguecode.in`,
    });
    return true;
  } catch (error) {
    console.error("[mail] sending failed:", error, subject, fields);
    return false;
  }
}

/**
 * True unless the email's domain definitely can't receive mail (a typo like gmial.com).
 * Network trouble or a slow lookup counts as "can receive", so we never block a real visitor.
 */
export async function emailDomainAcceptsMail(email: string): Promise<boolean> {
  const domain = email.split("@").pop()?.toLowerCase();
  if (!domain) return false;
  try {
    const records = await Promise.race([
      resolveMx(domain),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);
    return records === null || records.length > 0;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    return code !== "ENOTFOUND" && code !== "ENODATA";
  }
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Sends the visitor a "we've got it" email with a copy of what they sent.
 * Failure is logged but never shown to the visitor, because their enquiry already reached us.
 */
export async function sendConfirmationEmail({
  to,
  subject,
  name,
  intro,
  fields,
}: {
  to: string;
  subject: string;
  name: string;
  intro: string;
  fields: Record<string, string>;
}): Promise<boolean> {
  const mailer = getTransporter();
  if (!mailer || !isValidEmail(to)) return false;

  const firstName = name.split(/\s+/)[0];
  const rows = Object.entries(fields).filter(([, value]) => value);
  const text = [
    `Hi ${firstName},`,
    "",
    intro,
    "",
    "What you sent us:",
    ...rows.map(([label, value]) => `  ${label}: ${value}`),
    "",
    "Questions in the meantime? Just reply to this email.",
    "",
    "— Team Rogue Code",
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#18181b;font-size:15px;line-height:1.6">
  <div style="background:#0b0c10;color:#f5f5f4;padding:20px 24px;border-radius:12px 12px 0 0;font-weight:700;font-size:18px">rogue<span style="color:#f3b303">/</span>code</div>
  <div style="border:1px solid #e2e2df;border-top:0;border-radius:0 0 12px 12px;padding:24px">
    <p style="margin:0 0 12px">Hi ${escapeHtml(firstName)},</p>
    <p style="margin:0 0 20px">${escapeHtml(intro)}</p>
    <table style="width:100%;border-collapse:collapse;background:#f4f4f2;border-radius:8px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:8px 12px;color:#71717a;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="margin:20px 0 0">Questions in the meantime? Just reply to this email.</p>
    <p style="margin:16px 0 0">— Team Rogue Code</p>
  </div>
</div>`;

  try {
    await mailer.sendMail({
      from: `"Rogue Code" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: process.env.ENQUIRY_TO || process.env.GMAIL_USER,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error("[mail] confirmation failed:", error, to, subject);
    return false;
  }
}
