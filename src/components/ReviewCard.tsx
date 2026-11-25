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
    <figure data-spotlight className="panel relative flex h-full flex-col p-6 sm:p-7">
      <span className="absolute top-3 right-6 font-display text-7xl leading-none text-white/[.06]">”</span>
      <Stars rating={r.rating} />
      <blockquote className="mt-4 flex-1 whitespace-pre-line text-snow/90">“{r.comment}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[.07] pt-5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber via-flame to-violet font-display font-bold text-white">
          {r.name.trim().charAt(0).toUpperCase()}
        </span>
        <span>
          <span className="block font-semibold text-white">{r.name}</span>
          {r.businessName && <span className="block text-sm text-fog">{r.businessName}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
