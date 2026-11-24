import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Dashboard() {
  const [projects, pending, approved, newMsgs, totalMsgs, latestMsgs, latestReviews] = await Promise.all([
    prisma.project.count(),
    prisma.review.count({ where: { status: "PENDING" } }),
    prisma.review.count({ where: { status: "APPROVED" } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.review.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "New messages", value: newMsgs, sub: `${totalMsgs} total`, href: "/admin/messages", hot: newMsgs > 0 },
    { label: "Reviews waiting", value: pending, sub: `${approved} published`, href: "/admin/reviews", hot: pending > 0 },
    { label: "Projects", value: projects, sub: "Add or remove", href: "/admin/projects" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={`card p-5 transition hover:-translate-y-0.5 ${s.hot ? "border-flame" : ""}`}>
            <span className="text-sm font-medium text-muted">{s.label}</span>
            <span className={`mt-1 block font-display text-4xl font-bold ${s.hot ? "text-flame-dark" : "text-ink"}`}>{s.value}</span>
            <span className="text-sm text-muted">{s.sub}</span>
          </Link>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-lg">Latest messages</h2><Link href="/admin/messages" className="text-sm font-medium text-flame-dark">View all</Link></div>
          {latestMsgs.length === 0 ? <p className="text-sm text-muted">No messages yet.</p> : (
            <ul className="divide-y divide-line">
              {latestMsgs.map((m) => (
                <li key={m.id}>
                  <Link href={`/admin/messages/${m.id}`} className="flex items-center justify-between gap-3 py-3 hover:text-flame-dark">
                    <span className="min-w-0"><span className="block truncate font-medium">{m.name}{m.businessName ? ` · ${m.businessName}` : ""}</span><span className="block truncate text-sm text-muted">{m.message}</span></span>
                    {m.status === "NEW" && <span className="rounded-full bg-flame px-2 py-0.5 text-xs font-semibold text-white">New</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-lg">Reviews waiting for approval</h2><Link href="/admin/reviews" className="text-sm font-medium text-flame-dark">View all</Link></div>
          {latestReviews.length === 0 ? <p className="text-sm text-muted">Nothing waiting.</p> : (
            <ul className="divide-y divide-line">
              {latestReviews.map((r) => (
                <li key={r.id} className="py-3"><span className="font-medium">{r.name}</span> <span className="text-flame">{"★".repeat(r.rating)}</span><span className="block truncate text-sm text-muted">{r.comment}</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
