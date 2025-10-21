-- Create storage buckets for exam documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('exam-certificates', 'exam-certificates', false, 5242880, ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic']),
  ('exam-id-photos', 'exam-id-photos', false, 5242880, ARRAY['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic']);

-- RLS Policies for exam-certificates bucket
CREATE POLICY "Users can upload their own certificates"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'exam-certificates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own certificates"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'exam-certificates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own certificates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'exam-certificates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own certificates"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'exam-certificates' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS Policies for exam-id-photos bucket
CREATE POLICY "Users can upload their own ID photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'exam-id-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own ID photos"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'exam-id-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own ID photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'exam-id-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own ID photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'exam-id-photos' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);