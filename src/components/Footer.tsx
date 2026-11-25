import Link from "next/link";
import { Logo } from "./Logo";
import { site, whatsappLink, whatsappMessage } from "@/lib/site";
import { servicesData } from "@/lib/services";
import { ArrowRight, Facebook, Instagram, Mail, Phone, WhatsApp } from "./Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[.06] bg-night text-fog">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-flame/10 blur-[120px]" />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <Link href="/contact" className="btn-primary mt-6 text-sm">Get a free quote <ArrowRight /></Link>
        </div>
        <nav aria-label="Services">
          <h2 className="mb-4 text-sm font-semibold tracking-wide !text-white">Services</h2>
          <ul className="space-y-2.5 text-sm">
            {servicesData.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="transition hover:text-white">{s.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <h2 className="mb-4 text-sm font-semibold tracking-wide !text-white">Company</h2>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/#process" className="transition hover:text-white">How it works</Link></li>
            <li><Link href="/#packages" className="transition hover:text-white">Packages</Link></li>
            <li><Link href="/projects" className="transition hover:text-white">Our work</Link></li>
            <li><Link href="/reviews" className="transition hover:text-white">Reviews</Link></li>
            <li><Link href="/#faq" className="transition hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="transition hover:text-white">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-wide !text-white">Talk to us</h2>
          <ul className="space-y-3 text-sm">
            <li><a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener" className="flex items-center gap-2.5 transition hover:text-white"><WhatsApp className="h-4 w-4 text-[#25D366]" /> {site.phoneDisplay}</a></li>
            <li><a href={`tel:${site.phoneE164}`} className="flex items-center gap-2.5 transition hover:text-white"><Phone className="h-4 w-4 text-amber" /> {site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-2.5 break-all transition hover:text-white"><Mail className="h-4 w-4 flex-none text-cyan" /> {site.email}</a></li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href={site.social.instagram} target="_blank" rel="noopener me" aria-label="WebDoorstep on Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition hover:border-white/30 hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href={site.social.facebook} target="_blank" rel="noopener me" aria-label="WebDoorstep on Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition hover:border-white/30 hover:text-white"><Facebook className="h-5 w-5" /></a>
          </div>
          <p className="mt-5 text-xs">We work with businesses in every country and time zone.</p>
        </div>
      </div>
      <div className="relative border-t border-white/[.06]">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6 text-xs">
          <span>© {new Date().getFullYear()} {site.name}. Website design &amp; development for small businesses worldwide.</span>
          <Link href="/admin" rel="nofollow" className="transition hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
