import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata = { title: "Messages" };

const tabs = [
  { key: "ACTIVE", label: "Inbox" },
  { key: "NEW", label: "New" },
  { key: "REPLIED", label: "Replied" },
  { key: "ARCHIVED", label: "Archived" },
] as const;

const badge: Record<string, string> = {
  NEW: "bg-flame text-white",
  READ: "bg-mist text-muted",
  REPLIED: "bg-teal/15 text-[#0e7a70]",
  ARCHIVED: "bg-mist text-muted",
};

export default async function AdminMessages({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const sp = await searchParams;
  const tab = tabs.some((t) => t.key === sp.tab) ? sp.tab! : "ACTIVE";
  const where =
    tab === "ACTIVE" ? { status: { not: "ARCHIVED" as const } } : { status: tab as "NEW" | "REPLIED" | "ARCHIVED" };
  const messages = await prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Messages</h1>
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <Link key={t.key} href={`/admin/messages?tab=${t.key}`} className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap ${tab === t.key ? "bg-ink text-white" : "bg-white text-ink"}`}>
            {t.label}
          </Link>
        ))}
      </div>
      {messages.length === 0 ? (
        <div className="card p-10 text-center text-muted">No messages here.</div>
      ) : (
        <ul className="card divide-y divide-line overflow-hidden">
          {messages.map((m) => (
            <li key={m.id}>
              <Link href={`/admin/messages/${m.id}`} className={`flex flex-col gap-1 p-4 hover:bg-cream sm:flex-row sm:items-center sm:gap-4 ${m.status === "NEW" ? "bg-flame/5" : ""}`}>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate ${m.status === "NEW" ? "font-bold" : "font-medium"}`}>
                    {m.name}{m.businessName ? ` · ${m.businessName}` : ""}{m.country ? ` · ${m.country}` : ""}
                  </span>
                  <span className="block truncate text-sm text-muted">{m.service ? `${m.service}: ` : ""}{m.message}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge[m.status]}`}>{m.status.charAt(0) + m.status.slice(1).toLowerCase()}</span>
                  <span className="text-sm whitespace-nowrap text-muted">{m.createdAt.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
