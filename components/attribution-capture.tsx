"use client";

import { useEffect } from "react";
import { captureAttributionFromUrl } from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromUrl(window.location.search);
  }, []);

  return null;
}
