# EMBER

A dinner-only restaurant site for EMBER in Astana. React, TypeScript, and Tailwind CSS, with reservations stored in Supabase.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

The dev server prints a local URL, usually `http://localhost:5173`.

## Reservations

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run [`supabase/schema.sql`](supabase/schema.sql).
3. Copy `.env.example` to `.env.local` and set:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Use the **publishable** key (or the legacy anon key), not the secret or service role key. The SQL policy lets anonymous visitors insert a reservation and blocks them from reading the table.

4. Restart `npm run dev`. A valid booking then shows a confirmation and appears in the `reservations` table.

The form checks the name, a Kazakhstan phone number, the date, the seating, and the party size (1–12). Mondays are closed. Times follow Astana (`Asia/Almaty`).

The address, phone, and email in the site are sample details for this project. Replace them in `src/data/restaurant.ts` before a public launch.

## GitHub

From this `ember` folder:

```bash
git init
git add .
git commit -m "Add the EMBER restaurant site"
```

Create an empty GitHub repository, then:

```bash
git remote add origin https://github.com/YOUR_USER/ember.git
git branch -M main
git push -u origin main
```

Do not commit `.env` or `.env.local`.

If this folder stays inside the larger `ukg-leads` project, set the Vercel **Root Directory** to `ember`.

## Vercel

1. Import the GitHub repository.
2. Framework preset: **Vite**. Root directory: `ember` when the repo contains more than this site.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the project environment variables.
4. Deploy.

`vercel.json` sends unknown paths to `index.html` so client-side routes such as `/reserve` work on refresh.
