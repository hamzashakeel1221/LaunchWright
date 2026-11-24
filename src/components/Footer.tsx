import Link from "next/link";
import { Logo } from "./Logo";
import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink-3 text-[#8C9AB0]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm">{site.description}</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold !text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#process" className="hover:text-white">How it works</Link></li>
            <li><Link href="/#packages" className="hover:text-white">Packages</Link></li>
            <li><Link href="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link href="/reviews" className="hover:text-white">Reviews</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold !text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><a href={whatsappLink()} target="_blank" rel="noopener" className="hover:text-white">WhatsApp: {site.phoneDisplay}</a></li>
            <li><a href={`tel:${site.phoneE164}`} className="hover:text-white">Phone: {site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-xs">
          <span>© {new Date().getFullYear()} {site.name}. {site.tagline}.</span>
          <Link href="/admin" className="hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
