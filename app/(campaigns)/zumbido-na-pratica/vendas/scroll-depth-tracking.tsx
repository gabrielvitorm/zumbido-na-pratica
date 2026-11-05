"use client";

import { useEffect, useRef } from "react";
import { trackCampaignEvent } from "@/lib/tracking";

const MILESTONES = [25, 50, 75, 100] as const;

export function ScrollDepthTracking() {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) return;

      const percent = (window.scrollY / scrollable) * 100;

      for (const milestone of MILESTONES) {
        if (percent >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackCampaignEvent("scroll_depth", { percent: milestone, page: "vendas" });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
