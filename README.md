# Rogue Code — website & academy

Next.js app for [roguecode.in](https://roguecode.in): the Rogue Code studio site, Rogue Academy, shop, blog, events and Jamboard.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/
    (studio)/        studio site: home, shop, blog, events
    academy/         academy site: courses, academy shop
    jamboard/        whiteboard
    login/           student login
  components/        UI, grouped by area (home, academy, shop, community, jamboard, layout, ui)
  data/              seed content (courses, products, events, posts, site details)
  lib/
    data/            data access — swap seed data for Firestore here
    actions/         server actions (forms, orders)
    cart.ts          shared cart (localStorage)
docs/AUDIT.md        audit of the previous site and the rebuild plan
```

Values in `[brackets]` in `src/data` are placeholders still to be filled in.
