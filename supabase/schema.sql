-- NarratorHQ Database Schema
-- Run this in Supabase SQL editor

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- AGENCIES (the paying customer — a marketing agency)
-- ============================================================
create table agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  brand_color text default '#2563eb',
  tone text default 'professional' check (tone in ('professional', 'conversational', 'data-heavy')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan text default 'trial' check (plan in ('trial', 'starter', 'growth', 'agency', 'cancelled')),
  trial_ends_at timestamptz default (now() + interval '14 days'),
  client_limit int default 5,
  created_at timestamptz default now()
);

-- ============================================================
-- AGENCY USERS (team members of the agency)
-- ============================================================
create table agency_users (
  id uuid primary key references auth.users(id) on delete cascade,
  agency_id uuid references agencies(id) on delete cascade,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- ============================================================
-- CLIENTS (the agency's clients)
-- ============================================================
create table clients (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade not null,
  name text not null,
  industry text,
  logo_url text,
  report_email text,
  report_frequency text default 'monthly' check (report_frequency in ('weekly', 'monthly')),
  tone_override text check (tone_override in ('professional', 'conversational', 'data-heavy')),
  custom_instructions text,
  goals text,
  is_archived boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- DATA CONNECTIONS (OAuth tokens per client per platform)
-- ============================================================
create table data_connections (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  platform text not null check (platform in ('ga4', 'google_ads', 'meta_ads', 'tiktok_ads')),
  property_id text,
  property_name text,
  access_token text not null,
  refresh_token text,
  token_expiry timestamptz,
  is_active boolean default true,
  connected_at timestamptz default now(),
  last_sync timestamptz,
  unique (client_id, platform)
);

-- ============================================================
-- REPORTS
-- ============================================================
create table reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  agency_id uuid references agencies(id) on delete cascade not null,
  period_start date not null,
  period_end date not null,
  status text default 'generating' check (status in ('generating', 'draft', 'approved', 'sent', 'failed')),

  -- Raw normalized metrics (canonical schema)
  raw_metrics jsonb,

  -- Detected anomalies fed into the prompt
  anomalies jsonb,

  -- AI-generated narrative (structured output)
  -- Array of: { section, content, confidence, supporting_metrics, is_approved, edited_content }
  narrative_sections jsonb,

  -- Original AI output before any edits (for diff highlighting)
  original_narrative jsonb,

  -- Approval
  approved_by uuid references agency_users(id),
  approved_at timestamptz,

  -- Delivery
  sent_at timestamptz,
  pdf_url text,
  email_message_id text,

  -- Generation metadata
  generation_model text default 'claude-sonnet-4-6',
  generation_error text,

  created_at timestamptz default now()
);

-- ============================================================
-- CLIENT CONTEXT (institutional memory per client)
-- ============================================================
create table client_context (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  context_type text not null check (context_type in ('promise', 'sensitivity', 'goal', 'note', 'change', 'win', 'kpi')),
  content text not null,
  is_active boolean default true,
  created_by uuid references agency_users(id),
  created_at timestamptz default now()
);

-- ============================================================
-- REPORT INSTRUCTIONS (reusable per-client prompting rules)
-- ============================================================
create table report_instructions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  instruction text not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index on agency_users(agency_id);
create index on clients(agency_id);
create index on data_connections(client_id);
create index on reports(client_id);
create index on reports(agency_id);
create index on reports(status);
create index on client_context(client_id);
create index on report_instructions(client_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table agencies enable row level security;
alter table agency_users enable row level security;
alter table clients enable row level security;
alter table data_connections enable row level security;
alter table reports enable row level security;
alter table client_context enable row level security;
alter table report_instructions enable row level security;

-- Helper: get current user's agency_id
create or replace function get_agency_id()
returns uuid
language sql
security definer
stable
as $$
  select agency_id from agency_users where id = auth.uid()
$$;

-- Agencies: users can only see their own agency
create policy "agency_users_select" on agencies
  for select using (id = get_agency_id());

create policy "agency_users_update" on agencies
  for update using (id = get_agency_id());

-- Agency users: members can see their own agency's users
create policy "agency_users_all" on agency_users
  for all using (agency_id = get_agency_id());

-- Clients: scoped to agency
create policy "clients_all" on clients
  for all using (agency_id = get_agency_id());

-- Data connections: scoped via client → agency
create policy "data_connections_all" on data_connections
  for all using (
    client_id in (select id from clients where agency_id = get_agency_id())
  );

-- Reports: scoped to agency
create policy "reports_all" on reports
  for all using (agency_id = get_agency_id());

-- Client context: scoped via client → agency
create policy "client_context_all" on client_context
  for all using (
    client_id in (select id from clients where agency_id = get_agency_id())
  );

-- Report instructions: scoped via client → agency
create policy "report_instructions_all" on report_instructions
  for all using (
    client_id in (select id from clients where agency_id = get_agency_id())
  );

-- ============================================================
-- TRIGGER: auto-create agency_user row on signup
-- ============================================================
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Only runs if agency_id passed in metadata (set during onboarding)
  if new.raw_user_meta_data->>'agency_id' is not null then
    insert into agency_users (id, agency_id, role, full_name)
    values (
      new.id,
      (new.raw_user_meta_data->>'agency_id')::uuid,
      coalesce(new.raw_user_meta_data->>'role', 'member'),
      new.raw_user_meta_data->>'full_name'
    );
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
