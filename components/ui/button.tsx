"use client";

import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { trackEvent, type TrackingEventName } from "@/lib/tracking";

type Variant = "primary" | "secondary";

function variantClasses(variant: Variant): string {
  if (variant === "secondary") {
    return "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5";
  }
  return "bg-brand-accent text-white hover:bg-brand-accent/90";
}

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses(variant)} ${className}`} {...props} />
  );
}

export interface CtaLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  trackAs?: TrackingEventName;
}

export function CtaLink({ variant = "primary", className = "", trackAs, onClick, ...props }: CtaLinkProps) {
  return (
    <a
      className={`${baseClasses} ${variantClasses(variant)} ${className}`}
      onClick={(event) => {
        if (trackAs) trackEvent(trackAs);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
