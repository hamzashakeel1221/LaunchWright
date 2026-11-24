"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; badge?: number };

export function AdminNav({ items }: { items: Item[] }) {
  const path = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto md:flex-col">
      {items.map((i) => {
        const active = i.href === "/admin" ? path === "/admin" : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium whitespace-nowrap transition ${
              active ? "bg-white/10 text-white" : "text-[#C9D3E3] hover:bg-white/5 hover:text-white"
            }`}
          >
            {i.label}
            {!!i.badge && <span className="rounded-full bg-flame px-2 py-0.5 text-xs font-semibold text-white">{i.badge}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
