import Link from "next/link";
import { whatsappLink, whatsappMessage } from "@/lib/site";
import { WhatsApp } from "./Icons";

/** Thumb-friendly action bar shown only on phones. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/80 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] font-semibold text-white active:scale-[.98]"
        >
          <WhatsApp className="h-5 w-5" /> WhatsApp
        </a>
        <Link href="/contact" className="btn-primary h-12 flex-1 !rounded-2xl !py-0 active:scale-[.98]">
          Free quote
        </Link>
      </div>
    </div>
  );
}
