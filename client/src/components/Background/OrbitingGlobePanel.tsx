import React from "react";

export const OrbitingGlobePanel: React.FC = () => {
  return (
    <div className="relative w-full h-[90vh] overflow-hidden rounded-2xl bg-linear-to-b from-[#020617] via-[#020617] to-[#020617] border border-white/10">
      {/* ================= TEXT ================= */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 text-center px-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-white leading-snug max-w-3xl">
          I'm very flexible with time <br />
          zone communications
        </h1>
      </div>

      {/* ================= GLOBE ================= */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[520px] h-[520px] perspective">
        {/* Globe Core */}
        <div className="relative w-full h-full rounded-full transform-style preserve-3d rotate-globe">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl" />

          {/* Dotted Hemisphere */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-size-[6px_6px] opacity-70" />
          </div>

          {/* Shade for 3D */}
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-black/10 to-black/40" />
        </div>

        {/* ================= ORBITS ================= */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 520 520"
        >
          {/* Orbit 1 */}
          <ellipse
            cx="260"
            cy="260"
            rx="260"
            ry="110"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="6 10"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 260 260"
              to="360 260 260"
              dur="14s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Orbit 2 */}
          <ellipse
            cx="260"
            cy="260"
            rx="240"
            ry="180"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1"
            strokeDasharray="3 14"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 260 260"
              to="0 260 260"
              dur="22s"
              repeatCount="indefinite"
            />
          </ellipse>

          {/* Orbit 3 */}
          <ellipse
            cx="260"
            cy="260"
            rx="200"
            ry="60"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1"
            strokeDasharray="2 18"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 260 260"
              to="360 260 260"
              dur="10s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>
      </div>

      {/* ================= CORNER FADE ================= */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none" />

      {/* ================= STYLES ================= */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .rotate-globe {
          animation: globeRotate 40s linear infinite;
          transform: rotateX(18deg);
        }

        @keyframes globeRotate {
          from {
            transform: rotateX(18deg) rotateY(0deg);
          }
          to {
            transform: rotateX(18deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};
