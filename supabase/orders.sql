-- Run this in the Supabase SQL Editor once.
-- Column names must match app/checkout/page.tsx exactly.

create table if not exists orders (
  id bigint generated always as identity primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_address text not null,
  items jsonb not null,
  total numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

drop policy if exists "Allow public inserts" on orders;

create policy "Allow public inserts"
  on orders
  for insert
  to anon, authenticated
  with check (true);
