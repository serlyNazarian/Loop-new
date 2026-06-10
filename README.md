# Loop v2 — Frontend

The Loop dashboard UI, rebuilt as a standalone single-page app. It renders the marketing-free, authenticated product (auth flows + dashboard) and talks to a separate Node backend over HTTP.

> AI customer communication platform — unify WhatsApp, Telegram, Instagram & more, with an AI agent that handles replies 24/7.

## Stack

- **Create React App** (react-scripts) · **React 19** · plain **JavaScript** (no TypeScript)
- **antd v6** for UI, wrapped behind a local `My*` component kit
- **react-router-dom v6** for routing
- **Zustand** for state (`authStore`, `workspaceStore`)
- A separate **Node backend** (not in this repo) serves `/api/**`

## Getting started

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

### Environment

CRA only exposes vars prefixed `REACT_APP_`. Configure the backend origin in `.env`:

```
REACT_APP_API_BASE_URL=http://localhost:4000
```

Because the app and the API are on different origins, the backend must send
`Access-Control-Allow-Credentials: true` with a specific `Access-Control-Allow-Origin`,
and auth cookies need `SameSite=None; Secure`. In dev you can instead leave
`REACT_APP_API_BASE_URL` empty and add `"proxy": "http://localhost:4000"` to
`package.json` to keep everything same-origin (simpler cookies).

## Scripts

- `npm start` — run the dev server (hot reload) at http://localhost:3000
- `npm run build` — production build to `build/`
- `npm test` — test runner (watch mode)

## Project structure

```
src/
  pages/<area>/<Page>.js         screens (a multi-state page becomes a folder)
  layouts/<name>Layout/          OutsideLayout (auth), InsideLayout (dashboard shell)
  components/my<thing>/My*.js     thin antd wrappers — pages compose these, not antd
  stores/                         Zustand (authStore, workspaceStore)
  actions/<domain>Actions.js      API calls (wrap utils/apiClient)
  routes/                         Route.js, RequireAuth, PermissionGuard
  hooks/  utils/  config/  styles/  assets/
```

- **Auth pages** (`OutsideLayout`): `/login`, `/get-started`, `/verify`, `/forgot-password`, `/invite/:token`.
- **Dashboard** (`RequireAuth` → `InsideLayout`): `/dashboard` and its feature routes. The shell carries the nav, workspace switcher, notifications, presence, theme toggle, and a branded loader.
- Pages are lazy-loaded; layouts handle the `Suspense` fallback.

## How data flows

`component / store` → **action** (`src/actions/<domain>Actions.js`, defines the endpoint) → **apiClient** (`src/utils/apiClient.js`, the only place `fetch` is called: base URL, cookies, JSON, `ApiError`) → backend.

Never call `apiClient`/`fetch` directly from a component, page, or store — always go through an action.

## Theming

All colour and control sizing lives in `src/config/antdTheme.js` (brand primary `#5b00fd`, Garet font, 46px large controls, plus custom `auth*` / dashboard / loader tokens). Components read colours via `theme.useToken()` — no colour literals in pages or components. A light/dark toggle is wired via the `.dark` class on `<html>` (bootstrapped in `public/index.html` to avoid a flash).

## Conventions

Coding conventions for this project (wrap antd via `My*`, theme tokens only, actions layer, when to split multi-state pages, etc.) are documented in [`CLAUDE.md`](./CLAUDE.md). Read it before adding code.
