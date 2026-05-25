/**
 * useCircuitAnimation
 *
 * Animación de fondo tipo circuitos eléctricos / trazas de datos.
 * Cada trazo avanza en líneas rectas con giros de 90°, se ramifica
 * aleatoriamente, detecta intersecciones y genera destellos.
 *
 * Técnica: overlay semitransparente (fillRect) para efecto trail,
 * dibujando solo el segmento nuevo de cada trazo por frame.
 *
 * Paleta del proyecto:
 *   Fondo: #030712
 *   Cian:  #00E5FF
 *   Verde: #10B981
 *   Gris:  #94A3B8
 */

import { useRef, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

const BG = 'rgba(3, 7, 18, 0.12)';
const CYAN = '0, 229, 255';
const EMERALD = '16, 185, 129';
const SLATE = '148, 163, 184';

const MAX_TRACES = 40;
const INTERSECTION_RADIUS = 7;
const BRANCH_RATE = 0.002; // probabilidad por frame
const SPAWN_INTERVAL = 80; // frames entre spawns desde borde
const TRAIL_LENGTH = 18;   // frames de historia guardados para detección

const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

let _nextId = 0;
const nextId = () => ++_nextId;

// ---------------------------------------------------------------------------
// Trazo individual
// ---------------------------------------------------------------------------

interface Trace {
  id: number;
  x: number;
  y: number;
  px: number;  // posición anterior (para dibujar segmento)
  py: number;
  dir: number; // 0=der, 1=abajo, 2=izq, 3=arriba
  speed: number;
  remaining: number; // px antes del próximo giro
  color: string;
  width: number;
  opacity: number;
  alive: boolean;
  age: number;
  maxAge: number;
  /** Historial de posiciones recientes para intersecciones */
  history: { x: number; y: number }[];
}

// ---------------------------------------------------------------------------
// Fábrica de trazos
// ---------------------------------------------------------------------------

function randColor(): string {
  const r = Math.random();
  return r < 0.6 ? CYAN : r < 0.85 ? EMERALD : SLATE;
}

function spawnFromEdge(w: number, h: number): Trace {
  const edge = Math.floor(Math.random() * 4);
  let x: number, y: number, dir: number;
  switch (edge) {
    case 0: x = Math.random() * w; y = 0; dir = 1; break;
    case 1: x = w; y = Math.random() * h; dir = 2; break;
    case 2: x = Math.random() * w; y = h; dir = 3; break;
    default: x = 0; y = Math.random() * h; dir = 0; break;
  }
  return {
    id: nextId(), x, y, px: x, py: y, dir,
    speed: 0.3 + Math.random() * 0.7,
    remaining: 40 + Math.random() * 180,
    color: randColor(),
    width: Math.random() < 0.15 ? 2 : 0.6 + Math.random() * 0.8,
    opacity: 0.15 + Math.random() * 0.25,
    alive: true,
    age: 0,
    maxAge: 300 + Math.floor(Math.random() * 900),
    history: [{ x, y }],
  };
}

function spawnInternal(x: number, y: number, color: string, width: number): Trace {
  return {
    id: nextId(), x, y, px: x, py: y,
    dir: Math.floor(Math.random() * 4),
    speed: 0.3 + Math.random() * 0.7,
    remaining: 30 + Math.random() * 120,
    color, width: width * 0.6, opacity: 0.2,
    alive: true, age: 0,
    maxAge: 200 + Math.floor(Math.random() * 400),
    history: [{ x, y }],
  };
}

// ---------------------------------------------------------------------------
// Intersecciones (spatial hash sobre historial reciente)
// ---------------------------------------------------------------------------

const CELL = 32;
type CellMap = Map<string, { id: number; x: number; y: number }[]>;

function buildSpatial(traces: Trace[]): CellMap {
  const map: CellMap = new Map();
  const key = (cx: number, cy: number) => `${cx}:${cy}`;
  for (const t of traces) {
    if (!t.alive) continue;
    const start = Math.max(0, t.history.length - TRAIL_LENGTH);
    for (let i = start; i < t.history.length; i++) {
      const p = t.history[i];
      const cx = Math.floor(p.x / CELL);
      const cy = Math.floor(p.y / CELL);
      const k = key(cx, cy);
      let arr = map.get(k);
      if (!arr) { arr = []; map.set(k, arr); }
      arr.push({ id: t.id, x: p.x, y: p.y });
    }
  }
  return map;
}

/** Retorna un glow si la cabeza de `t` colisiona con la historia de otros */
function checkHit(t: Trace, map: CellMap, glows: number): Glow | null {
  if (t.history.length < 2) return null;
  const head = t.history[t.history.length - 1];
  const cx = Math.floor(head.x / CELL);
  const cy = Math.floor(head.y / CELL);
  for (let dcx = -1; dcx <= 1; dcx++) {
    for (let dcy = -1; dcy <= 1; dcy++) {
      const cells = map.get(`${cx + dcx}:${cy + dcy}`);
      if (!cells) continue;
      for (const cell of cells) {
        if (cell.id === t.id) continue;
        const dx = head.x - cell.x;
        const dy = head.y - cell.y;
        if (dx * dx + dy * dy < INTERSECTION_RADIUS * INTERSECTION_RADIUS) {
          // Límite de glows simultáneos para no saturar
          if (glows > 20) return null;
          return { x: head.x, y: head.y, radius: 4 + Math.random() * 6, opacity: 1, color: t.color };
        }
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Glow
// ---------------------------------------------------------------------------

interface Glow {
  x: number; y: number;
  radius: number;
  opacity: number;
  color: string;
}

function drawGlow(ctx: CanvasRenderingContext2D, g: Glow) {
  if (g.opacity <= 0) return;
  const r = g.radius;
  const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, r);
  grad.addColorStop(0, `rgba(${g.color}, ${g.opacity})`);
  grad.addColorStop(0.3, `rgba(${g.color}, ${g.opacity * 0.4})`);
  grad.addColorStop(1, `rgba(${g.color}, 0)`);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(g.x, g.y, r, 0, Math.PI * 2);
  ctx.fill();
}

// ---------------------------------------------------------------------------
// Hook principal
// ---------------------------------------------------------------------------

export function useCircuitAnimation(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const tracesRef = useRef<Trace[]>([]);
  const glowsRef = useRef<Glow[]>([]);
  const rafRef = useRef(0);
  const spawnCounterRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    // --------------- resize ---------------
    const resize = () => {
      const parent = canvas!.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      // Reiniciar trazos
      const count = 6 + Math.floor(Math.random() * 6);
      const fresh: Trace[] = [];
      for (let i = 0; i < count; i++) fresh.push(spawnFromEdge(w, h));
      tracesRef.current = fresh;
      glowsRef.current = [];
      spawnCounterRef.current = 0;
    };

    resize();
    window.addEventListener('resize', resize);

    // --------------- loop ---------------
    const loop = () => {
      const { w, h } = sizeRef.current;
      if (!w || !h) { rafRef.current = requestAnimationFrame(loop); return; }

      const traces = tracesRef.current;
      const glows = glowsRef.current;

      // 1. Overlay semitransparente → efecto trail
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      // 2. Construir grid espacial para intersecciones
      const map = buildSpatial(traces);

      // 3. Actualizar trazos y detectar colisiones
      let totalGlows = glows.length;

      for (const t of traces) {
        if (!t.alive) continue;
        t.age++;
        if (t.age > t.maxAge) { t.alive = false; continue; }

        // Guardar posición anterior
        t.px = t.x;
        t.py = t.y;

        // Avanzar
        let moved = t.speed;
        while (moved > 0) {
          const step = Math.min(moved, t.remaining);
          t.x += DX[t.dir] * step;
          t.y += DY[t.dir] * step;
          t.remaining -= step;
          moved -= step;

          if (t.remaining < 0.01) {
            // Girar 90°
            const turn = Math.random() < 0.5 ? 1 : -1;
            t.dir = ((t.dir + turn) % 4 + 4) % 4;
            t.remaining = 30 + Math.random() * 140;
          }
        }

        // Guardar historial (limitado)
        t.history.push({ x: t.x, y: t.y });
        if (t.history.length > TRAIL_LENGTH + 5) {
          t.history.splice(0, t.history.length - TRAIL_LENGTH);
        }

        // Dibujar segmento (solo el nuevo, el overlay se encarga del trail)
        const segLen = Math.sqrt((t.x - t.px) ** 2 + (t.y - t.py) ** 2);
        if (segLen > 0.5) {
          ctx.strokeStyle = `rgba(${t.color}, ${t.opacity})`;
          ctx.lineWidth = t.width;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(t.px, t.py);
          ctx.lineTo(t.x, t.y);
          ctx.stroke();
        }

        // Rama
        if (t.age > 60 && Math.random() < BRANCH_RATE && traces.filter(tr => tr.alive).length < MAX_TRACES) {
          traces.push(spawnInternal(t.x, t.y, t.color, t.width));
        }

        // Intersección
        const hit = checkHit(t, map, totalGlows);
        if (hit) { glows.push(hit); totalGlows++; }
      }

      // 4. Cabeza brillante (pulso)
      for (const t of traces) {
        if (!t.alive) continue;
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 5);
        grad.addColorStop(0, `rgba(${t.color}, ${t.opacity * 1.2})`);
        grad.addColorStop(1, `rgba(${t.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Actualizar y dibujar glows
      for (let i = glows.length - 1; i >= 0; i--) {
        const g = glows[i];
        g.radius += 0.2;
        g.opacity -= 0.02;
        if (g.opacity <= 0) { glows.splice(i, 1); continue; }
        drawGlow(ctx, g);
      }

      // 6. Spawn desde bordes
      spawnCounterRef.current++;
      if (spawnCounterRef.current % SPAWN_INTERVAL === 0 &&
          traces.filter(t => t.alive).length < MAX_TRACES) {
        traces.push(spawnFromEdge(w, h));
      }

      // 7. Mantener mínimo de trazos
      while (traces.filter(t => t.alive).length < 6 && traces.length < MAX_TRACES) {
        traces.push(spawnFromEdge(w, h));
      }

      // 8. Poda de trazos muertos (mantener máx 8 muertos por si acaso)
      const alive = traces.filter(t => t.alive);
      const dead = traces.filter(t => !t.alive).slice(-8);
      tracesRef.current = [...alive, ...dead];

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    // --------------- cleanup ---------------
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      tracesRef.current = [];
      glowsRef.current = [];
    };
  }, [canvasRef]);
}
