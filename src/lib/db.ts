import { PrismaClient } from "@prisma/client";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";

/**
 * On Cloudflare there are no raw TCP database connections, so when the
 * database is TiDB Cloud we talk to it over HTTPS with TiDB's serverless
 * driver. Anywhere else (local MySQL/MariaDB) Prisma connects normally.
 */

/** Tolerate values pasted with quotes, spaces or a leading `DATABASE_URL=`. */
function cleanDatabaseUrl(raw: string | undefined): string {
  let v = (raw ?? "").trim();
  v = v.replace(/^DATABASE_URL\s*=\s*/i, "").trim();
  v = v.replace(/^["'`]+|["'`]+$/g, "").trim();
  return v;
}

function createClient(): { client: PrismaClient; viaAdapter: boolean } {
  const value = cleanDatabaseUrl(process.env.DATABASE_URL);
  let url: URL | null = null;
  try {
    url = new URL(value);
  } catch {
    url = null;
  }
  if (url && url.hostname.endsWith("tidbcloud.com")) {
    // The serverless driver wants plain mysql://user:pass@host/db.
    const clean = `mysql://${url.username}:${url.password}@${url.hostname}${url.pathname}`;
    return { client: new PrismaClient({ adapter: new PrismaTiDBCloud({ url: clean }) }), viaAdapter: true };
  }
  if (typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers") {
    // Safe hint for the logs: never print the value itself.
    console.error(
      `[db] DATABASE_URL is not a TiDB Cloud URL (set: ${value.length > 0}, parses: ${url !== null}, ` +
        `protocol: ${url?.protocol ?? "-"}, host ends with tidbcloud.com: false, starts with: ${JSON.stringify(value.slice(0, 8))})`,
    );
  }
  return { client: new PrismaClient(), viaAdapter: false };
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const { client, viaAdapter } = createClient();
  // Only reuse a working client; a misconfigured one is rebuilt on the next
  // request so a fixed DATABASE_URL takes effect without waiting.
  const onWorkers = typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
  if (viaAdapter || !onWorkers) globalForPrisma.prisma = client;
  return client;
}

// Created on first use, so the environment is ready by then.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
