-- Drop existing policy
drop policy if exists "Public profiles are viewable by everyone." on profiles;

-- Create new policy with explicit public access
create policy "Public profiles are viewable by everyone."
  on profiles for select
  to authenticated, anon
  using ( true ); 