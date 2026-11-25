"use client";
import { useEffect, useRef, useState } from "react";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static doorway shown before the 3D scene loads, and instead of it when WebGL is unavailable. */
function DoorFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="relative h-[62%] max-h-[420px] aspect-[3/5]">
        <div className="absolute -inset-16 rounded-full bg-[radial-gradient(closest-side,rgba(255,140,70,.45),transparent)] blur-2xl" />
        <div className="absolute inset-0 rounded-t-md border-[6px] border-b-0 border-[#1a2134] bg-[radial-gradient(ellipse_at_50%_42%,#fff7ea_0%,#ffb066_40%,#ff5a2e_95%)] shadow-[0_0_80px_rgba(255,140,70,.6)]" />
        <div className="absolute top-0 left-0 h-full w-[46%] origin-left bg-gradient-to-b from-[#243055] to-[#151b2b] [transform:perspective(600px)_rotateY(-58deg)]" />
        <div className="absolute -bottom-3 left-1/2 h-3 w-[140%] -translate-x-1/2 rounded bg-[#1a2134] shadow-[0_1px_0_#ff8a4c]" />
      </div>
    </div>
  );
}

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box || !hasWebGL()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let handle: { dispose: () => void; setActive: (on: boolean) => void } | null = null;
    let cancelled = false;
    let visible = true;
    const sync = () => handle?.setActive(visible && document.visibilityState === "visible");

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0 });
    io.observe(box);
    document.addEventListener("visibilitychange", sync);

    // Load three.js after the page is interactive, so text and buttons appear first.
    const start = () => {
      import("./doorwayScene").then(({ mountDoorway }) => {
        if (cancelled) return;
        try {
          handle = mountDoorway(canvas, { reducedMotion: reduced });
          sync();
          requestAnimationFrame(() => setReady(true));
        } catch {
          /* keep the static fallback */
        }
      });
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 1200 });
    else setTimeout(start, 300);

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <div className={`transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}>
        <DoorFallback />
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
        aria-label="3D illustration of an open doorway glowing with light, surrounded by floating website previews"
        role="img"
      />
    </div>
  );
}
