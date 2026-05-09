"use client";

import { useEffect, useMemo, useState } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

const STAR_COUNT = 50;
const CONNECTION_DISTANCE = 24;
const GLOW_RADIUS = 10;

function createSeededRandom(seed: number): () => number {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export default function Home() {
  const stars = useMemo<Star[]>(() => {
    const random = createSeededRandom(87);
    return Array.from({ length: STAR_COUNT }, (_, index) => ({
      id: index,
      x: 10 + random() * 80,
      y: 10 + random() * 80,
      size: 1.5 + random() * 2.5,
      delay: random() * 4,
      duration: 3 + random() * 3,
    }));
  }, []);

  const lines = useMemo(() => {
    const segments: Array<{ from: number; to: number; alpha: number }> = [];

    stars.forEach((star, index) => {
      const neighbors = stars
        .map((candidate, neighborIndex) => {
          const dx = candidate.x - star.x;
          const dy = candidate.y - star.y;
          return {
            index: neighborIndex,
            distance: Math.sqrt(dx * dx + dy * dy),
          };
        })
        .filter((candidate) => candidate.index !== index)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      neighbors.forEach((neighbor) => {
        if (neighbor.distance <= CONNECTION_DISTANCE && index < neighbor.index) {
          const alpha = Math.max(0.2, 1 - neighbor.distance / CONNECTION_DISTANCE);
          segments.push({ from: index, to: neighbor.index, alpha });
        }
      });
    });

    return segments;
  }, [stars]);

  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setPointer({ x, y });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(79,96,150,0.25)_0%,_rgba(0,0,0,0)_65%)]" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {lines.map((line, index) => {
          const from = stars[line.from];
          const to = stars[line.to];
          const middleX = (from.x + to.x) / 2;
          const middleY = (from.y + to.y) / 2;
          const dx = middleX - pointer.x;
          const dy = middleY - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const nearRatio = Math.max(0, 1 - distance / GLOW_RADIUS);
          const lineGlow = 1 + nearRatio * 0.9;
          return (
            <line
              key={`${line.from}-${line.to}-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={`rgba(255,255,255,${0.2 * line.alpha * lineGlow})`}
              strokeWidth="0.08"
            />
          );
        })}
      </svg>

      {stars.map((star) => {
        const dx = star.x - pointer.x;
        const dy = star.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const nearRatio = Math.max(0, 1 - distance / GLOW_RADIUS);
        const starGlow = 1 + nearRatio * 0.65;
        return (
          <span
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.85 + nearRatio * 0.15,
              boxShadow: `0 0 ${8 + nearRatio * 8}px rgba(255,255,255,${0.75 + nearRatio * 0.25})`,
              animationName: "twinkle",
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
              transform: `scale(${starGlow})`,
            }}
          />
        );
      })}

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </main>
  );
}
