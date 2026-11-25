"use client";
import { useEffect } from "react";

/**
 * Site-wide micro-interactions, wired with one listener instead of many client components:
 * - [data-spotlight]: a soft glow follows the cursor inside the element
 * - [data-tilt]: the element tilts in 3D towards the cursor
 * - [data-magnetic]: buttons lean slightly towards the cursor
 */
export function Interactions() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    let tilted: HTMLElement | null = null;
    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;

      const spot = target.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      if (reduced) return;

      const tilt = target.closest<HTMLElement>("[data-tilt]");
      if (tilted && tilted !== tilt) {
        tilted.style.setProperty("--rx", "0deg");
        tilted.style.setProperty("--ry", "0deg");
        tilted.removeAttribute("data-tilting");
      }
      tilted = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        const max = Number(tilt.dataset.tilt) || 6;
        tilt.style.setProperty("--ry", `${px * max}deg`);
        tilt.style.setProperty("--rx", `${-py * max}deg`);
        tilt.setAttribute("data-tilting", "");
      }

      const mag = target.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== mag) magnet.style.transform = "";
      magnet = mag;
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        mag.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };
    const onLeave = () => {
      if (tilted) {
        tilted.style.setProperty("--rx", "0deg");
        tilted.style.setProperty("--ry", "0deg");
        tilted.removeAttribute("data-tilting");
      }
      if (magnet) magnet.style.transform = "";
      tilted = magnet = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
}
