-- Private storage bucket for uploaded client report PDFs.
-- Files are deleted server-side after Claude analysis completes.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'client-pdf-uploads',
  'client-pdf-uploads',
  false,
  20971520,
  ARRAY['application/pdf']
)
on conflict (id) do nothing;

-- Authenticated users can upload into their own agency's folder
create policy "agency_pdf_upload" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'client-pdf-uploads'
    and (storage.foldername(name))[1] = get_agency_id()::text
  );

-- Authenticated users can delete from their own agency's folder (post-analysis cleanup)
create policy "agency_pdf_delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'client-pdf-uploads'
    and (storage.foldername(name))[1] = get_agency_id()::text
  );
