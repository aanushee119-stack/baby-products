-- Run in Supabase SQL Editor so the admin dashboard can manage data.

-- Products: allow create, update, delete
create policy "Allow product inserts"
  on products for insert to anon, authenticated with check (true);

create policy "Allow product updates"
  on products for update to anon, authenticated using (true);

create policy "Allow product deletes"
  on products for delete to anon, authenticated using (true);

-- Orders: allow admin to read
create policy "Allow order reads"
  on orders for select to anon, authenticated using (true);
