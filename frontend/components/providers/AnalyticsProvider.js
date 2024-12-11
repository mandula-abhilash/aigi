"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initGA, trackPageView } from "@/lib/analytics/core";

export function AnalyticsProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize GA4
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on route change
    trackPageView(pathname);
  }, [pathname]);

  return <>{children}</>;
}
