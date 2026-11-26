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

/**
 * Picture of the finished 3D scene, shown the moment the page paints and kept for devices that skip the 3D scene.
 * The live scene fades in over it and looks identical, so nothing visibly changes while it loads.
 */
function DoorPoster() {
  return (
    <picture aria-hidden="true">
      <source media="(min-width: 1024px)" srcSet="/hero/hero-desktop.webp" />
      <source media="(min-width: 640px)" srcSet="/hero/hero-tablet.webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero/hero-mobile.webp" alt="" width={1170} height={1113} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" />
    </picture>
  );
}

// Start fetching the 3D scene as soon as this file loads, without waiting for the page to finish hydrating.
const scenePromise: Promise<typeof import("./doorwayScene")> | null = typeof window !== "undefined" ? import("./doorwayScene") : null;

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box || !hasWebGL()) return;
    // Slow connections and low-power phones keep the lightweight static hero, so the page stays quick.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number };
    const slow = nav.connection?.saveData || /(^|-)(slow-)?[23]g$/.test(nav.connection?.effectiveType ?? "") || (nav.deviceMemory ?? 8) <= 2 || (navigator.hardwareConcurrency ?? 8) <= 2;
    if (slow) return;
    // Used only to take the placeholder picture: freeze the door at a given opening.
    const capture = (window as Window & { __HERO_FREEZE__?: number }).__HERO_FREEZE__;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let handle: { dispose: () => void; setActive: (on: boolean) => void } | null = null;
    let cancelled = false;
    let visible = true;
    const sync = () => handle?.setActive(visible && document.visibilityState === "visible");

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0 });
    io.observe(box);
    document.addEventListener("visibilitychange", sync);

    // The poster is already on screen, so start fetching the 3D scene straight away.
    const start = () => {
      (scenePromise ?? import("./doorwayScene")).then(({ mountDoorway }) => {
        if (cancelled) return;
        try {
          handle = mountDoorway(canvas, { reducedMotion: reduced, freezeOpen: capture, onFirstFrame: () => setReady(true) });
          sync();
        } catch {
          /* keep the static fallback */
        }
      });
    };
    start();

    return () => {
      cancelled = true;
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <div className={`transition-opacity duration-200 ${ready ? "opacity-0 delay-[500ms]" : "opacity-100"}`}>
        <DoorPoster />
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
        aria-label="3D illustration of an open doorway glowing with light, surrounded by floating website previews"
        role="img"
      />
    </div>
  );
}
