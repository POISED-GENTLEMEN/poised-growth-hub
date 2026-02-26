
-- Email submissions table with category support
CREATE TABLE public.email_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  first_name TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for lookups
CREATE INDEX idx_email_submissions_category ON public.email_submissions (category);
CREATE INDEX idx_email_submissions_email ON public.email_submissions (email);

-- Enable RLS
ALTER TABLE public.email_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public signup forms)
CREATE POLICY "Anyone can submit email"
  ON public.email_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can read (for admin purposes)
CREATE POLICY "Authenticated users can read submissions"
  ON public.email_submissions
  FOR SELECT
  TO authenticated
  USING (true);
