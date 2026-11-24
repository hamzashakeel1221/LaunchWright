"use server";
import { z } from "zod";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

export type FormState = { ok: boolean; message: string; errors?: Record<string, string> } | null;

const optional = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => (v ? v : null));

function fieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Very small in-memory throttle. Good enough to slow down casual spam on a small site. */
const hits = new Map<string, number[]>();
async function tooMany(kind: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown").split(",")[0].trim();
  const key = `${kind}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > limit;
}

const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  businessName: optional(120),
  rating: z.coerce.number().int().min(1, "Please choose a rating.").max(5),
  comment: z.string().trim().min(10, "Please write at least 10 characters.").max(2000),
});

export async function submitReview(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get("website")) return { ok: true, message: "Thank you! Your review will appear once it's approved." }; // honeypot
  const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };
  if (await tooMany("review", 3)) return { ok: false, message: "Too many reviews from your connection. Please try again later." };

  await prisma.review.create({ data: parsed.data });
  return { ok: true, message: "Thank you! Your review will appear on the site once it's approved." };
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(190),
  phone: optional(40),
  businessName: optional(120),
  country: optional(80),
  service: optional(80),
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters).").max(5000),
});

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get("website")) return { ok: true, message: "Thanks! We'll get back to you soon." }; // honeypot
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: "Please fix the highlighted fields.", errors: fieldErrors(parsed.error) };
  if (await tooMany("contact", 5)) return { ok: false, message: "Too many messages from your connection. Please try again later or use WhatsApp." };

  await prisma.contactMessage.create({ data: parsed.data });
  return { ok: true, message: "Thanks! Your message has been sent. We'll get back to you within 24 hours." };
}
