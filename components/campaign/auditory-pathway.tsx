// Renders ONLY the decorative path line — no nodes. `preserveAspectRatio="none"`
// non-uniformly scales x/y to stretch the path to fit any content height, and that
// scale applies to every child. `vectorEffect="non-scaling-stroke"` only protects
// the path's stroke width from that scale, NOT circle geometry — so the two coral
// "key moment" nodes previously drawn here as <circle> children rendered as
// distorted ellipses (and one was fully hidden behind the opaque Virada card).
// The nodes now live in `vendas/page.tsx` as real, absolutely-positioned HTML
// elements sized in px (not SVG viewBox units), siblings of this SVG inside the
// same `relative` wrapper, so they stay circular at every viewport width.
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
    </svg>
  );
}
