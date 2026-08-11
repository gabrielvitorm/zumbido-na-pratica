export function AuditoryPathway() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 100 1000"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30 lg:opacity-50"
    >
      <path
        d="M50 0 C 20 90, 80 150, 50 260 S 15 420, 50 520 S 85 640, 50 760 S 30 900, 50 1000"
        fill="none"
        stroke="var(--color-ink-light)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      {/* Node: end of hero */}
      <circle cx="50" cy="260" r="5" fill="var(--color-coral)" />
      {/* Node: Virada section */}
      <circle cx="50" cy="520" r="5" fill="var(--color-coral)" />
    </svg>
  );
}
