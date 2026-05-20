-- Agency invites table
-- Run this in Supabase SQL editor after the initial schema.sql

create table agency_invites (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade not null,
  email text not null,
  role text default 'member' check (role in ('admin', 'member')),
  invited_by uuid references agency_users(id),
  token text unique not null default encode(gen_random_bytes(32), 'hex'),
  accepted_at timestamptz,
  expires_at timestamptz default (now() + interval '7 days'),
  created_at timestamptz default now()
);

create index on agency_invites(agency_id);
create index on agency_invites(token);
create index on agency_invites(email);

alter table agency_invites enable row level security;

-- Anyone in the agency can view invites; owner/admin can create/delete
create policy "invites_select" on agency_invites
  for select using (agency_id = get_agency_id());

create policy "invites_insert" on agency_invites
  for insert with check (agency_id = get_agency_id());

create policy "invites_delete" on agency_invites
  for delete using (agency_id = get_agency_id());

-- Public read for invite acceptance (by token) — no auth required
-- This is handled via service role in the accept endpoint
