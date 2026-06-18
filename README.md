# Systemics

Lightweight scaffold for a frontend web app using Vite, React and TypeScript.

**Project:** contains a minimal React + TypeScript app inside the `frontend` folder.

**Quick start**

1. Change into the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open the URL printed by Vite (default http://localhost:5173).

**Available scripts (in `frontend`)**

- `npm run dev` — start Vite dev server
- `npm run build` — build production assets to `dist/`
- `npm run preview` — locally preview production build

**Repository layout**

- `frontend/` — Vite + React + TypeScript app
  - `src/` — application source (`main.tsx`, `App.tsx`, styles)
  - `index.html` — app entry HTML
  - `vite.config.ts`, `tsconfig.json` — build and TypeScript configs
