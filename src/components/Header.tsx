"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site, whatsappLink } from "@/lib/site";
import { WhatsApp } from "./Icons";

const links = [
  { href: "/#process", label: "How it works" },
  { href: "/#packages", label: "Packages" },
  { href: "/projects", label: "Projects" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled || open ? "bg-ink/85 shadow-[0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl" : "bg-ink"}`}>
      <nav className="wrap flex h-16 items-center justify-between md:h-18" aria-label="Main">
        <Link href="/" aria-label="Launchwright home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-[0.93rem] font-medium transition hover:bg-white/10 hover:text-white ${pathname === l.href ? "bg-white/10 text-white" : "text-[#C9D3E3]"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Get a free quote
          </Link>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-xl text-white transition hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`absolute h-0.5 w-5 rounded bg-current transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-current transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </nav>

    </header>
      {open && (
        <div className="animate-slide-down fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-ink px-5 pt-4 pb-10 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-white/10">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-white"
                  style={{ animation: `slide-down .3s ${i * 40}ms ease both` }}
                >
                  {l.label}
                  <span className="text-flame">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary h-14 w-full text-base">Get a free quote</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener" className="btn h-14 w-full bg-[#25D366] text-base text-white">
              <WhatsApp className="h-5 w-5" /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
