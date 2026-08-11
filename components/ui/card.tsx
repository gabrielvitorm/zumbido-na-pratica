export interface CardProps {
  className?: string;
  elevated?: boolean;
  children: React.ReactNode;
}

export function Card({ className = "", elevated = false, children }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white p-6 ${elevated ? "shadow-md shadow-black/10" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
