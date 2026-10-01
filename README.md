# CineBook - React Movie Ticket Booking

A mobile-first movie ticket booking website built with React + Vite.

## Features
- Responsive mobile/desktop design
- Movie search and genre filtering
- Movie details and showtimes
- Cinema selection
- Interactive seat selection
- Booking summary and confirmation
- LocalStorage booking persistence
- No backend required for the demo
- Ready for GitHub + Vercel + Render

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite.

## Build

```bash
npm run build
```

## Deploy on Vercel
1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Deploy on Render
1. Push this project to GitHub.
2. Create a Static Site in Render.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. The included `render.yaml` also contains the SPA rewrite configuration.

## Important
This is a frontend-only demo. Movies, cinemas, seats and prices are mock data. Real payment, authentication, database and admin management require a backend/API.
