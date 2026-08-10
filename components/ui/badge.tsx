export interface BadgeProps {
  tone?: "neutral" | "success" | "alert";
  children: React.ReactNode;
  className?: string;
}

function toneClasses(tone: NonNullable<BadgeProps["tone"]>): string {
  switch (tone) {
    case "success":
      return "bg-brand-success/10 text-brand-success";
    case "alert":
      return "bg-brand-alert/10 text-brand-alert";
    default:
      return "bg-brand-primary/10 text-brand-primary";
  }
}

export function Badge({ tone = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${toneClasses(tone)} ${className}`}
    >
      {children}
    </span>
  );
}
