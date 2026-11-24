import { Stars } from "./Stars";

export type ReviewCardData = {
  id: number;
  name: string;
  businessName: string | null;
  rating: number;
  comment: string;
  createdAt: Date;
};

export function ReviewCard({ r }: { r: ReviewCardData }) {
  return (
    <figure className="card-hover relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 sm:p-7">
      <span className="absolute top-4 right-6 font-display text-6xl leading-none text-flame/15">”</span>
      <Stars rating={r.rating} />
      <blockquote className="mt-4 flex-1 whitespace-pre-line text-body">“{r.comment}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-flame to-teal font-display font-bold text-white">
          {r.name.trim().charAt(0).toUpperCase()}
        </span>
        <span>
          <span className="block font-semibold text-ink">{r.name}</span>
          {r.businessName && <span className="block text-sm text-muted">{r.businessName}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
