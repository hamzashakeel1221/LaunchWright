import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logout } from "../actions";
import { AdminNav } from "@/components/admin/AdminNav";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Admin" }, robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const [pendingReviews, newMessages] = await Promise.all([
    prisma.review.count({ where: { status: "PENDING" } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
  ]);
  return (
    <div className="min-h-screen bg-mist md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-ink p-4 md:sticky md:top-0 md:h-screen md:p-5">
        <div className="mb-4 flex items-center justify-between md:mb-8">
          <Link href="/admin"><Logo /></Link>
        </div>
        <AdminNav
          items={[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/projects", label: "Projects" },
            { href: "/admin/reviews", label: "Reviews", badge: pendingReviews },
            { href: "/admin/messages", label: "Messages", badge: newMessages },
          ]}
        />
        <div className="mt-4 flex gap-2 border-t border-white/10 pt-4 md:absolute md:right-5 md:bottom-5 md:left-5 md:flex-col">
          <Link href="/" target="_blank" className="rounded-lg px-3 py-2 text-sm text-[#C9D3E3] hover:text-white">View website ↗</Link>
          <form action={logout}>
            <button className="rounded-lg px-3 py-2 text-sm text-[#C9D3E3] hover:text-white">Log out</button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 p-5 md:p-10">{children}</div>
    </div>
  );
}
