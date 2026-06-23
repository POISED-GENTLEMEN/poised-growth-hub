import { useEffect } from "react";

/**
 * Marks the current page as noindex,nofollow for crawlers.
 * Adds <meta name="robots"> if absent, restores on unmount.
 */
export function useNoindex() {
  useEffect(() => {
    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    const previous = meta.getAttribute("content");
    meta.setAttribute("content", "noindex, nofollow");
    return () => {
      if (created) {
        meta?.remove();
      } else if (previous !== null) {
        meta?.setAttribute("content", previous);
      }
    };
  }, []);
}
