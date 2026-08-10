export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children }: CardProps) {
  return (
    <div className={`rounded-xl bg-white shadow-sm shadow-black/5 p-6 ${className}`}>
      {children}
    </div>
  );
}
