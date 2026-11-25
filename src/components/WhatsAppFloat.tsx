import { whatsappLink, whatsappMessage } from "@/lib/site";
import { WhatsApp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(whatsappMessage)}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="group fixed right-6 bottom-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,.55)] transition hover:scale-110 md:grid"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <WhatsApp className="relative h-7 w-7" />
    </a>
  );
}
