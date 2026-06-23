// Lightweight GA4 event helper. Uses gtag if loaded (see index.html),
// otherwise falls back to dataLayer.push so events aren't lost during early
// page load or when blockers strip the gtag.js shim.
type GtagFn = (...args: unknown[]) => void;
type DL = unknown[];

export type GA4EventName =
  | "one_pager_download"
  | "thank_you_view"
  | "proposal_or_inquiry_submit"
  | "book_call_click"
  | "shop_click";

export function trackEvent(name: GA4EventName | string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: GtagFn; dataLayer?: DL };
  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", name, params);
    } else {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event: name, ...params });
    }
  } catch {
    /* analytics must never break the app */
  }
}

// Convenience wrappers for the named conversion events.
export const trackOnePagerDownload = (label = "schools_one_pager") =>
  trackEvent("one_pager_download", { event_category: "conversion", event_label: label });

export const trackThankYouView = (page: string) =>
  trackEvent("thank_you_view", { event_category: "conversion", page });

export const trackProposalOrInquirySubmit = (segment: string) =>
  trackEvent("proposal_or_inquiry_submit", {
    event_category: "conversion",
    event_label: segment,
    segment,
  });

export const trackBookCallClick = (label = "calendar") =>
  trackEvent("book_call_click", { event_category: "conversion", event_label: label });

// Delegate listener for any element marked data-event="book_call_click".
// Mounted once in App; lets future calendar buttons fire without wiring.
export function installBookCallDelegate() {
  if (typeof document === "undefined") return;
  if ((window as unknown as { __pgBookCallBound?: boolean }).__pgBookCallBound) return;
  (window as unknown as { __pgBookCallBound?: boolean }).__pgBookCallBound = true;
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    const el = target?.closest?.('[data-event="book_call_click"]') as HTMLElement | null;
    if (!el) return;
    trackBookCallClick(el.dataset.gaLabel || "calendar");
  });
}
