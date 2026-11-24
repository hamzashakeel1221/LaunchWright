import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { WhatsApp } from "./Icons";

/** Thumb-friendly action bar shown only on phones. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/80 bg-white/90 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href={whatsappLink("Hi Cometfront, I'd like a website for my business.")}
          target="_blank"
          rel="noopener"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] font-semibold text-white active:scale-[.98]"
        >
          <WhatsApp className="h-5 w-5" /> WhatsApp
        </a>
        <Link href="/contact" className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-ink font-semibold text-white active:scale-[.98]">
          Free quote
        </Link>
      </div>
    </div>
  );
}
