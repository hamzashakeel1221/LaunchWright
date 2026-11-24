import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = { title: "Edit project" };

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const p = await prisma.project.findUnique({ where: { id: Number((await params).id) || 0 } });
  if (!p) notFound();
  return (
    <div className="space-y-6">
      <Link href="/admin/projects" className="text-sm text-muted hover:text-ink">← Projects</Link>
      <h1 className="text-3xl">Edit project</h1>
      <ProjectForm initial={p} />
    </div>
  );
}
