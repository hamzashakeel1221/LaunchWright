import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { deleteMessage, saveMessageNotes, setMessageStatus } from "../../../actions";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";
import { Mail, Phone, WhatsApp } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata = { title: "Message" };

export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id) || 0;
  let m = await prisma.contactMessage.findUnique({ where: { id } });
  if (!m) notFound();
  if (m.status === "NEW") m = await prisma.contactMessage.update({ where: { id }, data: { status: "READ" } });

  const firstName = m.name.split(" ")[0];
  const emailHref = `mailto:${m.email}?subject=${encodeURIComponent(`Re: your website enquiry with ${site.name}`)}&body=${encodeURIComponent(
    `Hi ${firstName},\n\nThanks for getting in touch with ${site.name}.\n\n\n\nBest regards,\n${site.name}\n${site.phoneDisplay}\n\n---\nYour message:\n${m.message}`,
  )}`;
  const waDigits = m.phone?.replace(/[^\d]/g, "") ?? "";
  const waHref = waDigits.length >= 8 ? `https://wa.me/${waDigits}?text=${encodeURIComponent(`Hi ${firstName}, this is ${site.name}. Thanks for your message about your website.`)}` : null;

  const row = (label: string, value: React.ReactNode) =>
    value ? (<div className="grid grid-cols-[110px_1fr] gap-3 py-2"><dt className="text-sm text-muted">{label}</dt><dd className="min-w-0 font-medium break-words">{value}</dd></div>) : null;

  const statusBtn = (status: string, label: string, cls = "btn-outline") => (
    <form action={setMessageStatus}>
      <input type="hidden" name="id" value={m!.id} />
      <input type="hidden" name="status" value={status} />
      <SubmitButton className={`${cls} !px-4 !py-2 text-sm`}>{label}</SubmitButton>
    </form>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/admin/messages" className="text-sm text-muted hover:text-ink">← Messages</Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">{m.name}</h1>
        <span className="text-sm text-muted">{m.createdAt.toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" })}</span>
      </div>

      <div className="card p-5">
        <dl className="divide-y divide-line">
          {row("Email", <a href={`mailto:${m.email}`} className="text-flame-dark hover:underline">{m.email}</a>)}
          {row("Phone", m.phone && <a href={`tel:${m.phone}`} className="text-flame-dark hover:underline">{m.phone}</a>)}
          {row("Business", m.businessName)}
          {row("Country", m.country)}
          {row("Needs", m.service)}
          {row("Status", m.status.charAt(0) + m.status.slice(1).toLowerCase())}
        </dl>
        <h2 className="mt-5 mb-2 text-base">Message</h2>
        <p className="rounded-xl bg-cream p-4 whitespace-pre-line">{m.message}</p>
      </div>

      <div className="card space-y-4 p-5">
        <h2 className="text-lg">Reply</h2>
        <div className="flex flex-wrap gap-2">
          <a href={emailHref} className="btn-dark !py-2.5 text-sm"><Mail className="h-4 w-4" /> Reply by email</a>
          {waHref && <a href={waHref} target="_blank" rel="noopener" className="btn !py-2.5 text-sm bg-[#25D366] text-white"><WhatsApp className="h-4 w-4" /> Reply on WhatsApp</a>}
          {m.phone && <a href={`tel:${m.phone}`} className="btn-outline !py-2.5 text-sm"><Phone className="h-4 w-4" /> Call</a>}
        </div>
        <p className="text-sm text-muted">These open your email app or WhatsApp with the reply started for you. Mark the message as replied when you&apos;re done.</p>
        <div className="flex flex-wrap gap-2 border-t border-line pt-4">
          {m.status !== "REPLIED" && statusBtn("REPLIED", "Mark as replied", "btn bg-teal text-white")}
          {m.status !== "ARCHIVED" ? statusBtn("ARCHIVED", "Archive") : statusBtn("READ", "Move to inbox")}
          {m.status !== "NEW" && statusBtn("NEW", "Mark as unread")}
          <form action={deleteMessage}>
            <input type="hidden" name="id" value={m.id} />
            <ConfirmButton message="Delete this message permanently?" className="btn !px-4 !py-2 text-sm bg-red-50 text-red-700 hover:bg-red-100">Delete</ConfirmButton>
          </form>
        </div>
      </div>

      <form action={saveMessageNotes} className="card space-y-3 p-5">
        <input type="hidden" name="id" value={m.id} />
        <label htmlFor="notes" className="text-lg font-display font-semibold text-ink">Private notes</label>
        <textarea id="notes" name="adminNotes" rows={4} defaultValue={m.adminNotes ?? ""} className="input" placeholder="Only you can see these. E.g. quoted amount, follow-up date…" />
        <SubmitButton className="btn-outline !px-4 !py-2 text-sm">Save notes</SubmitButton>
      </form>
    </div>
  );
}
