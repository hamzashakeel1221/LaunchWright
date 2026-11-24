"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { safeEqual, verifyPassword } from "@/lib/password";
import { SESSION_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/session";

/* ---------- Auth ---------- */

const loginAttempts = new Map<string, number[]>();

export async function login(_prev: { error?: string; email?: string } | null, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const now = Date.now();
  const recent = (loginAttempts.get(email) ?? []).filter((t) => now - t < 15 * 60 * 1000);
  if (recent.length >= 5) return { error: "Too many attempts. Please wait 15 minutes and try again.", email };

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const plain = process.env.ADMIN_PASSWORD; // simpler option: password kept only in the host's secret settings
  const ok =
    !!adminEmail &&
    email === adminEmail &&
    (hash ? verifyPassword(password, hash) : !!plain && plain.length >= 10 && safeEqual(password, plain));
  if (!ok) {
    recent.push(now);
    loginAttempts.set(email, recent);
    return { error: "Wrong email or password.", email };
  }
  loginAttempts.delete(email);
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(adminEmail), sessionCookieOptions);
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ---------- Projects ---------- */

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 150) || "project";

async function uniqueSlug(base: string, excludeId?: number) {
  let slug = base;
  for (let i = 2; ; i++) {
    const hit = await prisma.project.findUnique({ where: { slug }, select: { id: true } });
    if (!hit || hit.id === excludeId) return slug;
    slug = `${base}-${i}`;
  }
}

const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is required.").max(160),
  category: z.string().trim().min(2, "Category is required.").max(80),
  description: z.string().trim().min(10, "Description should be at least 10 characters.").max(10000),
  liveUrl: z
    .string()
    .trim()
    .max(500)
    .refine((v) => !v || /^https?:\/\//i.test(v), "Link must start with http:// or https://")
    .transform((v) => v || null),
  sortOrder: z.coerce.number().int().min(-1000).max(1000).default(0),
});

export type ProjectFormState = { error?: string; errors?: Record<string, string> } | null;

function revalidateProjects(slug?: string) {
  revalidatePath("/");
  revalidatePath("/projects");
  if (slug) revalidatePath(`/projects/${slug}`);
}

export async function saveProject(_prev: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  await requireAdmin();
  const id = Number(formData.get("id")) || undefined;

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    liveUrl: formData.get("liveUrl") ?? "",
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return { error: "Please fix the highlighted fields.", errors };
  }

  const file = formData.get("image");
  let imageData: { mimeType: string; data: Uint8Array<ArrayBuffer> } | null = null;
  if (file instanceof File && file.size > 0) {
    if (!IMAGE_TYPES.includes(file.type)) return { error: "Image must be JPG, PNG, WebP, AVIF or GIF." };
    if (file.size > MAX_IMAGE_BYTES) return { error: "Image must be 4 MB or smaller." };
    imageData = { mimeType: file.type, data: new Uint8Array(await file.arrayBuffer()) };
  }
  if (!id && !imageData) return { error: "Please choose a cover image." };

  const data = {
    ...parsed.data,
    isSample: formData.get("isSample") === "on",
    published: formData.get("published") === "on",
  };

  let slug: string;
  if (id) {
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return { error: "Project not found." };
    slug = existing.title === data.title ? existing.slug : await uniqueSlug(slugify(data.title), id);
    await prisma.$transaction(async (tx) => {
      let imageId = existing.imageId;
      if (imageData) {
        const img = await tx.image.create({ data: imageData });
        imageId = img.id;
      }
      await tx.project.update({ where: { id }, data: { ...data, slug, imageId } });
      if (imageData && existing.imageId) await tx.image.delete({ where: { id: existing.imageId } });
    });
    if (existing.slug !== slug) revalidatePath(`/projects/${existing.slug}`);
  } else {
    slug = await uniqueSlug(slugify(data.title));
    await prisma.$transaction(async (tx) => {
      const img = await tx.image.create({ data: imageData! });
      await tx.project.create({ data: { ...data, slug, imageId: img.id } });
    });
  }

  revalidateProjects(slug);
  redirect("/admin/projects?saved=1");
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) return;
  await prisma.$transaction(async (tx) => {
    await tx.project.delete({ where: { id } });
    if (p.imageId) await tx.image.delete({ where: { id: p.imageId } });
  });
  revalidateProjects(p.slug);
}

export async function toggleProjectPublished(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) return;
  await prisma.project.update({ where: { id }, data: { published: !p.published } });
  revalidateProjects(p.slug);
}

/* ---------- Reviews ---------- */

function revalidateReviews() {
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin", "layout");
}

export async function setReviewStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = z.enum(["PENDING", "APPROVED", "REJECTED"]).parse(formData.get("status"));
  await prisma.review.update({ where: { id }, data: { status, reviewedAt: status === "PENDING" ? null : new Date() } });
  revalidateReviews();
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();
  await prisma.review.delete({ where: { id: Number(formData.get("id")) } });
  revalidateReviews();
}

/* ---------- Contact messages ---------- */

export async function setMessageStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const status = z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]).parse(formData.get("status"));
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/admin", "layout");
}

export async function saveMessageNotes(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const notes = String(formData.get("adminNotes") ?? "").slice(0, 5000);
  await prisma.contactMessage.update({ where: { id }, data: { adminNotes: notes || null } });
  revalidatePath(`/admin/messages/${id}`);
}

export async function deleteMessage(formData: FormData) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/admin", "layout");
  redirect("/admin/messages");
}
