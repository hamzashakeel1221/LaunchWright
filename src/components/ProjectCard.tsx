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
    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-ink to-ink-2">
      <span className="font-display text-2xl font-bold text-white/80">{title}</span>
    </div>
  );
}

export function ProjectCard({ p }: { p: ProjectCardData }) {
  return (
    <Link href={`/projects/${p.slug}`} className="card-hover group block h-full overflow-hidden rounded-3xl border border-line bg-white">
      <div className="relative aspect-[16/10] overflow-hidden bg-mist [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.04]">
        <ProjectCover imageId={p.imageId} title={p.title} />
        {p.isSample && (
          <span className="absolute top-3 left-3 rounded-full bg-ink/90 px-3 py-1 text-[0.7rem] font-semibold tracking-widest text-white uppercase">
            Sample
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-5 sm:p-6"><div className="min-w-0">
        <span className="text-xs font-semibold tracking-wider text-teal uppercase">{p.category}</span>
        <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{p.description}</p>
        </div>
        <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-mist text-ink transition group-hover:bg-flame group-hover:text-white">↗</span>
      </div>
    </Link>
  );
}
