"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function PurchaseTracking() {
  useEffect(() => {
    trackEvent("Purchase", { value: 2470, currency: "BRL" });
  }, []);

  return null;
}
