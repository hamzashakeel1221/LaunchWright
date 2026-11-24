export function FieldError({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1 text-sm text-red-600">{msg}</p> : null;
}

export function FormNotice({ ok, message }: { ok: boolean; message: string }) {
  return (
    <div role="status" className={`rounded-xl px-4 py-3 text-sm font-medium ${ok ? "bg-teal/10 text-[#0e7a70]" : "bg-red-50 text-red-700"}`}>
      {message}
    </div>
  );
}

/** Hidden field that real people never fill in. Bots usually do. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
