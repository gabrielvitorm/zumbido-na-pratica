"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export function ViewContentTracking() {
  useEffect(() => {
    trackEvent("ViewContent", { content_name: "Zumbido na Prática — Turma 4", value: 2470, currency: "BRL" });
  }, []);

  return null;
}
