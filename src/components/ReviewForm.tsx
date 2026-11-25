"use client";
import { useActionState, useState } from "react";
import { submitReview, type FormState } from "@/app/actions";
import { FieldError, FormNotice, Honeypot } from "./FieldError";
import { Star } from "./Icons";

export function ReviewForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(submitReview, null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  if (state?.ok) {
    return (
      <div className="panel p-8 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber to-flame text-white">✓</div>
        <h3 className="text-xl">Review received</h3>
        <p className="mt-2 text-fog">{state.message}</p>
      </div>
    );
  }

  const e = state?.errors ?? {};
  return (
    <form action={action} className="panel relative space-y-5 !rounded-[1.75rem] p-5 sm:p-8" noValidate>
      <Honeypot />
      {state && !state.ok && <FormNotice ok={false} message={state.message} />}
      <div>
        <span className="label">Your rating</span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              className="text-amber transition hover:scale-110"
            >
              <Star className="h-8 w-8" filled={n <= (hover || rating)} />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
        <FieldError msg={e.rating} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="r-name">Your name</label>
          <input id="r-name" name="name" className="input" required maxLength={100} />
          <FieldError msg={e.name} />
        </div>
        <div>
          <label className="label" htmlFor="r-biz">Business name <span className="font-normal text-fog">(optional)</span></label>
          <input id="r-biz" name="businessName" className="input" maxLength={120} />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="r-comment">Your review</label>
        <textarea id="r-comment" name="comment" rows={5} className="input" required maxLength={2000} placeholder="How was working with us?" />
        <FieldError msg={e.comment} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn-primary" disabled={pending}>{pending ? "Sending…" : "Submit review"}</button>
        <p className="text-sm text-fog">Reviews are checked before they appear on the site.</p>
      </div>
    </form>
  );
}
