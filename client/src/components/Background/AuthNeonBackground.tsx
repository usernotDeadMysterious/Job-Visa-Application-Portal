import React from "react";

const AuthNeonBackground: React.FC = () => {
  // A realistic medical ECG sequence: P-wave, QRS complex, T-wave
  const beatPath =
    "M 0 50 L 10 50 Q 15 40 20 50 L 25 50 L 30 85 L 35 5 L 40 50 L 45 50 Q 55 35 65 50 L 80 50";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617] pointer-events-none">
      {/* Background Grid - Essential for the "Monitor" look */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />

      {/* The ECG Monitor Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-[300px]">
          {/* Static Background Path (Very faint) */}
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            className="absolute inset-0 opacity-5"
          >
            <defs>
              <pattern
                id="ecg-pattern"
                x="0"
                y="0"
                width="160"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d={beatPath}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ecg-pattern)" />
          </svg>

          {/* Animated "Scanning" Path */}
          <div className="absolute inset-0 ecg-mask">
            <svg
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              className="drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            >
              <rect width="100%" height="100%" fill="url(#ecg-pattern)" />
            </svg>
          </div>

          {/* The Bright Scan Head (The "Dot") */}
          <div className="absolute inset-0 scan-head-container">
            <div className="h-full w-0.5 bg-cyan-300 shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee]" />
          </div>
        </div>
      </div>

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-[#020617] opacity-80" />

      <style>{`
        /* The Mask creates the "fade-out" trail effect */
        .ecg-mask {
          mask-image: linear-gradient(to right, 
            transparent 0%, 
            black 85%, 
            black 95%, 
            transparent 100%
          );
          mask-size: 30% 100%;
          mask-repeat: no-repeat;
          animation: scan 4s linear infinite;
        }

        /* The Scan Head follows the edge of the mask */
        .scan-head-container {
          width: 30%;
          animation: scan 4s linear infinite;
          display: flex;
          justify-content: flex-end;
        }

        @keyframes scan {
          0% { 
            transform: translateX(-30%); 
            mask-position: -30% 0;
          }
          100% { 
            transform: translateX(100%); 
            mask-position: 100% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthNeonBackground;
