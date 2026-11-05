import { CountdownTimer } from "./countdown-timer";
import { CtaLink } from "./button";
import type { CampaignState } from "@/lib/black-november";
import type { BlackNovemberEventName } from "@/lib/tracking";

export interface StickyBarProps {
  text: string;
  variant: "default" | "urgent";
  countdownTarget?: string;
  backgroundClassName?: string;
  countdownClassName?: string;
  campaignState?: CampaignState;
  price?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaTrackParams?: Record<string, unknown>;
  ctaCustomEventName?: BlackNovemberEventName;
}

export function StickyBar({
  text,
  variant,
  countdownTarget,
  backgroundClassName,
  countdownClassName = "font-mono",
  campaignState,
  price,
  ctaHref,
  ctaLabel,
  ctaTrackParams,
  ctaCustomEventName,
}: StickyBarProps) {
  const defaultBackgroundClass = variant === "urgent" ? "bg-brand-alert" : "bg-brand-primary";

  return (
    <div
      className={`sticky top-0 z-50 flex min-h-11 w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 ${backgroundClassName ?? defaultBackgroundClass} px-3 py-2 text-center text-xs font-medium text-white`}
    >
      <span>{text}</span>
      {countdownTarget ? (
        <span className={`ml-3 ${countdownClassName}`}>
          <CountdownTimer targetDate={countdownTarget} state={campaignState} />
        </span>
      ) : null}
      {price ? <span className="font-bold text-gold-light">{price}</span> : null}
      {ctaHref && ctaLabel ? (
        <CtaLink
          href={ctaHref}
          trackAs="InitiateCheckout"
          trackParams={ctaTrackParams}
          trackCustomAs={ctaCustomEventName}
          className="min-h-11 px-4 py-2 text-sm"
          accentClassName="bg-gold-light text-navy hover:bg-gold"
        >
          {ctaLabel}
        </CtaLink>
      ) : null}
    </div>
  );
}
