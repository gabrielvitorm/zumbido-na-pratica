"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export interface ViewContentTrackingProps {
  contentName: string;
  contentIds: string[];
  value: number;
  currency?: string;
}

export function ViewContentTracking({ contentName, contentIds, value, currency = "BRL" }: ViewContentTrackingProps) {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: contentName, content_ids: contentIds, value, currency });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once on mount only
  }, []);

  return null;
}
