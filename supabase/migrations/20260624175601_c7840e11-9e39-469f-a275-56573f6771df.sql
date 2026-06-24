-- Tighten WITH CHECK on public lead-capture INSERT policies with column-shape validation.

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(btrim(name)) > 0
  AND char_length(name) <= 100
  AND char_length(btrim(segment)) > 0
  AND char_length(segment) <= 50
  AND (phone IS NULL OR char_length(phone) <= 40)
  AND (details IS NULL OR (jsonb_typeof(details) = 'object' AND pg_column_size(details) <= 8192))
);

DROP POLICY IF EXISTS "Anyone can submit email" ON public.email_submissions;

CREATE POLICY "Anyone can submit email"
ON public.email_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(btrim(category)) > 0
  AND char_length(category) <= 50
  AND (first_name IS NULL OR char_length(first_name) <= 100)
  AND (source IS NULL OR char_length(source) <= 100)
);
