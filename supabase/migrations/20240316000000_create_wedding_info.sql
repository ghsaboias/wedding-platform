create table public.wedding_info (
  id uuid references auth.users on delete cascade primary key,
  wedding_date timestamp with time zone,
  venue_name text,
  venue_address text,
  ceremony_time text,
  reception_time text,
  story text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.wedding_info enable row level security;

-- Create policies
create policy "Users can view their own wedding info" on wedding_info
  for select using (auth.uid() = id);

create policy "Users can update their own wedding info" on wedding_info
  for update using (auth.uid() = id);

create policy "Users can insert their own wedding info" on wedding_info
  for insert with check (auth.uid() = id);

-- Create public access policy for viewing wedding info
create policy "Public can view wedding info" on wedding_info
  for select using (true);

-- Create function to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger wedding_info_updated_at
  before update on wedding_info
  for each row
  execute procedure handle_updated_at(); 