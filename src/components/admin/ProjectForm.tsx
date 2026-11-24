"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { saveProject, type ProjectFormState } from "@/app/admin/actions";

type Initial = {
  id?: number; title?: string; category?: string; description?: string; liveUrl?: string | null;
  isSample?: boolean; published?: boolean; sortOrder?: number; imageId?: number | null;
};

const Err = ({ m }: { m?: string }) => (m ? <p className="mt-1 text-sm text-red-600">{m}</p> : null);

export function ProjectForm({ initial = {} }: { initial?: Initial }) {
  const [state, action, pending] = useActionState<ProjectFormState, FormData>(saveProject, null);
  const [preview, setPreview] = useState<string | null>(initial.imageId ? `/api/images/${initial.imageId}` : null);
  const e = state?.errors ?? {};

  return (
    <form action={action} className="card max-w-3xl space-y-5 p-6">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      {state?.error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{state.error}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="title">Title *</label>
          <input id="title" name="title" className="input" defaultValue={initial.title} required maxLength={160} />
          <Err m={e.title} />
        </div>
        <div>
          <label className="label" htmlFor="category">Category *</label>
          <input id="category" name="category" className="input" defaultValue={initial.category} required maxLength={80} placeholder="e.g. Telecom, Restaurant, Salon" />
          <Err m={e.category} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="description">Description *</label>
        <textarea id="description" name="description" rows={6} className="input" defaultValue={initial.description} required />
        <Err m={e.description} />
      </div>
      <div className="grid gap-5 sm:grid-cols-[1fr_140px]">
        <div>
          <label className="label" htmlFor="liveUrl">Live link <span className="font-normal text-muted">(optional)</span></label>
          <input id="liveUrl" name="liveUrl" type="url" className="input" defaultValue={initial.liveUrl ?? ""} placeholder="https://" />
          <Err m={e.liveUrl} />
        </div>
        <div>
          <label className="label" htmlFor="sortOrder">Order</label>
          <input id="sortOrder" name="sortOrder" type="number" className="input" defaultValue={initial.sortOrder ?? 0} />
          <p className="mt-1 text-xs text-muted">Lower shows first</p>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="image">Cover image {initial.id ? <span className="font-normal text-muted">(leave empty to keep the current one)</span> : "*"}</label>
        <input
          id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          className="block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          onChange={(ev) => { const f = ev.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : initial.imageId ? `/api/images/${initial.imageId}` : null); }}
        />
        <p className="mt-1 text-xs text-muted">JPG, PNG or WebP, up to 4 MB. A wide screenshot (16:10) looks best.</p>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Cover preview" className="mt-3 aspect-[16/10] w-full max-w-md rounded-xl border border-line object-cover object-top" />
        )}
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" name="isSample" defaultChecked={initial.isSample ?? true} className="h-4 w-4 accent-flame" /> Label as “Sample”</label>
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" name="published" defaultChecked={initial.published ?? true} className="h-4 w-4 accent-flame" /> Show on website</label>
      </div>
      <div className="flex gap-3">
        <button className="btn-primary" disabled={pending}>{pending ? "Saving…" : initial.id ? "Save changes" : "Add project"}</button>
        <Link href="/admin/projects" className="btn-outline">Cancel</Link>
      </div>
    </form>
  );
}
