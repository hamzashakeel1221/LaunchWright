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
    <figure className="card flex h-full flex-col p-6">
      <Stars rating={r.rating} />
      <blockquote className="mt-4 flex-1 whitespace-pre-line text-body">“{r.comment}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-mist font-display font-bold text-ink">
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
