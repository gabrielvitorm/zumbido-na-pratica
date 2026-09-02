"use client";

import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { trackEvent, type TrackingEventName } from "@/lib/tracking";

type Variant = "primary" | "secondary";

function variantClasses(variant: Variant, accentClassName?: string): string {
  if (variant === "secondary") {
    return "bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5";
  }
  return accentClassName ?? "bg-brand-accent text-white hover:bg-brand-accent/90";
}

const baseClasses =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 text-lg font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Only applies when `variant="primary"`; silently ignored for `variant="secondary"` (see `variantClasses`). */
  accentClassName?: string;
}

export function Button({ variant = "primary", accentClassName, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses(variant, accentClassName)} ${className}`} {...props} />
  );
}

export interface CtaLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  trackAs?: TrackingEventName;
  /** Extra params merged into the trackAs event (e.g. value, currency, content_name, cta_position). */
  trackParams?: Record<string, unknown>;
  /** Only applies when `variant="primary"`; silently ignored for `variant="secondary"` (see `variantClasses`). */
  accentClassName?: string;
}

export function CtaLink({
  variant = "primary",
  accentClassName,
  className = "",
  trackAs,
  trackParams,
  onClick,
  ...props
}: CtaLinkProps) {
  return (
    <a
      className={`${baseClasses} ${variantClasses(variant, accentClassName)} ${className}`}
      onClick={(event) => {
        if (trackAs) trackEvent(trackAs, trackParams);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
