# landing-site

Marketing landing page with a waitlist form. Built with Next.js 16, Supabase, Tailwind, and deployed on Vercel.

---

## Step-by-step setup

You need to do these in order. Each step has a clear finish line.

### 1. Create a Supabase project

1. Go to https://supabase.com → **Sign in with GitHub** (create a GitHub account first at https://github.com if you don't have one).
2. Click **New project**. Pick any name + a strong DB password (save it somewhere).
3. Wait ~1 minute for it to provision.
4. In the left sidebar, click **SQL Editor** → **New query**.
5. Open `supabase/schema.sql` in this repo, copy everything, paste into the SQL editor, click **Run**.
6. In the left sidebar, click **Project Settings** (gear icon) → **API**. Copy these two values:
   - **Project URL** (looks like `https://abcdxyz.supabase.co`)
   - **anon public** API key (long string starting with `eyJ...`)

### 2. Run locally

```bash
cp .env.local.example .env.local
```

Open `.env.local` and paste in the two values from step 1.6:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdxyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Then:

```bash
npm run dev
```

Open http://localhost:3000. Type an email, click **Join waitlist**. Go back to Supabase → **Table Editor** → **waitlist** and confirm the row is there.

### 3. Push to GitHub

1. Go to https://github.com/new. Create a new repo named `landing-site`. **Do not** initialize with a README/gitignore — leave it empty.
2. GitHub will show "push an existing repository from the command line" — copy the `git remote add origin ...` line.
3. In this project folder, run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/landing-site.git
git branch -M main
git push -u origin main
```

### 4. Deploy to Vercel

1. Go to https://vercel.com → **Sign up with GitHub** (free Hobby plan).
2. Click **Add New → Project**. Find your `landing-site` repo and click **Import**.
3. Vercel auto-detects Next.js. Before clicking Deploy, expand **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL` → paste your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → paste your anon key
4. Click **Deploy**. Wait ~1 minute. Done — you get a live URL.

### 5. (Optional) Custom domain

Vercel project → **Settings → Domains → Add**. Follow the DNS instructions.

---

## How it works

- `src/app/page.tsx` — the landing page (server component).
- `src/components/WaitlistForm.tsx` — the form (client component).
- `src/lib/supabase.ts` — Supabase client, reads env vars.
- `supabase/schema.sql` — DB schema + Row Level Security (RLS) policy that lets anyone insert but nobody read. **The anon key is safe to expose in the browser because RLS protects the data.**

## Scripts

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```
