import { PrismaClient } from "@prisma/client";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";

/**
 * On Cloudflare there are no raw TCP database connections, so when the
 * database is TiDB Cloud we talk to it over HTTPS with TiDB's serverless
 * driver. Anywhere else (local MySQL/MariaDB) Prisma connects normally.
 */
function createClient(): PrismaClient {
  const raw = process.env.DATABASE_URL ?? "";
  let url: URL | null = null;
  try {
    url = new URL(raw);
  } catch {
    url = null;
  }
  if (url && url.hostname.endsWith("tidbcloud.com")) {
    // The serverless driver wants plain mysql://user:pass@host/db.
    const clean = `mysql://${url.username}:${url.password}@${url.hostname}${url.pathname}`;
    return new PrismaClient({ adapter: new PrismaTiDBCloud({ url: clean }) });
  }
  return new PrismaClient();
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) globalForPrisma.prisma = createClient();
  return globalForPrisma.prisma;
}

// Created on first use, so the environment is ready by then.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
