-- Step 0: Ensure necessary extensions are available
create extension if not exists "uuid-ossp";

-- Step 1: Create the categories table
create table if not exists categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    slug text unique not null,
    icon text,
    created_at timestamp with time zone default timezone('utc', now()) not null
);

-- Step 2: Create the gifts table
create table gifts (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    total_price decimal(10,2) not null,
    min_contribution decimal(10,2),
    suggested_contribution decimal(10,2),
    current_contributions decimal(10,2) default 0,
    is_group_gift boolean default false,
    image_url text,
    category_id uuid references categories(id),
    user_id uuid references auth.users(id) not null,
    created_at timestamp with time zone default timezone('utc', now()) not null,
    updated_at timestamp with time zone default timezone('utc', now()) not null
);

-- Step 3: Create the contributions table
create table contributions (
    id uuid primary key default uuid_generate_v4(),
    gift_id uuid references gifts(id) not null,
    amount decimal(10,2) not null,
    contributor_name text not null,
    contributor_email text not null,
    message text,
    thanked_at timestamp with time zone,
    thank_you_message text,
    created_at timestamp with time zone default timezone('utc', now()) not null
);

-- Step 4: Insert default categories with idempotence
insert into categories (name, slug, icon) values
    ('Cozinha', 'kitchen', 'utensils'),
    ('Sala', 'living-room', 'sofa'),
    ('Quarto', 'bedroom', 'bed'),
    ('Banheiro', 'bathroom', 'shower'),
    ('Decoração', 'decor', 'palette'),
    ('Eletrônicos', 'electronics', 'tv'),
    ('Outros', 'others', 'gift')
on conflict (slug) do nothing;

-- Step 5: Enable row level security for security best practices
alter table gifts enable row level security;
alter table contributions enable row level security;

-- Step 6: Define Row Level Security (RLS) policies for gifts
create policy "Users can view their own gifts"
    on gifts for select
    using (auth.uid() = user_id);

create policy "Users can insert their own gifts"
    on gifts for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own gifts"
    on gifts for update
    using (auth.uid() = user_id);

create policy "Users can delete their own gifts"
    on gifts for delete
    using (auth.uid() = user_id);

-- Step 7: Define RLS policies for contributions
create policy "Anyone can insert contributions"
    on contributions for insert
    to authenticated, anon
    with check (true);

create policy "Gift owners can view contributions"
    on contributions for select
    using (
        exists (
            select 1 from gifts
            where gifts.id = contributions.gift_id
            and gifts.user_id = auth.uid()
        )
    );

create policy "Gift owners can update thank you messages"
    on contributions for update
    using (
        exists (
            select 1 from gifts
            where gifts.id = contributions.gift_id
            and gifts.user_id = auth.uid()
        )
    );