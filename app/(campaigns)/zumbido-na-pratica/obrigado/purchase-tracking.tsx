"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function PurchaseTracking() {
  useEffect(() => {
    trackEvent("CompleteRegistration");
  }, []);

  return null;
}
