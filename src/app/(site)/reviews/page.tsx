import type { Metadata } from "next";
import { getApprovedReviews, getReviewStats, safe } from "@/lib/queries";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { PageHero } from "@/components/PageHero";
import { Stars } from "@/components/Stars";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Reviews", description: "Reviews of Cometfront, and a form to leave your own." };

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([safe(getApprovedReviews(), []), safe(getReviewStats(), { count: 0, average: 0 })]);
  return (
    <>
      <PageHero eyebrow="Reviews" title="What people say" lead="Every review on this page was written by a real visitor and checked before it was published." />
      <section className="py-16 md:py-20">
        <div className="wrap">
          {stats.count > 0 && (
            <p className="mb-8 flex flex-wrap items-center gap-3 text-muted">
              <Stars rating={Math.round(stats.average)} className="h-5 w-5" />
              <span><strong className="text-ink">{stats.average.toFixed(1)}</strong> out of 5 from {stats.count} review{stats.count === 1 ? "" : "s"}</span>
            </p>
          )}
          {reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => <ReviewCard key={r.id} r={r} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">No reviews yet. Be the first to leave one below.</div>
          )}
        </div>
      </section>
      <section id="write" className="scroll-mt-20 border-t border-line bg-white py-16 md:py-20">
        <div className="wrap grid gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Leave a review</span>
            <h2 className="text-3xl">Worked with us? Tell us how it went.</h2>
            <p className="mt-3 text-muted">Your review will appear on this page after we check it. We never edit what you write.</p>
          </div>
          <ReviewForm />
        </div>
      </section>
    </>
  );
}
