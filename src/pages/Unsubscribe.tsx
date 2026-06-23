import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Loader2, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type Status = "validating" | "valid" | "invalid" | "used" | "submitting" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [status, setStatus] = useState<Status>("validating");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const validate = async () => {
      if (!token) {
        setStatus("invalid");
        return;
      }
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_KEY } }
        );
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data.valid) {
          setEmail(data.email ?? "");
          setStatus("valid");
        } else if (data.reason === "already_used") {
          setStatus("used");
        } else {
          setStatus("invalid");
        }
      } catch {
        if (!cancelled) setStatus("invalid");
      }
    };
    validate();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleConfirm = async () => {
    setStatus("submitting");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    if (error || !data?.success) {
      setStatus("error");
      return;
    }
    setStatus("done");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Unsubscribe | Poised Gentlemen</title>
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://poisedgentlemen.com/unsubscribe" />
      </Helmet>

      <Header />

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <Card className="p-8 md:p-10 text-center">
            {status === "validating" && (
              <>
                <Loader2 className="w-12 h-12 text-gold mx-auto mb-6 animate-spin" />
                <h1 className="text-2xl font-heading font-bold text-primary mb-3">
                  Checking your link…
                </h1>
              </>
            )}

            {status === "valid" && (
              <>
                <Mail className="w-12 h-12 text-gold mx-auto mb-6" />
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
                  Unsubscribe
                </h1>
                <p className="text-muted-foreground mb-6">
                  Confirm you'd like to stop receiving emails
                  {email ? (
                    <>
                      {" "}at <strong className="text-foreground">{email}</strong>
                    </>
                  ) : null}
                  .
                </p>
                <Button onClick={handleConfirm} size="lg" className="w-full sm:w-auto">
                  Confirm Unsubscribe
                </Button>
              </>
            )}

            {status === "submitting" && (
              <>
                <Loader2 className="w-12 h-12 text-gold mx-auto mb-6 animate-spin" />
                <h1 className="text-2xl font-heading font-bold text-primary mb-3">
                  Processing…
                </h1>
              </>
            )}

            {status === "done" && (
              <>
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-6" />
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
                  You're unsubscribed
                </h1>
                <p className="text-muted-foreground mb-6">
                  You won't receive further emails from Poised Gentlemen. Stay Poised.
                </p>
                <Button asChild variant="outline">
                  <Link to="/">Return Home</Link>
                </Button>
              </>
            )}

            {status === "used" && (
              <>
                <CheckCircle className="w-12 h-12 text-success mx-auto mb-6" />
                <h1 className="text-2xl font-heading font-bold text-primary mb-3">
                  Already unsubscribed
                </h1>
                <p className="text-muted-foreground mb-6">
                  This address has already been removed from our list.
                </p>
                <Button asChild variant="outline">
                  <Link to="/">Return Home</Link>
                </Button>
              </>
            )}

            {(status === "invalid" || status === "error") && (
              <>
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-6" />
                <h1 className="text-2xl font-heading font-bold text-primary mb-3">
                  Link not valid
                </h1>
                <p className="text-muted-foreground mb-6">
                  This unsubscribe link is invalid or has expired. Email{" "}
                  <a href="mailto:david@risetopurpose.org" className="text-gold underline">
                    david@risetopurpose.org
                  </a>{" "}
                  and we'll remove you directly.
                </p>
                <Button asChild variant="outline">
                  <Link to="/">Return Home</Link>
                </Button>
              </>
            )}
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Unsubscribe;
