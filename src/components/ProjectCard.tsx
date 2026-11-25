import Link from "next/link";
import Image from "next/image";

export type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  description: string;
  isSample: boolean;
  imageId: number | null;
};

export function ProjectCover({ imageId, title, priority = false }: { imageId: number | null; title: string; priority?: boolean }) {
  return imageId ? (
    <Image
      src={`/api/images/${imageId}`}
      alt={`${title} preview`}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover object-top"
      priority={priority}
      unoptimized
    />
  ) : (
    <div className="grid h-full w-full place-items-center bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,140,70,.35),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(139,92,246,.35),transparent_60%)] bg-night-3">
      <span className="font-display text-2xl font-bold text-white/85">{title}</span>
    </div>
  );
}

export function ProjectCard({ p }: { p: ProjectCardData }) {
  return (
    <Link href={`/projects/${p.slug}`} data-tilt="5" data-spotlight className="group panel block h-full overflow-hidden transition-colors hover:border-white/20">
      <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-night-3 [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.05]">
        <ProjectCover imageId={p.imageId} title={p.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
        {p.isSample && (
          <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-night/70 px-3 py-1 text-[0.68rem] font-semibold tracking-widest text-white uppercase backdrop-blur">
            Sample
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-5 pt-3 sm:p-6 sm:pt-4">
        <div className="min-w-0">
          <span className="text-xs font-semibold tracking-wider text-amber uppercase">{p.category}</span>
          <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-fog">{p.description}</p>
        </div>
        <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-white/10 bg-white/[.04] text-white transition duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-amber group-hover:to-flame">↗</span>
      </div>
    </Link>
  );
}
