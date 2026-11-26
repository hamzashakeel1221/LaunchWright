// Cloudflare entry point: the generated OpenNext worker, wrapped with the edge cache.
import openNext from "./.open-next/worker.js";
import { withEdgeCache } from "./edge-cache.mjs";

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
export default withEdgeCache(openNext);
