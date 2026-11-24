import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteProject, toggleProjectPublished } from "../../actions";
import { ConfirmButton, SubmitButton } from "@/components/admin/ConfirmButton";

export const metadata = { title: "Projects" };

export default async function AdminProjects({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const projects = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl">Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary">+ Add project</Link>
      </div>
      {saved && <p className="rounded-xl bg-teal/10 px-4 py-3 text-sm font-medium text-[#0e7a70]">Project saved.</p>}
      {projects.length === 0 ? (
        <div className="card p-10 text-center text-muted">No projects yet. Add your first one.</div>
      ) : (
        <ul className="grid gap-4">
          {projects.map((p) => (
            <li key={p.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="relative aspect-[16/10] w-full flex-none overflow-hidden rounded-lg bg-mist sm:w-40">
                {p.imageId && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/images/${p.imageId}`} alt="" className="h-full w-full object-cover object-top" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg">{p.title}</h2>
                  {p.isSample && <span className="rounded-full bg-ink px-2 py-0.5 text-[0.65rem] font-semibold tracking-wider text-white uppercase">Sample</span>}
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${p.published ? "bg-teal/15 text-[#0e7a70]" : "bg-mist text-muted"}`}>{p.published ? "Visible" : "Hidden"}</span>
                </div>
                <p className="text-sm text-muted">{p.category} · order {p.sortOrder}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/projects/${p.id}`} className="btn-outline !px-4 !py-2 text-sm">Edit</Link>
                <form action={toggleProjectPublished}>
                  <input type="hidden" name="id" value={p.id} />
                  <SubmitButton className="btn-outline !px-4 !py-2 text-sm">{p.published ? "Hide" : "Show"}</SubmitButton>
                </form>
                <form action={deleteProject}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton message={`Delete “${p.title}”? This can't be undone.`} className="btn !px-4 !py-2 text-sm bg-red-50 text-red-700 hover:bg-red-100">Delete</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
