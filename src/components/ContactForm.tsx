"use client";
import { useActionState } from "react";
import { submitContact, type FormState } from "@/app/actions";
import { services } from "@/lib/site";
import { FieldError, FormNotice, Honeypot } from "./FieldError";

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitContact, null);

  if (state?.ok) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-teal/15 text-teal">✓</div>
        <h3 className="text-xl">Message sent</h3>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  const e = state?.errors ?? {};
  return (
    <form action={action} className="card relative space-y-5 p-6 md:p-8" noValidate>
      <Honeypot />
      {state && !state.ok && <FormNotice ok={false} message={state.message} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-name">Full name *</label>
          <input id="c-name" name="name" className="input" required maxLength={100} autoComplete="name" />
          <FieldError msg={e.name} />
        </div>
        <div>
          <label className="label" htmlFor="c-email">Email *</label>
          <input id="c-email" name="email" type="email" className="input" required maxLength={190} autoComplete="email" />
          <FieldError msg={e.email} />
        </div>
        <div>
          <label className="label" htmlFor="c-phone">Phone or WhatsApp</label>
          <input id="c-phone" name="phone" type="tel" className="input" maxLength={40} autoComplete="tel" placeholder="Include your country code" />
        </div>
        <div>
          <label className="label" htmlFor="c-biz">Business name</label>
          <input id="c-biz" name="businessName" className="input" maxLength={120} autoComplete="organization" />
        </div>
        <div>
          <label className="label" htmlFor="c-country">Country</label>
          <input id="c-country" name="country" className="input" maxLength={80} autoComplete="country-name" />
        </div>
        <div>
          <label className="label" htmlFor="c-service">What do you need?</label>
          <select id="c-service" name="service" className="input" defaultValue="New website">
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label" htmlFor="c-msg">Tell us about your business *</label>
        <textarea id="c-msg" name="message" rows={5} className="input" required maxLength={5000} placeholder="What does your business do, and what should the website include?" />
        <FieldError msg={e.message} />
      </div>
      <button className="btn-primary w-full sm:w-auto" disabled={pending}>{pending ? "Sending…" : "Send message"}</button>
    </form>
  );
}
