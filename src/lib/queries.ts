import "server-only";
import { prisma } from "./db";

const projectCardSelect = {
  slug: true, title: true, category: true, description: true, isSample: true, imageId: true,
} as const;

export function getPublishedProjects(take?: number) {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: projectCardSelect,
    take,
  });
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({ where: { slug, published: true } });
}

export function getApprovedReviews(take?: number) {
  return prisma.review.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, businessName: true, rating: true, comment: true, createdAt: true },
    take,
  });
}

export async function getReviewStats() {
  const agg = await prisma.review.aggregate({
    where: { status: "APPROVED" },
    _avg: { rating: true },
    _count: true,
  });
  return { count: agg._count, average: agg._avg.rating ?? 0 };
}

/** Public pages are cached; if the database is unreachable (e.g. at build time) show empty lists instead of failing. */
export async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p;
  } catch (err) {
    console.error("[db]", err instanceof Error ? err.message : err);
    return fallback;
  }
}
