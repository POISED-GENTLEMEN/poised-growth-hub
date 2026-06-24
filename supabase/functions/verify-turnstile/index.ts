import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return new Response(
      JSON.stringify({ ok: false, error: "server_misconfigured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  let token = "";
  let remoteip: string | undefined;
  try {
    const body = await req.json();
    token = typeof body.token === "string" ? body.token : "";
    if (typeof body.remoteip === "string") remoteip = body.remoteip;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "invalid_json" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  if (!token) {
    return new Response(
      JSON.stringify({ ok: false, error: "missing_token" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const ip =
    remoteip ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    undefined;

  const form = new URLSearchParams();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);

  try {
    const resp = await fetch(VERIFY_URL, { method: "POST", body: form });
    const data = await resp.json();
    if (data?.success === true) {
      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    console.warn("Turnstile verification failed", { errors: data?.["error-codes"] });
    return new Response(
      JSON.stringify({ ok: false, error: "verification_failed", codes: data?.["error-codes"] ?? [] }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Turnstile verify request failed", err);
    return new Response(
      JSON.stringify({ ok: false, error: "verify_request_failed" }),
      { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
