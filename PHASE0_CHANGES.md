# Phase 0 + first slice — what changed

Drop these files into your `use-loop-new` project (paths already match).

## Install one dependency
```
npm install zustand
```
(`package.json` already lists it; this just fetches it.)

## .env — add one line
```
REACT_APP_API_BASE_URL='http://localhost:4000'   # your Node backend
```
Leave it empty and set `"proxy": "http://localhost:4000"` in package.json
instead if you'd rather keep dev same-origin (simpler cookies).

## New files
- `src/utils/apiClient.js` — single fetch wrapper (base URL, cookies, errors)
- `src/stores/authStore.js` — Zustand auth state (user/status/login/logout/fetchMe)
- `src/stores/workspaceStore.js` — active workspace + permission `can()`
- `src/routes/RequireAuth.js` — gate for authenticated routes
- `src/routes/PermissionGuard.js` — per-feature permission gate
- `src/layouts/insideLayout/InsideLayout.js` — authenticated app shell (sidebar + header)
- `src/components/myButton/MyButton.js`
- `src/components/myInput/MyInput.js` (+ `.Password`, `.TextArea`, `.Search`)
- `src/components/myTable/MyTable.js`
- `src/components/myModal/MyModal.js`
- `src/components/myEmpty/MyEmpty.js`
- `src/components/myPageHeader/MyPageHeader.js`
- `src/pages/dashboard/Dashboard.js` — first fully-wired authenticated page

## Modified files
- `src/App.js` — wrapped tree in antd `<App>` for theme-aware message/modal
- `src/routes/Route.js` — auth + authenticated route groups with guards/layouts
- `src/components/myLink/MyLink.js` — now accepts `to` (and keeps `path`)
- `src/pages/auth/Login.js` — finished: antd Form + auth store + redirect
- `package.json` — added `zustand`

## Try it
1. `npm install`
2. `npm start`
3. Visit `/login`. With the backend running, a successful login redirects
   to `/dashboard` through `RequireAuth` + `InsideLayout`.

Endpoints assumed (match these in the Node backend, or rename in the code):
`POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`,
`GET /api/workspace/mine`, `GET /api/customer/overview-snapshot`.

---

## Styling pass — match the original login design
- `layouts/outsideLayout/OutsideLayoutLeftRender.js` — replaced the flat
  diagonal gradient with the layered violet→purple→blue "mesh" gradient;
  logo moved to top-left; added the rotating tagline + carousel dots.
- `layouts/outsideLayout/OutsideLayout.js` — right panel is now white with
  a faint dotted grid + soft purple tint; form column constrained to 400px.
- `components/myCard/MyCardTransparent.js` — now merges caller `style`
  (previously dropped it, which is why the form stretched full-width).
- `pages/auth/Login.js` — added "Stay signed in for 90 days" + "Forgot
  password?" row, glowing "Sign in" button, "OR SIGN IN WITH" divider, and
  Google / Email buttons.
- `stores/authStore.js` — `login()` now forwards `rememberMe`.

---

## Refactor pass — components, theme tokens, responsiveness
- `config/antdTheme.js` — now the single source of color + sizing:
  `controlHeightLG: 46` (large buttons AND inputs), `colorLink`,
  `Button.primaryShadow` (the glow), `Form.itemMarginBottom: 0`, and
  custom `auth*` tokens for the gradient / panel texture.
- New wrappers: `MyForm`, `MyFormItem`, `MyDivider`, `MyCheckbox`,
  `MyInputItem` (input + Form.Item), `MyInputPasswordItem`.
- No inline colors anywhere — components read brand colors via
  `theme.useToken()` (this includes `InsideLayout`, `MyLink`, both
  auth layout panels).
- No inline heights — large controls get 46px from the theme.
- No `marginBottom` — spacing is `MyFlexVertical` gap; form items have
  zero margin via the Form token.
- Login fields/divider/checkbox/form all use the new `My*` components;
  rows use `wrap` so it reflows on small screens. Right-panel padding is
  responsive (20px mobile / 32px desktop); left panel hides on small
  screens (template's `isSmallScreen`).
