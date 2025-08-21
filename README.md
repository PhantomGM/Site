# D.N.A. Social Platform — Stage One MVP

This repository contains a minimal scaffold of the **Domain of Notorious Adventurers** social platform.
It follows the Stage One brief with a Next.js 14 + Prisma stack.  Due to environment limits the UI and
server logic are placeholders but demonstrate the architecture and data model.

## Features
- Next.js App Router structure with routes for Tavern feed, Profiles, Guilds, Notifications, Search and Settings.
- REST API endpoints for auth, posts, profiles, relationships, guilds, notifications and search.
- Prisma schema implementing the Stage One data model and a small seed script.
- Flavor Dial i18n utility with starter `strings.json`.
- Basic ACL helper with unit tests run using Node's built in test runner.

## Getting Started

```bash
npm install
npm run dev
```

### Docker
A `docker-compose.yml` is provided running `web` and `db` services.  Adjust env vars in `.env.example`.

### Database
Run migrations and seed:

```bash
npx prisma migrate dev
npx ts-node prisma/seed.ts
```

## Testing

Unit tests can be executed with:

```bash
node --test tests/acl.test.js
node --test tests/relationships.test.js
```

## Known Limitations
- Dependencies are not installed in this environment; install them to run the app.
- Many features (UI, authentication flow, notifications, guild moderation, etc.) are simplified placeholders.
- Playwright E2E tests are not included.

## Next Steps
- Flesh out UI using shadcn/ui and Tailwind.
- Implement real authentication with NextAuth email magic links.
- Add Playwright smoke tests and WebSocket notifications.
- Complete Session 0 onboarding flow and Lines & Veils editor.
