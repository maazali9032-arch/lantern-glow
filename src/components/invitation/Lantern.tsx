import { cn } from "@/lib/utils";

interface LanternProps {
  /** rendered pixel width of the lantern body */
  size?: number;
  /** length of the hanging chain in px */
  chain?: number;
  /** 0..1 – how far the glow reaches relative to size */
  glowScale?: number;
  /** slower/faster idle sway */
  swayDuration?: number;
  className?: string;
  /** ornamental variant */
  variant?: "ornate" | "simple";
}

/**
 * A hanging lantern built from SVG + layered radial glows.
 * Lighting is driven by the `--lit` custom property (0 = dark, 1 = fully lit)
 * which parent ScrollTrigger timelines animate.
 */
export function Lantern({
  size = 96,
  chain = 120,
  glowScale = 6,
  swayDuration = 7,
  className,
  variant = "ornate",
}: LanternProps) {
  const glow = size * glowScale;

  return (
    <div
      className={cn("lantern pointer-events-none select-none", className)}
      style={{ width: size, ["--lantern-sway" as string]: `${swayDuration}s` }}
    >
      <div className="lantern-sway origin-top">
        {/* chain */}
        <div className="mx-auto flex flex-col items-center" style={{ height: chain }}>
          <div className="h-full w-px bg-gradient-to-b from-transparent via-[color:var(--metal)] to-[color:var(--metal-bright)] opacity-70" />
        </div>

        <div className="relative" style={{ width: size, height: size * 1.45 }}>
          {/* outer atmospheric glow */}
          <div
            className="lantern-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: glow,
              height: glow,
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--ember) 18%, transparent) 0%, color-mix(in oklab, var(--ember) 6%, transparent) 32%, transparent 68%)",
            }}
          />
          {/* mid glow */}
          <div
            className="lantern-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: glow * 0.42,
              height: glow * 0.42,
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--ember-bright) 45%, transparent) 0%, transparent 65%)",
            }}
          />
          {/* light cone falling below */}
          <div
            className="lantern-glow absolute left-1/2 top-1/2 -translate-x-1/2"
            style={{
              width: size * 2.6,
              height: size * 5,
              background:
                "linear-gradient(to bottom, color-mix(in oklab, var(--ember) 7%, transparent), transparent 70%)",
              clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
              filter: "blur(26px)",
            }}
          />

          <svg
            viewBox="0 0 100 145"
            width={size}
            height={size * 1.45}
            className="relative"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`metal-${size}-${variant}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--metal)" />
                <stop offset="45%" stopColor="var(--metal-bright)" />
                <stop offset="100%" stopColor="var(--metal-dark)" />
              </linearGradient>
              <radialGradient id={`chamber-${size}-${variant}`} cx="50%" cy="55%" r="55%">
                <stop offset="0%" stopColor="var(--ember-bright)" />
                <stop offset="55%" stopColor="var(--ember)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--ember) 25%, transparent)" />
              </radialGradient>
            </defs>

            {/* crown / finial */}
            <path
              d="M50 2 L54 10 L46 10 Z"
              fill={`url(#metal-${size}-${variant})`}
            />
            <path
              d="M30 26 Q50 6 70 26 Z"
              fill={`url(#metal-${size}-${variant})`}
              opacity="0.95"
            />
            <rect x="27" y="26" width="46" height="4" rx="2" fill={`url(#metal-${size}-${variant})`} />

            {/* glass chamber */}
            <path
              d="M31 30 Q26 70 34 106 L66 106 Q74 70 69 30 Z"
              className="lantern-chamber"
              fill={`url(#chamber-${size}-${variant})`}
            />
            {/* chamber frame */}
            <path
              d="M31 30 Q26 70 34 106 L66 106 Q74 70 69 30 Z"
              fill="none"
              stroke={`url(#metal-${size}-${variant})`}
              strokeWidth="2.4"
            />
            {variant === "ornate" && (
              <g stroke={`url(#metal-${size}-${variant})`} strokeWidth="1.1" opacity="0.85" fill="none">
                <path d="M50 30 L50 106" />
                <path d="M29 52 Q50 60 71 52" />
                <path d="M31 80 Q50 88 69 80" />
                <path d="M40 40 q10 -8 20 0" />
              </g>
            )}

            {/* flame */}
            <ellipse cx="50" cy="72" rx="6" ry="11" className="lantern-flame" fill="var(--ember-bright)" />
            <ellipse cx="50" cy="74" rx="2.6" ry="5.5" className="lantern-flame" fill="var(--ivory)" />

            {/* base */}
            <path d="M30 106 h40 l-5 9 h-30 Z" fill={`url(#metal-${size}-${variant})`} />
            <path d="M50 115 l4 10 l-4 8 l-4 -8 Z" fill={`url(#metal-${size}-${variant})`} opacity="0.9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
