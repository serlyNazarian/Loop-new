# use-loop-new — One-Week Completion Plan

A day-by-day plan to port the remaining LOOP UI into this React (CRA + antd v6 + Zustand) app, running against the mock layer. Reuses the existing foundation (auth, dashboard home, calendar, layout, 32 `My*` wrappers, stores, i18n).

---

## Scope reality check

LOOP is a large omnichannel AI-SaaS. A faithful 1:1 port of **everything** in a week is not realistic. This plan targets **every remaining UI page against mocks**, and explicitly MVPs or defers the two highest-risk features:

- **Team Map** (drag-and-drop canvas / node routing editor) — MVP or defer.
- **Insights** (AI chat with live tool-calling) — MVP or defer.

The **Admin panel** is treated as a separate app and is out of scope.

---

## Current status

| Area | Status |
|---|---|
| Auth (login / register / verify / forgot-password / invite) | ✅ Done |
| Dashboard home (stat cards) | ✅ Done |
| Calendar (full) | ✅ Done |
| Workspace switcher, dark mode, i18n (EN/AR) | ✅ Done |
| Layout (sidebar + header), 32 `My*` wrappers, stores, mock layer | ✅ Done |
| Settings (profile / billing / notifications / integrations / usage / danger) | ❌ Missing |
| Team, Workspaces page | ❌ Missing |
| Contacts | ❌ Missing |
| Inbox / Conversations | ❌ Missing |
| AI Agents (list + wizard) | ❌ Missing |
| Broadcast | ❌ Missing |
| Reports | ❌ Missing |
| Channels (Telegram / Email / Widget) | ❌ Missing |
| Notifications page | ❌ Missing |
| Team Map | ⚠️ MVP / defer |
| Insights (AI chat) | ⚠️ MVP / defer |

---

## The week at a glance

| Day | Focus |
|---|---|
| **1** | Settings hub (6 sub-pages) + actions/mocks plumbing |
| **2** | Team, Workspaces, Contacts |
| **3** | Inbox / Conversations (part 1 — the centerpiece) |
| **4** | Inbox (part 2) + AI Agents (list + wizard) |
| **5** | Broadcast, Reports, Channels, Notifications page |
| **6** | i18n sweep on new pages + responsiveness / dark-mode / RTL QA + mock gaps |
| **7** | Buffer + MVP the risky two (Team Map, Insights) |

---

## Day 1 — Settings hub + plumbing

**Goal:** all six settings sub-pages navigable.

- [ ] Route group `pages/dashboard/settings/` (orchestrator + sub-pages, per the folder pattern).
- [ ] **Profile** — name, email, phone, locale (language picker), timezone, company, avatar.
- [ ] **Notifications** — email + browser + sound toggles.
- [ ] **Usage** — message & insights quota bars + channel breakdown.
- [ ] **Billing** — current plan, status, period end, upgrade / manage links.
- [ ] **Integrations** — developer API base URL + auth + tool list (CRUD + tester).
- [ ] **Danger** — reset stats / delete account with typed confirmation.
- [ ] Add `settingsActions` / `billingActions` + extend mocks.

**Reuse:** `MyForm`/`MyFormItem`, `MyCard`, `MySelect`, `MyPopconfirm`, the multi-state folder pattern from `pages/auth/register/`.

---

## Day 2 — Team, Workspaces, Contacts

**Goal:** member management + workspaces + contacts list/detail.

- [ ] **Team** — member list (name, email, role, online dot), invite form, role/permission editor, remove member.
- [ ] **Workspaces** — owned + member list, create dialog, switch (already wired in store).
- [ ] **Contacts** — searchable/sortable list (name, channel, message count, last activity, lifecycle stage) + detail drawer (notes, lifecycle stage, linked channels).
- [ ] Add `teamActions`, `contactsActions` + mocks.

**Reuse:** `MyTable`, `MyDrawer`, `MyTag` (lifecycle stages), the calendar's list+drawer+modal pattern.

---

## Day 3 — Inbox / Conversations (part 1)

**Goal:** the shell + conversation list + thread view. **This is the biggest single feature — budget 1.5 days.**

- [ ] Channel filter rail + lifecycle/stage filter.
- [ ] Conversation list (searchable, sortable, unread badges).
- [ ] Thread view: message bubbles (inbound/outbound/system) + scroll.
- [ ] Build **channel-agnostic** over a single mock conversation shape (do NOT model all five channels separately).

**Reuse:** `MyFlex` layout, `MyInput.TextArea`, `MyAvatar`, `MyBadge`.

---

## Day 4 — Inbox (part 2) + AI Agents

**Goal:** finish inbox interactions, then agents.

- [ ] **Inbox:** composer + send, AI on/off toggle, assign-to-teammate, internal notes, contact-details side panel.
- [ ] **AI Agents list** — cards (name, channels, enabled toggle, edit/delete).
- [ ] **Agent create/edit wizard** — name, system prompt, channel assignment, appointment-booking rules, handoff conditions. **No team-map.**
- [ ] Add `conversationsActions`, `agentActions` + mocks.

**Reuse:** the register wizard's multi-step pattern, `MyModal`, `MyCheckbox`.

---

## Day 5 — Broadcast, Reports, Channels, Notifications

**Goal:** the remaining medium pages.

- [ ] **Broadcast** — recipient filter (channel / lifecycle), composer with template variables, preview + confirm.
- [ ] **Reports** — stat cards + a trend chart (add a lightweight chart lib or use antd's) + top conversations + reply rate.
- [ ] **Channels** — status overview + setup pages: Telegram (token), Email (IMAP/SMTP), Widget (color/greeting/icon).
- [ ] **Notifications page** — full list (the sidebar already surfaces the data).
- [ ] Add `broadcastActions`, `reportsActions`, `channelsActions` + mocks.

**Reuse:** `MyCardStatistic`/`MyStatistic`, `MySelect`, `MyForm`.

---

## Day 6 — Cross-cutting: i18n + QA

**Goal:** consistency pass across everything built this week.

- [ ] **i18n:** wrap every new string in `t()` and add EN + AR keys (build new pages i18n-first so this is light).
- [ ] **Responsiveness:** phone / tablet / desktop pass on each new page (`useWindowSize`, `MyFlex` wrap, no fixed widths).
- [ ] **Dark mode + RTL (Arabic):** visual pass.
- [ ] **Mock completeness:** ensure no route 404s or empty crashes; every action has a handler.

---

## Day 7 — Buffer + the risky two

**Goal:** absorb overflow, then MVP the hard features if time allows.

- [ ] **Team Map (MVP):** static list of agents + a simple routing/handoff list instead of a full drag-and-drop canvas.
- [ ] **Insights (MVP):** chat UI over a canned mock "summary" response — no live tool-calling.
- [ ] Final polish, dead-code cleanup, `CLAUDE.md` notes for any new conventions.

> If the week runs tight, **defer Team Map and Insights entirely** — they are the most likely to blow the budget.

---

## Cross-cutting workstreams (run alongside daily work)

- **i18n-first:** every new page wraps strings in `t()` from the start (EN + AR).
- **Mock + actions:** each new page gets its `actions/<domain>Actions.js` + `mocks/` handlers so it runs with `REACT_APP_USE_MOCKS=true`.
- **Wrappers:** any new antd component goes through a new `My*` wrapper first.
- **Permissions:** gate nav/pages with `workspaceStore.can(...)` / `PermissionGuard`.

---

## Risk callouts

| Risk | Mitigation |
|---|---|
| Inbox is "very high complexity" in LOOP (5 channels, real-time) | Port a **single mocked channel shape**, no real-time |
| Team Map is a full canvas editor | MVP as static lists, or defer |
| Insights needs AI tool-calling | MVP as canned responses, or defer |
| Settings/billing depends on Stripe | UI-only against mocks; no real Stripe |
| Scope creep across 10+ pages | Hard-stop each page at "navigable + mock-backed + i18n"; polish in Day 6 |

---

## Definition of done (per page)

A page is "done" for this sprint when it is:

1. Routed under `RequireAuth` → `InsideLayout` and lazy-loaded.
2. Backed by `actions/` + `mocks/` (no live backend needed).
3. Rendered with `My*` wrappers, with explicit loading / error / empty states.
4. Fully `t()`-wrapped (EN + AR).
5. Responsive + works in dark mode and RTL.
