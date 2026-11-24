import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteReview, setReviewStatus } from "../../actions";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";
import { Stars } from "@/components/Stars";

export const metadata = { title: "Reviews" };

const tabs = [
  { key: "PENDING", label: "Waiting" },
  { key: "APPROVED", label: "Published" },
  { key: "REJECTED", label: "Rejected" },
] as const;
type Status = (typeof tabs)[number]["key"];

function StatusForm({ id, status, label, className }: { id: number; status: Status; label: string; className: string }) {
  return (
    <form action={setReviewStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <SubmitButton className={className}>{label}</SubmitButton>
    </form>
  );
}

export default async function AdminReviews({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const sp = await searchParams;
  const status: Status = tabs.some((t) => t.key === sp.status) ? (sp.status as Status) : "PENDING";
  const [reviews, counts] = await Promise.all([
    prisma.review.findMany({ where: { status }, orderBy: { createdAt: "desc" } }),
    prisma.review.groupBy({ by: ["status"], _count: true }),
  ]);
  const count = (s: Status) => counts.find((c) => c.status === s)?._count ?? 0;
  const small = "btn !px-4 !py-2 text-sm";

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Reviews</h1>
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <Link key={t.key} href={`/admin/reviews?status=${t.key}`} className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ${status === t.key ? "bg-ink text-white" : "bg-white text-ink"}`}>
            {t.label} ({count(t.key)})
          </Link>
        ))}
      </div>
      {reviews.length === 0 ? (
        <div className="card p-10 text-center text-muted">No reviews here.</div>
      ) : (
        <ul className="grid gap-4">
          {reviews.map((r) => (
            <li key={r.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-semibold">{r.name}</span>
                  {r.businessName && <span className="text-muted"> · {r.businessName}</span>}
                </div>
                <span className="text-sm text-muted">{r.createdAt.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}</span>
              </div>
              <div className="mt-2"><Stars rating={r.rating} /></div>
              <p className="mt-3 whitespace-pre-line">{r.comment}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {status !== "APPROVED" && <StatusForm id={r.id} status="APPROVED" label="Approve" className={`${small} bg-teal text-white`} />}
                {status !== "REJECTED" && <StatusForm id={r.id} status="REJECTED" label={status === "APPROVED" ? "Unpublish" : "Reject"} className={`${small} border border-line bg-white`} />}
                {status !== "PENDING" && <StatusForm id={r.id} status="PENDING" label="Move to waiting" className={`${small} border border-line bg-white`} />}
                <form action={deleteReview}>
                  <input type="hidden" name="id" value={r.id} />
                  <ConfirmButton message="Delete this review permanently?" className={`${small} bg-red-50 text-red-700 hover:bg-red-100`}>Delete</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
