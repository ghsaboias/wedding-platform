-- Drop existing policy
drop policy if exists "Public can view wedding info" on wedding_info;

-- Create new policy with explicit public access
create policy "Public can view wedding info"
  on wedding_info for select
  to authenticated, anon
  using (true); 