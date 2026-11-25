import type { ServiceIcon as Kind } from "@/lib/services";
import { Cart, Code, Pen, Refresh, Search, Shield } from "./Icons";

export function ServiceIcon({ icon, className = "h-6 w-6" }: { icon: Kind; className?: string }) {
  const C = { design: Pen, code: Code, cart: Cart, refresh: Refresh, search: Search, shield: Shield }[icon];
  return <C className={className} />;
}
