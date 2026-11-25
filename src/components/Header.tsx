"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { site, whatsappLink, whatsappMessage } from "@/lib/site";
import { ArrowRight, WhatsApp } from "./Icons";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/projects", label: "Work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) => (href.startsWith("/#") ? false : pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          aria-label="Main"
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-3 pl-4 transition-all duration-500 sm:px-4 sm:pl-5 ${
            scrolled || open
              ? "border-white/10 bg-night/70 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link href="/" aria-label={`${site.name} home`} onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <ul className="hidden items-center gap-1 rounded-full border border-white/[.07] bg-white/[.03] p-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-[0.9rem] font-medium transition ${active(l.href) ? "bg-white/10 text-white" : "text-fog hover:text-white"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href="/contact" data-magnetic className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
              Get a free quote <ArrowRight />
            </Link>
            <button
              type="button"
              className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-white transition hover:bg-white/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-5 rounded bg-current transition duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </nav>
      </header>
      {open && (
        <div className="animate-slide-down fixed inset-0 z-40 overflow-y-auto bg-night/95 px-5 pt-24 pb-10 backdrop-blur-xl lg:hidden">
          <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-flame/25 blur-[100px]" />
          <ul className="relative flex flex-col">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-white/[.07]">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-[1.7rem] font-semibold text-white"
                  style={{ animation: `rise .5s ${i * 50}ms cubic-bezier(.2,.7,.2,1) both` }}
                >
                  {l.label}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[.06] text-amber"><ArrowRight /></span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative mt-8 grid gap-3">
            <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary h-14 w-full text-base">Get a free quote</Link>
            <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener" className="btn h-14 w-full bg-[#25D366] text-base text-white">
              <WhatsApp className="h-5 w-5" /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
