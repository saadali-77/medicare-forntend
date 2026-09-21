# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a Vite + React 19 + TypeScript scaffold for a hospital application ("medicare-hospital"). The repo currently contains only the default Vite template (`src/App.tsx` is still the unmodified counter demo) — no application routes, pages, or API integration have been built yet. The working directory is `medicare-hospital/` (the repo root `D:\Medicare-Hospital` just wraps this one project folder).

The dependency set signals the intended stack even though it isn't wired up yet:
- **react-router-dom** — routing (not yet configured; there is no router in `main.tsx`)
- **@tanstack/react-query** + **axios** — server state / data fetching (no client or API layer exists yet)
- **react-hook-form** + **@hookform/resolvers** + **zod** — forms and schema validation
- **tailwindcss** v4 via `@tailwindcss/vite` — styling (Tailwind is wired into `vite.config.ts` but `src/index.css`/`src/App.css` still hold the default template styles, not Tailwind utility usage)
- **lucide-react** — icon set

When building out features, expect to be creating this structure from scratch rather than following existing conventions — check with the user on routing/data-fetching conventions before assuming a pattern.

## Commands

Run from `medicare-hospital/`:

```
npm run dev       # start Vite dev server with HMR
npm run build     # type-check (tsc -b) then production build via vite build
npm run lint      # eslint .
npm run preview   # preview the production build locally
```

There is no test runner configured in `package.json` yet.

## TypeScript config

Split project references: `tsconfig.json` -> `tsconfig.app.json` (src, browser/DOM libs, bundler module resolution, strict unused-locals/params) and `tsconfig.node.json` (Vite config itself). `tsc -b` (used in `npm run build`) type-checks via project references — it does not emit JS (bundling is Vite's job).

## Lint config

Flat ESLint config (`eslint.config.js`) using `typescript-eslint` recommended, `eslint-plugin-react-hooks` recommended, and `eslint-plugin-react-refresh` (Vite variant). Type-aware lint rules are not enabled by default (see README for how to opt in with `recommendedTypeChecked`/`strictTypeChecked` if needed later).
