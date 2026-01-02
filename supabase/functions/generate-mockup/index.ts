import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify user is authenticated
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(JSON.stringify({ error: 'Unauthorized. Please sign in to use this feature.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Authenticated user:', user.id);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const prompt = `Create a professional high-fidelity web design mockup of a pricing carousel section for "Poised Gentlemen" premium men's grooming and mentorship brand.

Design specifications:
- Background: Dark navy (#1a1a2e) with subtle texture
- Accent color: Rich gold (#d4af37)
- Section header: "Programs for Every Journey" in elegant serif font, centered, gold underline accent

Tab Navigation (centered, horizontal):
- 4 pill-shaped tab buttons with icons
- "For Boys" (gamepad icon) - ACTIVE state with gold background, navy text
- "For Men" (briefcase icon) - inactive, navy with gold border
- "For Mentors" (graduation cap icon) - inactive
- "For Parents" (heart icon) - inactive
- Tabs have subtle hover states and smooth transitions

Card Grid (3 cards in a row):
Each card has:
- Gradient header: navy to gold/20 gradient with bundle icon
- Optional "POPULAR" badge in gold (middle card)
- Bundle name in gold heading font (e.g., "Foundation Bundle", "Growth Bundle", "Complete Bundle")
- Large price: "$149" in gold with original "$196" struck through in gray
- "Save 24%" badge in green
- "What's Included:" section with 4 bullet items with checkmarks
- List items like "Confidence Bootcamp Course", "Personal Style Guide", etc.
- "Bonus Features:" section with 2 items (trophy icons)
- Gold "Get Started" CTA button at bottom

Overall aesthetic:
- Premium, sophisticated, modern
- Clean typography hierarchy
- Subtle shadows and depth
- Professional web UI mockup style
- 16:9 aspect ratio, desktop viewport
- High fidelity, ready for stakeholder review`;

    console.log('Generating mockup image...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response received:', JSON.stringify(data).substring(0, 200));

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textContent = data.choices?.[0]?.message?.content;

    if (!imageUrl) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('No image generated in response');
    }

    return new Response(JSON.stringify({ 
      imageUrl,
      description: textContent || 'Carousel mockup generated successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error generating mockup:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
