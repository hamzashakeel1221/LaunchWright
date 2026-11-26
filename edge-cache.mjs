// Edge cache for the public pages that read from the database (home, Our work, Reviews).
// Those pages are rendered on demand, which means a database round trip on every visit.
// This keeps each rendered page at the nearest Cloudflare location for a short time,
// so a normal visit is served instantly. After FRESH seconds a visit still gets the
// cached copy immediately while a fresh one is built in the background. Changes made in
// the admin panel therefore show up within about a minute.

const FRESH_SECONDS = 60;
const KEEP_SECONDS = 60 * 60 * 24;
const ORIGINS = new Set(["/", "/projects", "/reviews"]);

function isCacheablePath(pathname) {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return ORIGINS.has(p) || /^\/projects\/[a-z0-9-]+$/i.test(p);
}

// Page loads and Next.js client-side navigations ask for different formats of the same URL.
function variantOf(request) {
  const h = request.headers;
  return [h.get("rsc") ? "rsc" : "html", h.get("next-router-prefetch") || "", h.get("next-router-segment-prefetch") || "", h.get("next-router-state-tree") || ""].join("|");
}

async function digest(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function cacheKey(request) {
  const url = new URL(request.url);
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/$/, "") : url.pathname;
  return new Request(`${url.origin}/__edge-cache${path}?v=${await digest(variantOf(request))}`, { method: "GET" });
}

function storable(response) {
  if (response.status !== 200) return false;
  if (response.headers.has("set-cookie")) return false;
  const type = response.headers.get("content-type") || "";
  return type.includes("text/html") || type.includes("text/x-component");
}

function served(response, state, cachedAt) {
  const out = new Response(response.body, response);
  out.headers.set("x-edge-cache", state);
  out.headers.set("cache-control", "public, max-age=0, must-revalidate");
  if (cachedAt) out.headers.set("age", String(Math.max(0, Math.round((Date.now() - cachedAt) / 1000))));
  out.headers.delete("x-cached-at");
  return out;
}

export function withEdgeCache(inner, getCache = () => globalThis.caches?.default) {
  return {
    async fetch(request, env, ctx) {
      const cache = getCache();
      const url = new URL(request.url);
      if (!cache || request.method !== "GET" || !isCacheablePath(url.pathname) || request.headers.has("authorization")) {
        return inner.fetch(request, env, ctx);
      }
      const key = await cacheKey(request);

      const render = async (req) => {
        const res = await inner.fetch(req, env, ctx);
        if (storable(res)) {
          const copy = new Response(res.clone().body, res);
          copy.headers.set("x-cached-at", String(Date.now()));
          copy.headers.set("cache-control", `public, max-age=${KEEP_SECONDS}`);
          ctx.waitUntil(cache.put(key, copy));
        }
        return res;
      };

      const hit = await cache.match(key);
      if (hit) {
        const cachedAt = Number(hit.headers.get("x-cached-at")) || 0;
        const fresh = Date.now() - cachedAt < FRESH_SECONDS * 1000;
        if (!fresh) ctx.waitUntil(render(request.clone()).catch(() => {}));
        return served(hit, fresh ? "HIT" : "STALE", cachedAt);
      }
      const res = await render(request);
      return served(res, "MISS");
    },
  };
}
