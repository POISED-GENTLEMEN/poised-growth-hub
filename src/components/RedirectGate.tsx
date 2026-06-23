import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { normalizePath } from "@/lib/redirects";
import { trackThankYouView } from "@/lib/analytics";

/**
 * Normalizes the current URL (lowercase, trailing slash, legacy redirect map)
 * and fires the `thank_you_view` GA4 event on any /thank-you/ route load.
 * Mounted once inside <BrowserRouter>, above <Routes>.
 */
export function RedirectGate() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { changed, path } = normalizePath(location.pathname);
    if (changed) {
      navigate(path + location.search + location.hash, { replace: true });
      return;
    }
    // GA4: thank_you_view on any thank-you route.
    if (/(^|\/)thank-you\/?$/.test(location.pathname)) {
      trackThankYouView(location.pathname);
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}

export default RedirectGate;
