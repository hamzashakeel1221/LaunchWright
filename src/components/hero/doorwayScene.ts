import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * The WebDoorstep hero: an open, glowing doorway on a doorstep, with light spilling out,
 * floating website cards and drifting particles. Rendered at the screen's full resolution
 * with smooth edges and real reflections, and it steps the resolution down on slow devices.
 */
export type SceneHandle = { dispose: () => void; setActive: (on: boolean) => void };

const WARM = new THREE.Color("#ffb066");
const FLAME = new THREE.Color("#ff6b35");

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function glowTexture(size = 256, inner = "rgba(255,190,120,1)", outer = "rgba(255,107,53,0)") {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.35, inner.replace(/[\d.]+\)$/, "0.35)"));
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Mini website mockups drawn on canvases, used as textures on floating cards. */
const FONT = "'Inter Variable', Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";

function cardTexture(kind: "browser" | "phone" | "stats" | "review", s: number, maxAniso: number) {
  const W = kind === "phone" ? 300 : kind === "review" ? 420 : 520;
  const H = kind === "phone" ? 600 : kind === "review" ? 150 : kind === "stats" ? 300 : 360;
  const c = document.createElement("canvas");
  c.width = W * s;
  c.height = H * s;
  const ctx = c.getContext("2d")!;
  ctx.scale(s, s);

  // Card body
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "rgba(28,36,58,0.96)");
  bg.addColorStop(1, "rgba(12,17,30,0.96)");
  roundRect(ctx, 2, 2, W - 4, H - 4, kind === "phone" ? 46 : 26);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.stroke();

  const bar = (x: number, y: number, w: number, h: number, color: string, r = h / 2) => {
    roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle = color;
    ctx.fill();
  };
  const orange = (x0: number, y0: number, x1: number, y1: number) => {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, "#ffb547");
    g.addColorStop(1, "#ff5a36");
    return g;
  };

  if (kind === "browser") {
    ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
      ctx.beginPath();
      ctx.arc(28 + i * 20, 28, 6, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    });
    bar(100, 18, 300, 20, "rgba(255,255,255,0.08)", 10);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = "600 12px " + FONT;
    ctx.fillText("yourbusiness.com", 118, 33);
    // hero
    const hero = ctx.createLinearGradient(24, 60, W - 24, 200);
    hero.addColorStop(0, "#1e2a4a");
    hero.addColorStop(1, "#3a2340");
    roundRect(ctx, 24, 60, W - 48, 150, 16);
    ctx.fillStyle = hero;
    ctx.fill();
    bar(48, 88, 230, 18, "rgba(255,255,255,0.92)");
    bar(48, 116, 170, 18, "rgba(255,255,255,0.92)");
    bar(48, 146, 200, 9, "rgba(255,255,255,0.35)");
    roundRect(ctx, 48, 170, 120, 28, 14);
    ctx.fillStyle = orange(48, 0, 168, 0);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 12px " + FONT;
    ctx.fillText("Get a quote", 70, 189);
    // feature cards
    for (let i = 0; i < 3; i++) {
      const x = 24 + i * ((W - 48 - 24) / 3 + 12);
      const w = (W - 48 - 24) / 3;
      roundRect(ctx, x, 226, w, 110, 14);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fill();
      roundRect(ctx, x + 14, 240, 28, 28, 8);
      ctx.fillStyle = i === 1 ? "rgba(139,92,246,0.8)" : i === 2 ? "rgba(34,211,238,0.75)" : orange(x, 0, x + 28, 0);
      ctx.fill();
      bar(x + 14, 282, w - 40, 9, "rgba(255,255,255,0.6)");
      bar(x + 14, 300, w - 60, 7, "rgba(255,255,255,0.25)");
    }
  } else if (kind === "phone") {
    bar(W / 2 - 40, 16, 80, 16, "rgba(0,0,0,0.6)", 8);
    bar(24, 56, 140, 14, "rgba(255,255,255,0.9)");
    bar(24, 80, 200, 9, "rgba(255,255,255,0.3)");
    for (let i = 0; i < 4; i++) {
      const x = 24 + (i % 2) * 132;
      const y = 112 + Math.floor(i / 2) * 182;
      roundRect(ctx, x, y, 120, 166, 16);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fill();
      const img = ctx.createLinearGradient(x, y, x + 120, y + 96);
      img.addColorStop(0, ["#ffb547", "#8b5cf6", "#22d3ee", "#ff6b35"][i]);
      img.addColorStop(1, "#1a2236");
      roundRect(ctx, x + 8, y + 8, 104, 90, 12);
      ctx.fillStyle = img;
      ctx.fill();
      bar(x + 10, y + 110, 80, 9, "rgba(255,255,255,0.7)");
      bar(x + 10, y + 128, 44, 9, "rgba(255,181,71,0.9)");
    }
    roundRect(ctx, 24, H - 80, W - 48, 48, 24);
    ctx.fillStyle = orange(24, 0, W - 24, 0);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 16px " + FONT;
    ctx.fillText("Order now", W / 2 - 42, H - 50);
  } else if (kind === "stats") {
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "600 15px " + FONT;
    ctx.fillText("New enquiries", 26, 42);
    ctx.fillStyle = "#fff";
    ctx.font = "700 38px " + FONT;
    ctx.fillText("+184%", 26, 88);
    bar(170, 62, 74, 26, "rgba(40,200,120,0.18)", 13);
    ctx.fillStyle = "#4ade80";
    ctx.font = "700 13px " + FONT;
    ctx.fillText("▲ growing", 180, 80);
    // chart
    const pts = [0.15, 0.22, 0.2, 0.35, 0.32, 0.5, 0.58, 0.55, 0.75, 0.9];
    const x0 = 26, y0 = H - 30, cw = W - 52, ch = 150;
    const area = ctx.createLinearGradient(0, y0 - ch, 0, y0);
    area.addColorStop(0, "rgba(255,140,70,0.45)");
    area.addColorStop(1, "rgba(255,140,70,0)");
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = x0 + (i / (pts.length - 1)) * cw;
      const y = y0 - p * ch;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(x0 + cw, y0);
    ctx.lineTo(x0, y0);
    ctx.closePath();
    ctx.fillStyle = area;
    ctx.fill();
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = x0 + (i / (pts.length - 1)) * cw;
      const y = y0 - p * ch;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineWidth = 4;
    ctx.strokeStyle = orange(x0, 0, x0 + cw, 0);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(60, H / 2, 30, 0, Math.PI * 2);
    ctx.fillStyle = orange(30, 0, 90, 0);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 26px " + FONT;
    ctx.fillText("A", 51, H / 2 + 9);
    ctx.fillStyle = "#ffb547";
    ctx.font = "700 24px " + FONT;
    ctx.fillText("★★★★★", 108, H / 2 - 8);
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "500 16px " + FONT;
    ctx.fillText("“Customers find us now!”", 108, H / 2 + 24);
  }

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = maxAniso;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  return { texture: t, aspect: W / H };
}

export function mountDoorway(canvas: HTMLCanvasElement, opts: { reducedMotion?: boolean } = {}): SceneHandle {
  const isSmall = Math.min(window.innerWidth, window.innerHeight) < 640;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  // Render at the screen's real resolution (phones are often 3x), so edges and text stay crisp.
  const dpr = window.devicePixelRatio || 1;
  let pixelRatio = Math.min(dpr, 3);
  renderer.setPixelRatio(pixelRatio);
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  // Card artwork is drawn at up to 4x so it stays sharp on high-resolution screens.
  const cardScale = Math.min(4, Math.max(2, Math.ceil(dpr * (isSmall ? 1 : 1.4))));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  // Soft studio reflections so the metal frame, door and steps look like real materials.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  scene.environment = envTex;
  scene.environmentIntensity = 0.35;
  scene.fog = new THREE.Fog(0x05080f, 10, 26);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => (disposables.push(x), x);

  // ---------- Lights ----------
  scene.add(new THREE.AmbientLight(0x8090c0, 0.55));
  const doorLight = new THREE.PointLight(0xffa04a, 40, 16, 1.6);
  doorLight.position.set(0.2, 0.4, 0.9);
  scene.add(doorLight);
  const rim = new THREE.DirectionalLight(0x8b5cf6, 2.2);
  rim.position.set(-6, 4, -4);
  scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0x22d3ee, 0.9);
  rim2.position.set(6, 2, -3);
  scene.add(rim2);

  // ---------- Door ----------
  const DW = 2.1, DH = 3.7, FT = 0.16, FD = 0.42;
  const world = new THREE.Group();
  scene.add(world);
  const door = new THREE.Group();
  door.rotation.y = -0.42;
  door.scale.setScalar(1.15);
  world.add(door);

  const frameMat = track(new THREE.MeshStandardMaterial({ color: 0x151b2b, metalness: 0.75, roughness: 0.28 }));
  const frameGeoV = track(new RoundedBoxGeometry(FT, DH + FT * 2, FD, 4, 0.03));
  const frameGeoH = track(new RoundedBoxGeometry(DW + FT * 2, FT, FD, 4, 0.03));
  const left = new THREE.Mesh(frameGeoV, frameMat); left.position.set(-DW / 2 - FT / 2, 0, 0);
  const right = new THREE.Mesh(frameGeoV, frameMat); right.position.set(DW / 2 + FT / 2, 0, 0);
  const top = new THREE.Mesh(frameGeoH, frameMat); top.position.set(0, DH / 2 + FT / 2, 0);
  door.add(left, right, top);

  // Neon edge inside the frame
  const neonMat = track(new THREE.MeshBasicMaterial({ color: 0xffc58a }));
  const neonV = track(new THREE.BoxGeometry(0.025, DH, 0.025));
  const neonH = track(new THREE.BoxGeometry(DW, 0.025, 0.025));
  const nl = new THREE.Mesh(neonV, neonMat); nl.position.set(-DW / 2, 0, FD / 2);
  const nr = new THREE.Mesh(neonV, neonMat); nr.position.set(DW / 2, 0, FD / 2);
  const nt = new THREE.Mesh(neonH, neonMat); nt.position.set(0, DH / 2, FD / 2);
  door.add(nl, nr, nt);

  // The light inside the doorway
  const portalMat = track(new THREE.ShaderMaterial({
    transparent: true,
    // Don't write depth, so the light shafts passing through the doorway don't get cut in a hard line.
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uOpen: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform float uTime; uniform float uOpen;
      void main(){
        vec2 p = vUv - vec2(0.5, 0.42);
        float d = length(p * vec2(1.25, 0.8));
        vec3 hot = vec3(1.0, 0.97, 0.9);
        vec3 warm = vec3(1.0, 0.64, 0.3);
        vec3 deep = vec3(0.98, 0.36, 0.17);
        vec3 col = mix(hot, warm, smoothstep(0.0, 0.42, d));
        col = mix(col, deep, smoothstep(0.38, 0.85, d));
        float rays = 0.035 * sin(vUv.x * 14.0 + uTime * 0.9) * sin(vUv.y * 5.0 - uTime * 0.6);
        col += rays;
        float edge = smoothstep(0.0, 0.03, vUv.x) * smoothstep(0.0, 0.03, 1.0 - vUv.x) * smoothstep(0.0, 0.02, 1.0 - vUv.y);
        gl_FragColor = vec4(col * (0.35 + 0.95 * uOpen), edge);
      }`,
  }));
  const portalGeo = track(new THREE.PlaneGeometry(DW, DH));
  const portal = new THREE.Mesh(portalGeo, portalMat);
  portal.position.z = -0.05;
  door.add(portal);

  // Door leaf on a hinge
  const hinge = new THREE.Group();
  hinge.position.set(-DW / 2, 0, FD / 2 - 0.02);
  door.add(hinge);
  const leafMat = track(new THREE.MeshPhysicalMaterial({ color: 0x1b2440, metalness: 0.35, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.15 }));
  const leafGeo = track(new RoundedBoxGeometry(DW, DH, 0.09, 4, 0.025));
  const leaf = new THREE.Mesh(leafGeo, leafMat);
  leaf.position.set(DW / 2, 0, 0);
  hinge.add(leaf);
  // Panels on the leaf
  const panelMat = track(new THREE.MeshStandardMaterial({ color: 0x243055, metalness: 0.4, roughness: 0.4 }));
  const panelGeo = track(new RoundedBoxGeometry(DW * 0.72, DH * 0.36, 0.03, 3, 0.012));
  const p1 = new THREE.Mesh(panelGeo, panelMat); p1.position.set(DW / 2, DH * 0.22, 0.055);
  const p2 = new THREE.Mesh(panelGeo, panelMat); p2.position.set(DW / 2, -DH * 0.22, 0.055);
  hinge.add(p1, p2);
  const knobGeo = track(new THREE.SphereGeometry(0.075, 48, 32));
  const knob = new THREE.Mesh(knobGeo, track(new THREE.MeshStandardMaterial({ color: 0xffb547, metalness: 1, roughness: 0.18, emissive: 0xff8a3a, emissiveIntensity: 0.35 })));
  knob.position.set(DW - 0.24, -0.05, 0.1);
  hinge.add(knob);

  // ---------- Doorstep ----------
  const stepMat = track(new THREE.MeshStandardMaterial({ color: 0x1a2134, metalness: 0.6, roughness: 0.35 }));
  const step1 = new THREE.Mesh(track(new RoundedBoxGeometry(DW + 1.0, 0.16, 1.1, 3, 0.02)), stepMat);
  step1.position.set(0, -DH / 2 - 0.08, 0.45);
  const step2 = new THREE.Mesh(track(new RoundedBoxGeometry(DW + 1.6, 0.16, 1.0, 3, 0.02)), stepMat);
  step2.position.set(0, -DH / 2 - 0.24, 1.15);
  door.add(step1, step2);
  const stepEdgeMat = track(new THREE.MeshBasicMaterial({ color: 0xff8a4c }));
  const e1 = new THREE.Mesh(track(new THREE.BoxGeometry(DW + 1.0, 0.012, 0.012)), stepEdgeMat);
  e1.position.set(0, -DH / 2, 1.0);
  const e2 = new THREE.Mesh(track(new THREE.BoxGeometry(DW + 1.6, 0.012, 0.012)), stepEdgeMat);
  e2.position.set(0, -DH / 2 - 0.16, 1.65);
  door.add(e1, e2);

  // ---------- Light spilling out ----------
  const glowTex = track(glowTexture());
  const spillMat = track(new THREE.MeshBasicMaterial({ map: glowTex, color: WARM, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
  const spill = new THREE.Mesh(track(new THREE.PlaneGeometry(6.5, 5.5)), spillMat);
  spill.rotation.x = -Math.PI / 2;
  spill.position.set(0.3, -DH / 2 - 0.31, 2.4);
  door.add(spill);

  const haloMat = track(new THREE.SpriteMaterial({ map: glowTex, color: FLAME, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  const halo = new THREE.Sprite(haloMat);
  halo.scale.set(7.5, 8.5, 1);
  halo.position.set(0, 0.2, -0.4);
  door.add(halo);

  // Light shafts
  const shaftTexCanvas = document.createElement("canvas");
  shaftTexCanvas.width = 128; shaftTexCanvas.height = 512;
  const sctx = shaftTexCanvas.getContext("2d")!;
  const sg = sctx.createLinearGradient(0, 0, 0, 512);
  // Fade in at the top too, so the shafts never show a hard line across the doorway.
  sg.addColorStop(0, "rgba(255,200,140,0)");
  sg.addColorStop(0.18, "rgba(255,200,140,0.9)");
  sg.addColorStop(1, "rgba(255,120,60,0)");
  sctx.fillStyle = sg; sctx.fillRect(0, 0, 128, 512);
  const hg = sctx.createLinearGradient(0, 0, 128, 0);
  hg.addColorStop(0, "rgba(0,0,0,1)"); hg.addColorStop(0.5, "rgba(0,0,0,0)"); hg.addColorStop(1, "rgba(0,0,0,1)");
  sctx.globalCompositeOperation = "destination-out"; sctx.fillStyle = hg; sctx.fillRect(0, 0, 128, 512);
  const shaftTex = track(new THREE.CanvasTexture(shaftTexCanvas));
  const shafts: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const m = track(new THREE.MeshBasicMaterial({ map: shaftTex, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    const sh = new THREE.Mesh(track(new THREE.PlaneGeometry(0.5 + Math.random() * 0.5, 5.5)), m);
    sh.position.set(-0.7 + i * 0.38, 0.1, 1.6);
    sh.rotation.set(-1.15, 0, (i - 2) * 0.12);
    door.add(sh);
    shafts.push(sh);
  }

  // Orbit ring behind the door
  const ringMat = track(new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
  const ring = new THREE.Mesh(track(new THREE.TorusGeometry(3.3, 0.012, 12, 400)), ringMat);
  ring.rotation.set(1.25, 0.15, 0);
  ring.position.set(0, 0.2, -0.6);
  world.add(ring);
  const ring2 = new THREE.Mesh(track(new THREE.TorusGeometry(4.1, 0.008, 12, 480)), track(new THREE.MeshBasicMaterial({ color: 0xffb547, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })));
  ring2.rotation.set(1.35, -0.25, 0.2);
  ring2.position.set(0, 0.1, -0.6);
  world.add(ring2);
  const orbiter = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: glowTex, color: 0xffd2a0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })));
  orbiter.scale.set(0.5, 0.5, 1);
  world.add(orbiter);

  // ---------- Floating cards ----------
  type Card = { mesh: THREE.Mesh; base: THREE.Vector3; phase: number; amp: number; rotY: number };
  const cards: Card[] = [];
  const addCard = (kind: "browser" | "phone" | "stats" | "review", width: number, pos: [number, number, number], rotY: number, phase: number) => {
    const { texture, aspect } = cardTexture(kind, cardScale, maxAniso);
    track(texture);
    const mat = track(new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, toneMapped: false }));
    const mesh = new THREE.Mesh(track(new THREE.PlaneGeometry(width, width / aspect)), mat);
    mesh.position.set(...pos);
    mesh.rotation.y = rotY;
    world.add(mesh);
    cards.push({ mesh, base: new THREE.Vector3(...pos), phase, amp: 0.12 + Math.random() * 0.08, rotY });
  };
  addCard("browser", 2.3, [-2.8, 1.35, 0.9], 0.38, 0);
  addCard("phone", 0.9, [2.45, 0.25, 1.3], -0.42, 1.7);
  addCard("stats", 1.5, [-2.5, -1.2, 1.9], 0.32, 3.1);
  addCard("review", 1.6, [2.2, 2.15, 0.5], -0.3, 4.4);

  // ---------- Particles ----------
  const COUNT = isSmall ? 260 : 620;
  const pGeo = track(new THREE.BufferGeometry());
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  const colors = new Float32Array(COUNT * 3);
  const palette = [new THREE.Color("#ffb547"), new THREE.Color("#ff8a5c"), new THREE.Color("#a78bfa"), new THREE.Color("#67e8f9"), new THREE.Color("#ffffff")];
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
    speeds[i] = 0.08 + Math.random() * 0.25;
    const c = palette[Math.floor(Math.random() * palette.length)];
    colors.set([c.r, c.g, c.b], i * 3);
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const dotTex = track(glowTexture(64, "rgba(255,255,255,1)", "rgba(255,255,255,0)"));
  const pMat = track(new THREE.PointsMaterial({ size: isSmall ? 0.075 : 0.06, map: dotTex, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // ---------- Camera, input, sizing ----------
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // Distance that fits the door and cards (about 7.8 x 6.6 units) in the canvas.
  let fitZ = 11;
  const resize = () => {
    const parent = canvas.parentElement;
    const w = parent?.clientWidth || canvas.clientWidth || 1;
    const h = parent?.clientHeight || canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = 34;
    camera.updateProjectionMatrix();
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    // Phones get a little more side room so the floating cards stay on screen.
    const span = w < 640 ? 8.9 : 8.6;
    fitZ = Math.max(6.6 / (2 * t), span / (2 * t * camera.aspect));
  };
  const ro = new ResizeObserver(resize);
  if (canvas.parentElement) ro.observe(canvas.parentElement);
  resize();

  // ---------- Loop ----------
  const clock = new THREE.Clock();
  let raf = 0;
  let active = true;
  let openT = opts.reducedMotion ? 1 : 0;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  // Speed guard: if a slow device can't keep up at full resolution, step it down once or twice.
  let frames = 0, frameTime = 0;
  const adapt = (rawDt: number) => {
    if (pixelRatio <= 1.25 || rawDt > 0.25) return;
    frames++; frameTime += rawDt;
    if (frames < 90) return;
    const avg = frameTime / frames;
    frames = 0; frameTime = 0;
    if (avg > 1 / 40) {
      pixelRatio = Math.max(1.25, pixelRatio * 0.75);
      renderer.setPixelRatio(pixelRatio);
      resize();
    }
  };

  const render = () => {
    const rawDt = clock.getDelta();
    adapt(rawDt);
    const dt = Math.min(rawDt, 0.05);
    const t = clock.elapsedTime;
    const motion = opts.reducedMotion ? 0 : 1;

    // Door opens on load, then breathes a little
    openT = Math.min(1, openT + dt / 2.4);
    const open = easeOut(openT);
    hinge.rotation.y = -(open * 1.0 + motion * open * 0.08 * Math.sin(t * 0.7));
    portalMat.uniforms.uTime.value = t;
    portalMat.uniforms.uOpen.value = open;
    doorLight.intensity = 10 + 32 * open + motion * 3 * Math.sin(t * 2.1);
    spillMat.opacity = 0.15 + 0.75 * open;
    haloMat.opacity = 0.2 + 0.4 * open;
    shafts.forEach((s, i) => ((s.material as THREE.MeshBasicMaterial).opacity = open * (0.1 + 0.07 * Math.sin(t * 0.9 + i * 1.3))));

    // Floating cards
    cards.forEach((c, i) => {
      c.mesh.position.y = c.base.y + motion * Math.sin(t * 0.8 + c.phase) * c.amp;
      c.mesh.position.x = c.base.x + motion * Math.cos(t * 0.5 + c.phase) * 0.06;
      c.mesh.rotation.y = c.rotY + motion * Math.sin(t * 0.4 + i) * 0.06;
      c.mesh.rotation.x = motion * Math.sin(t * 0.6 + c.phase) * 0.05;
    });

    ring.rotation.z += dt * 0.12 * motion;
    ring2.rotation.z -= dt * 0.08 * motion;
    const a = t * 0.5;
    orbiter.position.set(Math.cos(a) * 3.3, 0.2 + Math.sin(a) * 3.3 * Math.cos(1.25), -0.6 + Math.sin(a) * 3.3 * Math.sin(1.25) * 0.4);

    // Particles drift up and loop
    const pos = pGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speeds[i] * dt * motion;
      if (y > 4.5) y = -4.5;
      pos.setY(i, y);
      pos.setX(i, pos.getX(i) + Math.sin(t * 0.3 + i) * 0.0015 * motion);
    }
    pos.needsUpdate = true;

    // Camera: parallax with the pointer, and slowly walk towards the door as you scroll
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    const scroll = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    const sway = motion * Math.sin(t * 0.25) * 0.25;
    camera.position.set(pointer.x * 0.9 * motion + sway, 0.75 - pointer.y * 0.45 * motion, fitZ - scroll * 2 * motion);
    camera.lookAt(0, 0.15, 0);
    world.rotation.y = pointer.x * 0.08 * motion;

    renderer.render(scene, camera);
    if (active) raf = requestAnimationFrame(render);
  };
  raf = requestAnimationFrame(render);

  const setActive = (on: boolean) => {
    if (on === active) return;
    active = on;
    if (on) {
      clock.getDelta();
      raf = requestAnimationFrame(render);
    } else cancelAnimationFrame(raf);
  };

  return {
    setActive,
    dispose: () => {
      active = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      disposables.forEach((d) => d.dispose());
      envTex.dispose();
      renderer.dispose();
    },
  };
}
