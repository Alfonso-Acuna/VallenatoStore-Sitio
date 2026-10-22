-- ============================================================
-- VallenatoStore · Esquema de Supabase
-- Ejecutar completo en Supabase → SQL Editor.
-- Incluye tablas, RLS, triggers, políticas, permisos y catálogo.
-- ============================================================

create extension if not exists pgcrypto;

-- ============================================================
-- 1. TABLAS
-- ============================================================

create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    full_name text,
    created_at timestamptz not null default now()
);

create table if not exists public.products (
    id text primary key,
    title text not null,
    artist text,
    format text check (format in ('Vinilo', 'CD', 'Digital')),
    price numeric(12, 2) not null check (price >= 0),
    image_url text
);

create table if not exists public.cart_items (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    product_id text not null references public.products (id) on delete cascade,
    quantity integer not null default 1 check (quantity > 0),
    created_at timestamptz not null default now(),
    constraint cart_items_user_product_unique unique (user_id, product_id)
);

create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    total_amount numeric(12, 2) not null check (total_amount >= 0),
    status text not null default 'completed',
    created_at timestamptz not null default now()
);

create table if not exists public.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references public.orders (id) on delete cascade,
    product_id text not null references public.products (id),
    quantity integer not null check (quantity > 0),
    unit_price numeric(12, 2) not null check (unit_price >= 0)
);

create index if not exists cart_items_user_id_idx on public.cart_items (user_id);
create index if not exists orders_user_id_created_at_idx on public.orders (user_id, created_at desc);
create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- ============================================================
-- 2. PERFIL AUTOMÁTICO AL REGISTRAR UN USUARIO
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, full_name)
    values (
        new.id,
        coalesce(nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1))
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- ============================================================
-- 3. ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- ---------- profiles ----------
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- ---------- products ----------
drop policy if exists "products_select_public" on public.products;
create policy "products_select_public"
on public.products for select
to anon, authenticated
using (true);

-- ---------- cart_items ----------
drop policy if exists "cart_items_select_own" on public.cart_items;
create policy "cart_items_select_own"
on public.cart_items for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "cart_items_insert_own" on public.cart_items;
create policy "cart_items_insert_own"
on public.cart_items for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "cart_items_update_own" on public.cart_items;
create policy "cart_items_update_own"
on public.cart_items for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "cart_items_delete_own" on public.cart_items;
create policy "cart_items_delete_own"
on public.cart_items for delete
to authenticated
using (auth.uid() = user_id);

-- ---------- orders ----------
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
on public.orders for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own"
on public.orders for insert
to authenticated
with check (auth.uid() = user_id);

-- ---------- order_items ----------
drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own"
on public.order_items for select
to authenticated
using (
    exists (
        select 1
        from public.orders o
        where o.id = order_items.order_id
          and o.user_id = auth.uid()
    )
);

drop policy if exists "order_items_insert_own" on public.order_items;
create policy "order_items_insert_own"
on public.order_items for insert
to authenticated
with check (
    exists (
        select 1
        from public.orders o
        where o.id = order_items.order_id
          and o.user_id = auth.uid()
    )
);

-- ============================================================
-- 4. PERMISOS
-- La anon key solo puede leer el catálogo. El carrito y las
-- órdenes requieren una sesión autenticada.
-- ============================================================

grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.cart_items to authenticated;
grant select, insert on public.orders to authenticated;
grant select, insert on public.order_items to authenticated;

-- ============================================================
-- 5. CATÁLOGO INICIAL (24 productos)
-- El id es el título exacto usado por el frontend en el carrito.
-- ============================================================

insert into public.products (id, title, artist, format, price, image_url) values
    ('30 Mejores', '30 Mejores', 'Binomio de Oro', 'CD', 38000, 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d4/15/84/d41584be-590b-bf6d-7a71-7c5fb1659ff4/0.jpg/300x300bb.jpg'),
    ('30 Grandes Éxitos', '30 Grandes Éxitos', 'Diomedes Díaz', 'CD', 38000, 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/a4/93/49/a493492d-540c-5afa-c4c4-41842cfc05b9/886446879833.jpg/300x300bb.jpg'),
    ('Experiencias Vividas', 'Experiencias Vividas', 'Diomedes Díaz & Colacho Mendoza', 'Vinilo', 180000, 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/a4/93/49/a493492d-540c-5afa-c4c4-41842cfc05b9/886446879833.jpg/300x300bb.jpg'),
    ('Un Canto Celestial', 'Un Canto Celestial', 'Diomedes Díaz & Iván Zuleta', 'CD', 45000, 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d4/15/84/d41584be-590b-bf6d-7a71-7c5fb1659ff4/0.jpg/300x300bb.jpg'),
    ('Título de Amor', 'Título de Amor', 'Diomedes Díaz & Juancho Rois', 'Vinilo', 180000, 'https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/a4/93/49/a493492d-540c-5afa-c4c4-41842cfc05b9/886446879833.jpg/300x300bb.jpg'),
    ('Celedón Sin Fronteras', 'Celedón Sin Fronteras', 'Jorge Celedón', 'Digital', 25000, 'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/71/45/4b/71454b33-c741-881a-7cfa-5478bef59daf/886444178754.jpg/300x300bb.jpg'),
    ('Llévame en Tus Sueños', 'Llévame en Tus Sueños', 'Jorge Celedón & Jimmy Zambrano', 'Vinilo', 150000, 'https://is1-ssl.mzstatic.com/image/thumb/Music/61/8a/93/mzi.lxwtgmyr.jpg/300x300bb.jpg'),
    ('Los 30 Vallenatos de la Historia', 'Los 30 Vallenatos de la Historia', 'Varios artistas', 'CD', 60000, 'https://is1-ssl.mzstatic.com/image/thumb/Music/08/4c/2f/mzi.viewyqhe.jpg/300x300bb.jpg'),
    ('La Hora de la Verdad', 'La Hora de la Verdad', 'Kaleth Morales & Andrés Herrera', 'CD', 45000, 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2e/cb/6f/2ecb6f8e-550a-4c52-ab6a-b41986fbac04/mzi.copfhxiq.jpg/300x300bb.jpg'),
    ('Imparables', 'Imparables', 'Martín Elías', 'Digital', 25000, 'https://is1-ssl.mzstatic.com/image/thumb/Music20/v4/76/77/0a/76770af8-aa97-54f8-b7f9-e722726e09c8/mzm.edlkydau.jpg/300x300bb.jpg'),
    ('A Mi Manera', 'A Mi Manera', 'Felipe Peláez & Zabaleta', 'Vinilo', 150000, 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a5/33/fc/a533fcef-4fe5-f108-41d6-075ed0ab5320/886444497398.jpg/300x300bb.jpg'),
    ('10 Años de Historia', '10 Años de Historia', 'Los Diablitos', 'CD', 45000, 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/27/52/91/27529196-d103-a793-5601-0e588981dd99/829410988254.png/300x300bb.jpg'),
    ('Poncho Zuleta 45 Años', 'Poncho Zuleta 45 Años', 'Poncho Zuleta', 'CD', 45000, 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/f3/02/02/f30202c3-d21a-a57c-8f2e-bdd49480ff04/886445865219.jpg/300x300bb.jpg'),
    ('La 9ª Batalla (En Vivo)', 'La 9ª Batalla (En Vivo)', 'Silvestre Dangond & Rolando Ochoa', 'Vinilo', 150000, 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/2c/69/a1/2c69a185-54f0-3cc6-d417-c39ecc8c8d51/196874754009.jpg/300x300bb.jpg'),
    ('Colección Top 50', 'Colección Top 50', 'Jorge Oñate', 'Vinilo', 210000, 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/90/bb/d5/90bbd5fe-3622-1aa5-58d4-f178acaea5e5/888880013514.jpg/300x300bb.jpg'),
    ('Aniversario', 'Aniversario', 'Los Hermanos Zuleta', 'Vinilo', 180000, 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/dc/da/19/dcda19d4-6e58-5257-74c4-a54e5fb239ff/mzi.pqfqwned.jpg/300x300bb.jpg'),
    ('Pa Que Te Enamores', 'Pa Que Te Enamores', 'Iván Villazón & Iván Zuleta', 'CD', 45000, 'https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/12/be/65/12be65c2-33f2-358e-b503-e52d6e31b3de/0.jpg/300x300bb.jpg'),
    ('Siempre Gigantes', 'Siempre Gigantes', 'Los Gigantes del Vallenato', 'CD', 38000, 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/7b/9f/49/7b9f49a0-77b9-fe12-e986-7298af43d9d8/192562349519.png/300x300bb.jpg'),
    ('El Caballero del Vallenato', 'El Caballero del Vallenato', 'Peter Manjarrés & Sergio Luis Rodríguez', 'Vinilo', 150000, 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/48/9e/0f/489e0fc6-a565-b679-d173-d3148d073dc1/884385771188.png/300x300bb.jpg'),
    ('Grandes Éxitos de Los Chiches Vallenatos', 'Grandes Éxitos de Los Chiches Vallenatos', 'Los Chiches Vallenatos', 'CD', 38000, 'https://is1-ssl.mzstatic.com/image/thumb/Music/y2004/m06/d04/h20/s05.bqqzigdv.jpg/300x300bb.jpg'),
    ('Adiós a la Diosa', 'Adiós a la Diosa', 'Patricia Teherán', 'CD', 38000, 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c8/60/9b/c8609b2a-5c53-5abb-e2d8-649a58b7bac3/7703770062782.png/300x300bb.jpg'),
    ('Mi Diosa Humana', 'Mi Diosa Humana', 'Miguel Morales & Juan David Herrera', 'CD', 45000, 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/40/dd/3f/40dd3f0e-8d6f-4a90-85c5-edb0ccec56ef/7703770501779.png/300x300bb.jpg'),
    ('Volver a Triunfar', 'Volver a Triunfar', 'Los Inquietos del Vallenato', 'Digital', 25000, 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/95/3d/71/953d7168-f445-08e6-a421-67ee9251b4bc/198846428529.jpg/300x300bb.jpg'),
    ('El Invencible', 'El Invencible', 'Jorge Oñate', 'Digital', 25000, 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/9a/a1/ed/9aa1eda1-bef9-868a-433b-4a53f14a8b7b/mzi.quihxmnl.jpg/300x300bb.jpg')
on conflict (id) do update set
    title = excluded.title,
    artist = excluded.artist,
    format = excluded.format,
    price = excluded.price,
    image_url = excluded.image_url;
