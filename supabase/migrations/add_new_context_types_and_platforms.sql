-- Add tiktok_ads to data_connections platform constraint
ALTER TABLE data_connections
  DROP CONSTRAINT IF EXISTS data_connections_platform_check;
ALTER TABLE data_connections
  ADD CONSTRAINT data_connections_platform_check
  CHECK (platform IN ('ga4', 'google_ads', 'meta_ads', 'tiktok_ads'));

-- Add new context types: change, win, kpi
ALTER TABLE client_context
  DROP CONSTRAINT IF EXISTS client_context_context_type_check;
ALTER TABLE client_context
  ADD CONSTRAINT client_context_context_type_check
  CHECK (context_type IN ('promise', 'sensitivity', 'goal', 'note', 'change', 'win', 'kpi'));
