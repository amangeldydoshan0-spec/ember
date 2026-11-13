-- Run this in the Supabase SQL editor before taking online reservations.
-- The site inserts with the anon key. Guests cannot read other bookings.

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  reservation_date date not null,
  reservation_time text not null,
  guests integer not null,
  created_at timestamptz not null default now(),
  constraint reservations_name_length check (char_length(name) between 2 and 80),
  constraint reservations_phone_format check (phone ~ '^\+7\d{10}$'),
  constraint reservations_time_format check (reservation_time ~ '^([01][0-9]|2[0-3]):(00|30)$'),
  constraint reservations_time_window check (reservation_time >= '17:00' and reservation_time <= '23:30'),
  constraint reservations_guests_range check (guests between 1 and 12),
  constraint reservations_not_monday check (extract(isodow from reservation_date) <> 1),
  constraint reservations_horizon check (
    reservation_date >= (timezone('Asia/Almaty', now()))::date - 1
    and reservation_date <= (timezone('Asia/Almaty', now()))::date + 90
  )
);

create index if not exists reservations_date_idx on public.reservations (reservation_date);

alter table public.reservations enable row level security;
alter table public.reservations force row level security;

revoke all on table public.reservations from public, anon, authenticated;
grant insert on table public.reservations to anon, authenticated;

drop policy if exists "Public can create a reservation" on public.reservations;
create policy "Public can create a reservation"
  on public.reservations
  for insert
  to anon, authenticated
  with check (
    char_length(name) between 2 and 80
    and phone ~ '^\+7\d{10}$'
    and guests between 1 and 12
    and reservation_time >= '17:00'
    and reservation_time <= '23:30'
    and extract(isodow from reservation_date) <> 1
  );
