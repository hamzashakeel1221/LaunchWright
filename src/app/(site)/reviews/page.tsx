import type { Metadata } from "next";
import { getApprovedReviews, getReviewStats, safe } from "@/lib/queries";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewForm } from "@/components/ReviewForm";
import { PageHero } from "@/components/PageHero";
import { Stars } from "@/components/Stars";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMeta({
  title: "Client Reviews",
  description: "Read reviews from businesses that worked with WebDoorstep on their website, and leave your own review.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([safe(getApprovedReviews(), []), safe(getReviewStats(), { count: 0, average: 0 })]);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }])} />
      <PageHero
        eyebrow="Reviews"
        title={<>What our clients <span className="text-gradient">say</span></>}
        lead="Every review on this page was written by a real visitor and checked before it was published."
        crumbs={[{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }]}
      >
        {stats.count > 0 && (
          <p className="animate-rise mt-8 flex flex-wrap items-center gap-3 text-fog [animation-delay:240ms]">
            <Stars rating={Math.round(stats.average)} className="h-5 w-5" />
            <span><strong className="text-white">{stats.average.toFixed(1)}</strong> out of 5 from {stats.count} review{stats.count === 1 ? "" : "s"}</span>
          </p>
        )}
      </PageHero>
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          {reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => <Reveal key={r.id} delay={(i % 3) * 80}><ReviewCard r={r} /></Reveal>)}
            </div>
          ) : (
            <div className="panel p-10 text-center text-fog">No reviews yet. Be the first to leave one below.</div>
          )}
        </div>
      </section>
      <section id="write" className="scroll-mt-24 border-t border-white/[.06] py-20 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Leave a review</span>
            <h2 className="text-3xl font-bold sm:text-4xl">Worked with us? Tell us how it went.</h2>
            <p className="mt-4 text-fog">Your review will appear on this page after we check it. We never edit what you write.</p>
          </div>
          <ReviewForm />
        </div>
      </section>
    </>
  );
}
