# 🧬 D.N.A. Social Platform — Coding Agent Brief (Stage One)

**Purpose:** Build a testable MVP of a fantasy‑flavored social network for TTRPG players. The MVP focuses on Social features only, with forward‑compatible hooks for Worldbuilding (Digital Narrative Alchemist) and Gameplay (Digital Narrative Adventures).

---

## 0) Core Identity & Narrative Frame

- **Ecosystem Name:** **D.N.A.**
  - **Social:** **Domain of Notorious Adventurers** (this MVP)
  - **Worldbuilding (future):** Digital Narrative Alchemist → *The Alchemist’s Lab*
  - **Gameplay (future):** Digital Narrative Adventures → *The Dice Tower*
- **Master Tagline:** *Adventure is in your D.N.A.*
- **Social Tagline (primary):** *The tavern never closes — Adventure is in your D.N.A.*
- **Campaign/Worldbuilding Tagline (future):** *From sparks of lore and seeds of code, new worlds brew — Adventure is in your D.N.A.*
- **Gameplay Tagline (future):** *Every roll rewrites the genes of fate — Adventure is in your D.N.A.*

### Narrative Surfaces (dual‑label UX)
- **Tavern’s Quest Board** *(User Feed)*
- **Guilds** *(Groups)* → **Guild Hall** *(Group Feed)*
- **DM Screen** *(Settings)*
- **Sage’s Library** *(Help/Docs)*
- **Quest Log** *(Notifications)*
- **Map** *(Search/Explore)*

> **Flavor Dial:** Users can choose **Off / Subtle / Bold** labels. Keep conventional names available in tooltips/accessibility text. Legal, payments, and safety flows stay unflavored.

---

## 1) Information Architecture & Site Map (Stage One)

- **Auth & Onboarding**
  - Sign Up / Sign In / Password Reset
  - **Session 0** onboarding flow (see §2)
- **Tavern (Personal Layer)**
  - **Tavern’s Quest Board** (personalized feed)
  - Post Composer
- **Profiles**
  - Public Profile Page
  - Edit My Profile
  - **Safety Preferences: Lines & Veils (private, optional)**
- **Friends & Follows**
  - People Finder / Requests
- **Guilds (Group Layer)**
  - Guild Discovery (search/browse/create)
  - **Guild Hall** (group feed)
  - Guild Admin (settings, membership, moderation)
- **Notifications (Quest Log)**
- **Search (Map)** — people, posts, guilds
- **Settings (DM Screen)** — account, privacy, notifications, safety
- **System Pages** — About, Terms, Privacy, Report, Help (Sage’s Library)

---

## 2) Onboarding = “Session 0” (with Flavor Dial)

**CTA examples:**
- Off: *Sign up*
- Subtle: *Start Session 0 (Sign up)*
- Bold: *Begin Session 0*

**Steps:**
1. **Choose Your Banner** *(Profile basics)* — avatar, banner, handle.
2. **Party Role & Playstyle** *(Interests)* — GM/Player/Both, systems/editions, play cadence.
3. **Table Safety** *(Lines & Veils, optional)* — private storage; defaults for anonymized GM share (see §5.3).
4. **Tavern Table** *(People/Guild suggestions)* — follow users, join public guilds.
5. **First Toast** *(Welcome post)* — optional intro post template.

Microcopy: “This Session 0 sets your comfort, cadence, and calling card. You can change it later.”

---

## 3) Tavern — User Feed

**What appears:**
- Posts from **Friends**
- Posts from **Followed** users
- Posts from **Guild Halls** the user belongs to

**Key rules:**
- Guild posts in the Tavern are clearly **badged**: *Posted in Guild: <name>* (click opens the Guild Hall thread).
- Guild privacy respected:
  - Public guild posts → visible to members in Tavern; public visibility honored when viewing in‑guild.
  - Private guild posts → visible **only** to members; still surface to their Tavern feed with badge.

**Interactions:** Like, Comment, Share, Tag, (optional) lightweight markdown/inline dice.

**Composer:** text, images, links (cards), visibility (Public / Friends-only; Guild posts inherit guild context).

**Sorting:** Newest; optional “Most Active”. Infinite scroll with keyset pagination.

---

## 4) Profiles

**Public Profile:** avatar, banner, handle, bio, favorite systems, roles. Tabs: Posts | Friends | Followers | Guilds. Actions: Add Friend, Follow.

**Edit Profile:** identity fields; privacy toggles (profile visibility; default post visibility); interests.

### 4.1 Safety Preferences: Lines & Veils (Private, Optional)
- **Lists:** `Lines` (hard no), `Veils` (fade to black). Optional third: `Ask‑First`.
- **Presets + Custom entries**; versioned with `last_updated_at`.
- **Privacy defaults:**
  - `share_anonymized_with_gm = true` (can be toggled)
  - `include_custom_in_share = true` (can be toggled)
- **Anonymized GM overview** delivered only when joining a game (future module; §5.3 details for forward compatibility).

---

## 5) Guilds — Groups with Privacy & Roles

### 5.1 Discovery & Creation
- Browse/search by tags (system, edition, theme, role) + recommendations.
- Create Guild: name, description, tags, avatar, banner, **privacy** (Public / Private).
- Roles: **Guildmaster** (owner), **Officers**, **Members**.

### 5.2 Guild Hall — Group Feed
- Shows only that guild’s posts. Tabs: Feed | Members | Pinned (rules/announcements) | About.
- Composer; polls; pinned posts; moderation.
- **Echo to Tavern:** Members see Guild posts in their Tavern feed with a badge; clicking opens canonical thread in Guild Hall.

### 5.3 Forward‑Compatible: GM Safety Overview (Anonymized)
*(hook for future Gameplay integration)*
- When seating a table, GM receives **union** of Lines/Veils across **seated users who consented**; **no identifiers, no per‑player counts**.
- Frequency heatmap only if roster ≥ 4; else suppressed. Regenerate on roster changes. Per‑game opt‑out respected.

---

## 6) Friends & Follows
- Follow = one‑way; Friend = mutual.
- People Finder with filters (systems, interests, locality/timezone optional).
- Requests flow with notifications.

---

## 7) Notifications (Quest Log)
- Events: requests, accepts, mentions, likes, comments, new followers, guild invites/approvals, pinned announcements.
- Controls: per‑category toggles; real‑time vs digest (email later).

---

## 8) Search (Map)
- Global search over People, Posts, Guilds.
- Filters: tags, recency, guild privacy (private guilds appear only if member or invited).
- Typeahead suggestions.

---

## 9) Settings (DM Screen)
- **Account:** email, password, (2FA later), sessions/devices (later).
- **Privacy:** profile visibility; default post visibility; who can friend/follow; guild discovery prefs.
- **Notifications:** category toggles; digest cadence.
- **Safety & Blocking:** report, block, mute; moderation appeals (MVP‑light).
- **Appearance:** **Flavor Dial** (Off/Subtle/Bold).

---

## 10) Non‑Functional & Platform‑Wide
- **Performance:** keyset pagination; CDN for media; background link‑preview fetch.
- **Security:** CSRF/XSS/SSRF protections; rate limiting; basic WAF; audit logs for guild admin actions.
- **Safety & Moderation:** report flows; keyword/NSFW flags; admin triage panel.
- **Accessibility:** semantic HTML; keyboard nav; alt text; WCAG AA contrast.
- **i18n:** externalized copy; per‑user flavor tier.

---

## 11) Minimal Data Model (MVP)

```text
User(id PK, handle UNIQUE, display_name, bio, avatar_url, banner_url,
     interests JSONB, role_flags JSONB, privacy_flags JSONB,
     flavor_tier ENUM('off','subtle','bold'), created_at)

Relationship(id PK, follower_id FK User, followee_id FK User,
             type ENUM('FOLLOW','FRIEND','REQUEST'), status ENUM('PENDING','ACCEPTED','REJECTED'), created_at)

Guild(id PK, slug UNIQUE, name, description, tags JSONB,
     privacy ENUM('PUBLIC','PRIVATE'), owner_id FK User,
     avatar_url, banner_url, created_at)

GuildMembership(id PK, guild_id FK Guild, user_id FK User,
                role ENUM('OWNER','OFFICER','MEMBER'),
                status ENUM('PENDING','APPROVED','BANNED'), joined_at)

Post(id PK, author_id FK User, scope ENUM('PROFILE','GUILD'), guild_id NULLABLE FK Guild,
     visibility ENUM('PUBLIC','FRIENDS'), body TEXT, media JSONB,
     created_at, updated_at)

Reaction(id PK, post_id FK Post, user_id FK User, type ENUM('LIKE'), created_at)
Comment(id PK, post_id FK Post, author_id FK User, body TEXT, created_at)

Notification(id PK, user_id FK User, type TEXT, actor_id FK User NULL,
             target_ref TEXT, read BOOLEAN, created_at)

Report(id PK, reporter_id FK User, target_ref TEXT, reason TEXT,
       status ENUM('OPEN','CLOSED'), created_at)

UserSafetyPreferences(user_id PK FK User,
  lines JSONB, veils JSONB, ask_first JSONB,
  include_custom_in_share BOOLEAN DEFAULT TRUE,
  share_anonymized_with_gm BOOLEAN DEFAULT TRUE,
  last_updated_at TIMESTAMP)
```

**Feed Aggregation (Tavern):**
- Query `Posts` where `author ∈ (friends ∪ followed)` OR `(scope='GUILD' AND guild_id ∈ user.guilds AND ACL permits)`.
- Label guild posts with source badge and link to Guild Hall thread.
- Keyset paginate by `(created_at, id)`; avoid `OFFSET`.

---

## 12) API Surface (suggested REST/GraphQL outline)

**REST examples:**
- `POST /auth/signup` `POST /auth/login` `POST /auth/password/reset`
- `GET /feed` (merged)
- `POST /posts` `GET /posts/:id` `POST /posts/:id/react` `POST /posts/:id/comment`
- `GET /profiles/:handle` `PATCH /profiles/me`
- `GET /profiles/me/safety` `PATCH /profiles/me/safety`
- `POST /relationships/follow` `POST /relationships/friend-request`
- `GET /guilds` (search) `POST /guilds` `GET /guilds/:slug` `PATCH /guilds/:slug`
- `POST /guilds/:slug/join` `POST /guilds/:slug/approve` `POST /guilds/:slug/ban`
- `GET /notifications` `PATCH /notifications/read`
- `GET /search?q=` (people, posts, guilds)

> GraphQL is equally viable; provide feed resolver with ACL‑aware union.

---

## 13) Copy & String Catalog (Flavor Dial‑ready)

Provide i18n keys with three variants. Example:

```json
{
  "signup_cta": {"off": "Sign up", "subtle": "Start Session 0 (Sign up)", "bold": "Begin Session 0"},
  "login_cta":  {"off": "Log in",  "subtle": "Resume Campaign (Log in)",  "bold": "Resume Campaign"},
  "feed_title": {"off": "Feed", "subtle": "Tavern’s Quest Board (Feed)", "bold": "Tavern’s Quest Board"},
  "groups_title": {"off": "Groups", "subtle": "Guilds (Groups)", "bold": "Guilds"},
  "group_feed": {"off": "Group Feed", "subtle": "Guild Hall (Group Feed)", "bold": "Guild Hall"},
  "settings": {"off": "Settings", "subtle": "DM Screen (Settings)", "bold": "DM Screen"},
  "help": {"off": "Help", "subtle": "Sage’s Library (Help)", "bold": "Sage’s Library"},
  "create_guild": {"off": "Create Group", "subtle": "Draft a Guild Charter (Create Group)", "bold": "Draft a Guild Charter"},
  "post_cta": {"off": "Create Post", "subtle": "Raise a Toast (Create Post)", "bold": "Raise a Toast"},
  "report": {"off": "Report", "subtle": "Call the Town Guard (Report)", "bold": "Call the Town Guard"},
  "loading": {"off": "Loading…", "subtle": "Rolling for initiative…", "bold": "Rolling for initiative…"}
}
```

---

## 14) Acceptance Criteria (Stage One)

- **Tavern feed** merges Friends, Followed, and Joined‑Guild posts with source badges; respects ACL and privacy.
- **Guilds** can be **Public** or **Private**; users can create/join many; Guild Hall has its own feed, roles, and moderation.
- **Profiles** render public info; private **Lines & Veils** editor exists with consent defaults; never exposed publicly.
- **Friends/Followers** both function; requests and follows generate notifications.
- **Notifications** list core social and guild events with per‑category toggles.
- **Search** finds People, Posts (public/authorized), and Guilds (public and private‑if‑member).
- **Flavor Dial** toggles label variants without breaking navigation or accessibility.
- **Accessibility** meets WCAG AA for primary flows.

---

## 15) Open Questions / Options

- Inline dice syntax support in posts now vs later?
- Hashtags vs tag chips for systems/themes?
- Email delivery provider for digests/verification?
- Use WebSockets vs long‑polling for live notifications?

---

## 16) Assets & Inputs Needed (if available)
- Branding (logos, color tokens, typography choices)
- Icon set (d20, quill, map, banner, torch, shield, raven)
- Copy deck for Session 0 & empty states (can start from §2 and §13)
- Moderation policy guidelines & report taxonomy
- Env credentials for media storage/CDN and link preview service

---

## 17) Test Plan (MVP)
- **Unit:** ACL checks for feed and guild privacy; pagination cursors.
- **Integration:** Feed aggregator joins (friends/follows/guilds); notifications fan‑out.
- **E2E:** New user Session 0 → follow/join guild → see guild posts in Tavern → post in Guild Hall → appears in Tavern with badge.
- **Accessibility:** keyboard traverse primary flows; screen‑reader labels for dual names.

---

## 18) Future Phases (Not in MVP)
- **Digital Narrative Alchemist** (Worldbuilding): *The Alchemist’s Lab*
- **Digital Narrative Adventures** (Gameplay): *The Dice Tower* + GM Safety Overview consumption.
- Events/scheduling (“Mustering”), file/resource libraries, map uploads, live play rooms.

---

**This document is the build brief for the coding agent.** When approved, we’ll transform it into a structured prompt + task breakdown for implementation and wire in any existing assets/files you provide.

