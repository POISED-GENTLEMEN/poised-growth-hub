import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/hubspot';

const BodySchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  tag: z.string().trim().min(1).max(100),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const HUBSPOT_API_KEY = Deno.env.get('HUBSPOT_API_KEY');
    if (!LOVABLE_API_KEY || !HUBSPOT_API_KEY) {
      return new Response(JSON.stringify({ error: 'HubSpot not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { first_name, email, tag } = parsed.data;

    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': HUBSPOT_API_KEY,
      'Content-Type': 'application/json',
    };

    const properties = {
      email,
      firstname: first_name,
      lead_source_tag: tag,
      hs_lead_status: 'NEW',
    };

    // Try create first
    let res = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ properties }),
    });

    let data: any = await res.json().catch(() => ({}));

    // If conflict (already exists), update by email
    if (res.status === 409) {
      const upd = await fetch(
        `${GATEWAY_URL}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ properties }),
        },
      );
      data = await upd.json().catch(() => ({}));
      if (!upd.ok) {
        return new Response(
          JSON.stringify({ error: 'HubSpot update failed', status: upd.status, data }),
          { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        );
      }
    } else if (!res.ok) {
      return new Response(
        JSON.stringify({ error: 'HubSpot create failed', status: res.status, data }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    return new Response(JSON.stringify({ ok: true, contact: data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('hubspot-create-contact error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
