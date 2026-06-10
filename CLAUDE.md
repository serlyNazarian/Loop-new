# LOOP v2 — AI coding rules

Rules for any AI assistant writing code in this project. Follow them exactly. When a rule and a request conflict, follow the rule and say so.

## Stack
Create React App · React 19 · plain JavaScript (no TypeScript) · antd v6 · react-router-dom v6 · Zustand. Files are `.js`. One component per file, default export.

## Core rules

1. **Never use antd components directly — except `Layout` and `Menu`.** Everything else goes through a `My*` wrapper. If the wrapper doesn't exist yet, create it (see "Creating a wrapper") and use that. `Layout` (and its `Sider`/`Header`/`Content`) and `Menu` may be imported from antd directly.

2. **Never use plain HTML elements when an antd / `My*` equivalent exists.** Always reach for the wrapper first. Use a raw element only when nothing in antd covers it (a pure positioning container, a keyframes `<style>` block) and keep it structural — never put content, text, or colors in a raw element.

3. **Write minimal styling, and match Loop's look.** Lean on theme tokens and component defaults. Don't write bespoke CSS or restyle antd unless asked. The look is: primary `rgb(91,0,253)`, Garet font, radius 8 (12 for cards), large controls 46px — all already in the theme.

4. **No code comments.** Write self-explanatory code with clear names. Do not add `//` or `/* */` comments.

## Colors and sizing

- **No inline colors anywhere.** Every color comes from the antd theme. Read brand colors with `theme.useToken()` and apply `token.colorPrimary`, `token.colorText`, the custom `token.auth*` values, etc. Add new brand colors to `src/config/antdTheme.js` (token or custom token) — never hardcode a hex / rgb in a component or page.
- **No inline control heights.** Size via the theme: use `size="large"` (→ 46px from `controlHeightLG`). Adjust heights in `antdTheme.js`, not in JSX.
- **No `margin` / `marginBottom` for spacing.** Lay things out with `MyFlex` / `MyFlexVertical` and a `gap`. Form fields already have zero item margin (`Form.itemMarginBottom`), so a single `MyFlexVertical gap={...}` controls the whole form's rhythm.

## Element → use this instead

| Don't write | Use |
|---|---|
| `<div>` for layout | `MyFlex`, `MyFlexVertical`, `MyFlexCenter` (or antd `Layout`) |
| `<span>` / `<p>` / text | `MyText`, `MyTextSecondary`, `MyTextTitle` |
| `<a>` | `MyLink` (internal) · `MyLinkA` (external) |
| `<img>` | `MyImage` |
| `<button>` / antd `Button` | `MyButton` |
| `<input>` / antd `Input` | `MyInput` (· `MyInput.Password`) |
| input inside a form | `MyInputItem` · `MyInputPasswordItem` |
| antd `Form` / `Form.Item` | `MyForm` / `MyFormItem` |
| antd `Checkbox` | `MyCheckbox` |
| antd `Divider` | `MyDivider` |
| antd `Table` | `MyTable` |
| antd `Modal` | `MyModal` |
| antd `Card` | `MyCard` · `MyCardTransparent` |
| empty state | `MyEmpty` |
| page title block | `MyPageHeader` |

If you need an antd component with no wrapper yet (`Select`, `Drawer`, `Tag`, `Avatar`, `Tabs`, `Tooltip`, ...), create the `My*` wrapper, then use it.

## Creating a wrapper

Put it in `src/components/my<thing>/My<Thing>.js`. Keep it thin: spread `...otherProps`, give sensible defaults, expose compound members, and pull any color from `theme.useToken()`.

```jsx
import { Select } from 'antd';

const MySelect = ({ size = 'large', ...otherProps }) => {
  return <Select size={size} {...otherProps} />;
};

export default MySelect;
```

## Data, state, routing

- **Network:** define API calls in `src/actions/<domain>Actions.js` (which call `apiClient`); components/stores import and call those actions — never call `apiClient`/`fetch` directly from a component, page, or store. `src/utils/apiClient.js` (`api.get/post/patch/put/del`) is the transport the actions use, and the only place `fetch` is called.
- **State:** Zustand stores in `src/stores/`. Use `authStore` for the user/session and `workspaceStore` for the active workspace + `can(feature)` permission checks.
- **Routing:** add routes in `src/routes/Route.js`. Authenticated routes go under `RequireAuth` → `InsideLayout`; public/auth routes under `OutsideLayout`. Lazy-load page components and let the layout's `Suspense` handle fallback.
- **Permissions:** gate features with `PermissionGuard` (or `workspaceStore.can(...)`), not ad-hoc checks.

## Structure

```
src/
  pages/<area>/<Page>.js        screens
  layouts/<name>Layout/         OutsideLayout, InsideLayout, BlankLayout
  components/my<thing>/My*.js    wrappers
  stores/                        Zustand
  actions/<domain>Actions.js     API calls (wrap apiClient)
  routes/                        Route.js, RequireAuth, PermissionGuard
  hooks/  utils/  config/  styles/  assets/
```

## Page pattern

`'use client'` does not exist here — never add it. Fetch in an effect via an action (see **Network** above), hold in local state or a store, render with `My*` components, and handle loading / error / empty states explicitly (`Spin`, `MyEmpty`). Compose layout with `MyFlex` gaps. Match `src/pages/dashboard/Dashboard.js` as the reference.

**Multi-step / multi-state pages — split only when it earns its keep.** Split a page into a folder `src/pages/<area>/<page>/` when it has **3+ screen states** (wizard steps, `done`/success, empty/error, etc.) **or any single step is large**. A page with **1–2 simple states stays inline** as one file (`src/pages/<area>/<Page>.js`) — splitting it just adds prop-threading and file-hopping for no gain. When you do split: the orchestrator `<Page>.js` owns all state + handlers and only decides which sub-component to render; each step/state is its own presentational component that contains its own card/markup and receives state + handlers via props (logic stays in the orchestrator). Reference: `pages/auth/forgotPassword/` (split, 3 states) vs `pages/auth/Verify.js` (inline, 2 states).

## Responsiveness

Every screen must work on phone, tablet, and desktop. Use `useWindowSize` for breakpoint logic, let `MyFlex` `wrap` reflow rows, and avoid fixed pixel widths on containers (cap with `maxWidth`, fill with `width: '100%'`).
