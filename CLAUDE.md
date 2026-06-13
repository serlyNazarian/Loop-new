# LOOP v2 — AI coding rules

Rules for any AI assistant writing code in this project. Follow them exactly. When a rule and a request conflict, follow the rule and say so.

## Stack
Create React App · React 19 · plain JavaScript (no TypeScript) · antd v6 · react-router-dom v6 · Zustand. Files are `.js`. One component per file, default export.

## Core rules

1. **Never use antd components directly — except `Layout` and `Menu`.** Everything else goes through a `My*` wrapper. If the wrapper doesn't exist yet, create it (see "Creating a wrapper") and use that. `Layout` (and its `Sider`/`Header`/`Content`) and `Menu` may be imported from antd directly.

2. **Never use plain HTML elements when an antd / `My*` equivalent exists.** Always reach for the wrapper first. Use a raw element only when nothing in antd covers it (a pure positioning container, a keyframes `<style>` block) and keep it structural — never put content, text, or colors in a raw element.

3. **Write minimal styling, and match Loop's look.** Lean on theme tokens and component defaults. Don't write bespoke CSS or restyle antd unless asked. The look is: primary `rgb(91,0,253)`, Garet font, radius 8 (12 for cards), large controls 46px — all already in the theme.

4. **No code comments.** Write self-explanatory code with clear names. Do not add `//` or `/* */` comments.

5. **No monolithic files.** Keep each file small and focused on one job. When a page or component grows large or does several things, break it into focused pieces: extract sub-sections/step components, pull static data (option lists, enums) into their own file, and move reusable logic into `utils/` or an `actions/` module. A component file should read top-to-bottom in one screen or two — if you're scrolling to understand it, split it. See the **Page pattern** below for the multi-step/multi-state split rule, and `pages/auth/register/` as a reference decomposition (orchestrator + section/step components + co-located constants + shared `utils/password.js`).

6. **Group a feature's sub-components in a sub-folder.** When a decomposition produces several files that belong to one piece of a screen (a sidebar, a wizard, a settings panel), put them in a sub-folder named after that feature and keep the orchestrator + shared constants in the parent. Example: `layouts/insideLayout/` holds `InsideLayout.js` (orchestrator), `Header.js`, and `insideLayoutConstants.js`, while every `Sidebar*` file + `sidebar.css` lives in `layouts/insideLayout/sidebar/`. After moving files, fix the relative-import depth (a file one level deeper reaches shared folders via `../../../components/...` instead of `../../components/...`) and point any parent-folder imports at `../`.

7. **CSS class names use snake_case.** Name custom classes `class_name`, not `class-name` — e.g. `sidebar_scroll`, `nav_sheen`. (Keep bespoke CSS to the permitted cases from rule 2 and rule 8.)

8. **When inline styling piles up, move it to a co-located CSS class.** A few inline `style` props are fine, but once an element's `style={{ ... }}` block grows large or repetitive — lots of static structural/decorative CSS — extract it into a co-located `Component.css` file with a snake_case class and use `className`. Split by what's static vs dynamic: **keep inline** the values computed from props/state (`width: size`, `transform: ...`) and the theme-token values (`background: token.*`); **move to the class** the static structural and decorative CSS (positioning, masks, filters, transitions, and literal colors/gradients/shadows — which also gets those out of JSX where inline colors aren't allowed). The goal is JSX that reads as structure, not a wall of styles. Reference: `pages/home/HomeAiOrb.js` + `pages/home/Home.css`.
   - **Reach for the global utility classes first.** `src/styles/utilities.css` is a project-wide utility library (snake_case) — `d_flex`, `inline_flex`, `flex_1`, `flex_center`, `flex_shrink_0`, `min_w_0`, `pointer`, `relative`/`absolute`/`fixed`, `overflow_hidden`, `justify_center`/`justify_start`, `w_100`, `text_center`, … Use a `className` from there for common static props instead of inlining them (or adding new CSS). Add a small **feature class** in a co-located CSS file only for a repeated component-specific pattern — e.g. `sidebar_row` / `sidebar_row_collapsed` in `layouts/insideLayout/sidebar/sidebar.css`, used by every sidebar row. Reference: the `Sidebar*` row components (`className="sidebar_row d_flex flex_shrink_0 ..."` + only token/dynamic values inline).

## Colors and sizing

- **No inline colors anywhere.** Every color comes from the antd theme. Read brand colors with `theme.useToken()` and apply `token.colorPrimary`, `token.colorText`, the custom `token.auth*` values, etc. Add new brand colors to `src/config/antdTheme.js` (token or custom token) — never hardcode a hex / rgb in a component or page.
- **Theme tokens are CSS variables — use them in `.css` files.** `buildTheme` sets `cssVar: true`, so every token (standard and custom) is emitted as a CSS custom property: camelCase → kebab, `--ant-` prefix (`colorPrimary` → `var(--ant-color-primary)`, `sidebarGlass` → `var(--ant-sidebar-glass)`, `borderRadiusL` → `var(--ant-border-radius-l)`). In co-located CSS, reference `var(--ant-*)` instead of threading `token.*` through JSX — the variable still originates from the theme, satisfies "no inline colors", and **flips automatically on dark mode** (no `dark ? a : b` conditional). For a value that differs light/dark, define it once per mode in `buildTheme` (`LIGHT_SURFACES` / `DARK_SURFACES`) so the single var flips; don't keep `*Dark` token pairs. Two gotchas, both observed on `Layout.Sider`: (1) antd registers its **standard** color tokens so they resolve via `var()` for `background` etc. but a few longhands (`border-inline-end-color`, `box-shadow`) are **locked** on the Sider and can't be overridden even with `!important` — draw such edges with an `::after` pseudo + `background: var(--ant-color-border-secondary)` and `inset-inline-end: 0` (auto-RTL) instead of a border; (2) the `--ant-*` vars are scoped to the `ConfigProvider` subtree (not `:root`), which is fine for app CSS. Reference: `layouts/insideLayout/sidebar/sidebar.css` (`aside.sidebar_sider` + `::after`) and `layouts/insideLayout/header.css` (`header.header_bar`).
- **No inline control heights.** Size via the theme: default controls are 40px (`controlHeight`), `size="large"` → 46px (`controlHeightLG`). Adjust heights in `antdTheme.js`, not in JSX.
- **No inline border radius.** Corners come from the theme scale just like colors: `token.borderRadiusS` (6), `token.borderRadius` (8), `token.borderRadiusM` (10), `token.borderRadiusL` (12), `token.borderRadiusXL` (16), `token.borderRadiusXXL` (20), `token.borderRadiusPill` (999, fully-rounded). Add new radii to `antdTheme.js` — never hardcode a pixel radius in JSX. (A full circle may use `borderRadius: '50%'` inline — that's a shape, not a corner radius.)
- **No inline font size in raw `style`.** When you set `fontSize` inside a `style={{ ... }}` object, use the theme scale: `token.fontSizeXS` (11), `token.fontSizeSM` (12), `token.fontSizeMD` (13), `token.fontSize` (14), `token.fontSizeLG` (16), `token.fontSizeXL` (20), `token.fontSizeXXL` (24), `token.fontSizeXXXL` (28). The `fontSize={N}` prop on `MyText`/`MyTextSecondary`/etc. may stay a number, but prefer a scale value. Add new sizes to `antdTheme.js`.
- **No `margin` / `marginBottom` for spacing.** Lay things out with `MyFlex` / `MyFlexVertical` and a `gap`. Form fields already have zero item margin (`Form.itemMarginBottom`), so a single `MyFlexVertical gap={...}` controls the whole form's rhythm.
- **Don't inline divider spacing.** Use the right divider wrapper — `MyDividerSmall` for a tight 4px gap — instead of `<MyDivider style={{ margin: ... }} />`. Add a new `MyDivider*` variant if you need a different gap.

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
- **Dates:** never import `dayjs` directly in a component/page/action — go through `UtilDate` (`src/utils/UtilDate.js`): `UtilDate.now()`, `UtilDate.formatDate/formatTime`, `UtilDate.toDayjs`, `UtilDate.nextMonth`, etc. Only `UtilDate` and `src/config/dayjs.js` (the locale/`weekStart` setup) import `dayjs`. Add new date helpers as methods on `UtilDate`, not inline `dayjs()` calls.
- **Utils:** shared helpers live in `src/utils/` as a default-exported object named `Util<Domain>` (`UtilDate`, `UtilArray`, `UtilString`, `UtilGeneral`); call as `UtilX.method(...)`. Feature-specific util objects co-locate with the feature (e.g. `pages/dashboard/calendar/UtilCalendar.js`).

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

**Multi-step / multi-state pages — decompose into a folder.** When a page has more than one screen state (wizard steps, a `done`/success screen, an empty / error / `no-data` state, etc.), put it in a folder `src/pages/<area>/<page>/`. The orchestrator `<Page>.js` owns the state, effects, and action calls, and only decides which state/section to render. Each distinct screen-state branch — every early-return like `if (!email) return <VerifyNoEmail/>` — is its own presentational component that contains its own card + markup. Extract reusable sections the same way (e.g. the page header as `<Page>HeaderSection`).

**Props vs self-contained, and when to stop.** Pass orchestrator-owned data/handlers down as props, but when a state's behaviour is fully self-contained (e.g. a single `navigate('/login')`), let that component use the hook directly instead of threading a callback prop — keep prop interfaces narrow. Only keep a piece inline in the orchestrator when extracting it would create a wide prop list (many values threaded just to render) with no clean boundary; the goal is small, focused files without prop-threading churn. Reference: `pages/auth/register/` (orchestrator + header/steps sections + step components + constants), `pages/auth/forgotPassword/` (3 states), `pages/auth/verify/` (orchestrator + `VerifyHeaderSection` + self-contained `VerifyNoEmail`, primary state inline).

## Responsiveness

Every screen must work on phone, tablet, and desktop. Use `useWindowSize` for breakpoint logic, let `MyFlex` `wrap` reflow rows, and avoid fixed pixel widths on containers (cap with `maxWidth`, fill with `width: '100%'`).
