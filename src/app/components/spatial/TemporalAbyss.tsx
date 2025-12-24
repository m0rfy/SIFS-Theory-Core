/**
 * Level 0: The Temporal Abyss
 * 
 * Фоновая сетка координат, которая "дышит" в такт с Oscillation Freq
 * В будущем: WebGPU для частиц времени (с Canvas fallback)
 */

export function TemporalAbyss() {
  return (
    <div className="temporal-abyss">
      {/* Сетка координат */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        style={{
          animation: `breathe var(--sifs-oscillation-speed, 1s) ease-in-out infinite`,
        }}
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
