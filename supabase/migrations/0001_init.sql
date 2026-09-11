-- MarginShield v1 metadata only. No raw transaction rows.
create table if not exists organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key,
  org_id uuid not null references organisations(id),
  role text not null check (role in ('Owner', 'Analyst', 'Viewer')),
  created_at timestamptz not null default now()
);

create table if not exists scans_meta (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references organisations(id),
  engagement_label text,
  period_start date,
  period_end date,
  status text not null default 'draft',
  headline_consent boolean not null default false,
  detected_leakage numeric(18,4),
  modelled_opportunity numeric(18,4),
  created_at timestamptz not null default now()
);

alter table organisations enable row level security;
alter table profiles enable row level security;
alter table scans_meta enable row level security;

create policy org_members_profiles on profiles
  for select using (id = auth.uid());

create policy org_members_scans on scans_meta
  for all using (
    org_id in (select org_id from profiles where id = auth.uid())
  );
