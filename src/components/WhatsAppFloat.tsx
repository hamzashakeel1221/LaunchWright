import { whatsappLink } from "@/lib/site";
import { WhatsApp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hi Launchwright, I'd like a website for my business.")}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-6px_rgba(0,0,0,.4)] transition hover:scale-105"
    >
      <WhatsApp className="h-7 w-7" />
    </a>
  );
}
