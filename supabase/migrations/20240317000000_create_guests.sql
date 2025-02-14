create table public.guests (
    id uuid default gen_random_uuid() primary key,
    couple_id uuid references auth.users on delete cascade not null,
    name text not null,
    email text,
    phone text,
    status text default 'PENDING' check (status in ('PENDING', 'CONFIRMED', 'DECLINED')),
    number_of_companions integer default 0,
    dietary_restrictions text,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.guests enable row level security;

-- Create policies
create policy "Users can view their own guests"
    on guests for select
    using (auth.uid() = couple_id);

create policy "Users can insert their own guests"
    on guests for insert
    with check (auth.uid() = couple_id);

create policy "Users can update their own guests"
    on guests for update
    using (auth.uid() = couple_id);

create policy "Users can delete their own guests"
    on guests for delete
    using (auth.uid() = couple_id);

-- Create updated_at trigger
create trigger guests_updated_at
    before update on guests
    for each row
    execute procedure handle_updated_at(); 