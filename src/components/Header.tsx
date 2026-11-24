"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "/#process", label: "How it works" },
  { href: "/#packages", label: "Packages" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-ink/95 backdrop-blur">
      <nav className="wrap flex h-17 items-center justify-between py-3" aria-label="Main">
        <Link href="/" aria-label="Launchwright home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[0.95rem] font-medium transition hover:text-white ${pathname === l.href ? "text-white" : "text-[#C9D3E3]"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden !py-2.5 text-sm sm:inline-flex">
            Get a free quote
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-white/10 md:hidden">
          <ul className="wrap flex flex-col py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium text-[#C9D3E3] hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-2">
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full">
                Get a free quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
