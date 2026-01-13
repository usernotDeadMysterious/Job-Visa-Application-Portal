import React, { useRef, useState } from "react";

type Vec2 = {
  x: number;
  y: number;
};

export const InteractiveGlobePanel: React.FC = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);

  const [rotation, setRotation] = useState<Vec2>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef<Vec2>({ x: 0, y: 0 });

  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val, min), max);

  const handleMove = (clientX: number, clientY: number) => {
    if (!globeRef.current) return;
    const rect = globeRef.current.getBoundingClientRect();

    const x = (clientX - rect.left - rect.width / 2) / rect.width;
    const y = (clientY - rect.top - rect.height / 2) / rect.height;

    setRotation({
      x: clamp(-y * 25, -25, 25),
      y: clamp(x * 25, -25, 25),
    });
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) {
      handleMove(e.clientX, e.clientY);
      return;
    }

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    setRotation((prev) => ({
      x: clamp(prev.x + dy * 0.3, -40, 40),
      y: clamp(prev.y + dx * 0.3, -40, 40),
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const reset = () => {
    setDragging(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-[90vh] rounded-2xl overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 shadow-2xl">
      {/* glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full animate-pulse delay-1000" />

      {/* content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-white max-w-xl">
          Flexible Across
          <br />
          <span className="bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Time Zones & Borders
          </span>
        </h2>

        <p className="mt-4 text-sm text-slate-300 max-w-lg">
          Drag or move your cursor to explore global readiness. Communication
          and coordination without limits.
        </p>

        {/* GLOBE */}
        <div
          ref={globeRef}
          className="relative mt-10 w-64 h-64 lg:w-80 lg:h-80 cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseLeave={reset}
          onMouseUp={reset}
        >
          <div
            className="relative w-full h-full rounded-full border border-indigo-400/30 overflow-hidden transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            }}
          >
            {/* dotted globe */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[6px_6px] opacity-70" />

            {/* latitude */}
            {[25, 50, 75].map((t) => (
              <div
                key={t}
                className="absolute w-full border-t border-indigo-400/20"
                style={{ top: `${t}%` }}
              />
            ))}

            {/* longitude */}
            {[25, 50, 75].map((l) => (
              <div
                key={l}
                className="absolute h-full border-l border-indigo-400/20"
                style={{ left: `${l}%` }}
              />
            ))}
          </div>

          {/* halo */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />
        </div>

        <p className="mt-10 text-xs text-slate-400 max-w-md">
          Designed for global hiring, visa coordination, and distributed teams —
          regardless of geography.
        </p>
      </div>
    </div>
  );
};
