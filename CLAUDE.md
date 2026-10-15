# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Next.js dev server (Turbopack) on http://localhost:3000
npm run build   # production build (also type-checks)
npm run lint    # eslint . (ESLint 10 flat config, eslint-config-next)
```

There is no test suite.

## Environment

The API routes need a MySQL database. Connection settings come from `.env*` files (gitignored): `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`. Tables used: `book` (catalog; has `cover_url`) and `user_book` (`user_id`, `book_id`, `is_read`, `rating`, `comment`). Cover images are loaded from `titangames.shop` (allowed via `images.remotePatterns` in `next.config.ts`).

## Architecture

Next.js 16 App Router + React 19, TypeScript on the frontend, plain JavaScript in the API routes. Tailwind CSS 4 for styling (CSS-first config: theme lives in `globals.css` via `@theme`; no `tailwind.config.ts`). TypeScript 7 is installed as `@typescript/native` (provides `tsc`), while the `typescript` package is aliased to `@typescript/typescript6` because typescript-eslint does not support the TS 7 API yet. The `@/*` path alias maps to the repo root.

**Backend (`app/api/`)**
- `GET /api/userBooks` returns every row of `book` merged with the user's `user_book` row, mapped to the frontend `UserBook` shape (`cover_url` → `coverUrl`, `is_read` → `read`, defaults for unread books).
- `PUT /api/userBooks/[bookId]` upserts a `user_book` row: validates the body (`read`, `comment`, `rating`), then updates or inserts. Logic lives in `app/api/libs/bookService.js`; `errorHandler.js` maps known error messages and MySQL error codes to HTTP status.
- There is no auth yet: `user_id` is hard-coded to `1` throughout (`app/auth/page.tsx` is a placeholder).
- API error/validation messages are in Spanish; UI text is in English.

**Data layer (`services/`)**
- TanStack Query with a single shared `queryClient` (`services/queryClient.ts`), imported directly by mutations rather than via `useQueryClient`.
- All book data lives under the query key `['userBooks']`. `services/userBooks/` is split into `services.ts` (fetch calls), `queries.ts`, and `mutations.ts`. `useUpdateReadStatus` does an optimistic update with rollback; `useUpdateUserBook` does not. Both invalidate `['userBooks']` and show `react-hot-toast` notifications.

**Filtering (`store/useFiltersStore.tsx`)**
- A React Context (not Zustand, despite the folder name) holding filters (search, detective, status, sort) and a derived `filteredBooks` array. Filtering/sorting is done by `filterAndSortBooks` in `helpers/utils.ts`; sort values are encoded as `"<field>-<asc|desc>"`.
- `filteredBooks` is recomputed in two places: the provider's effect (when filters change, reading from the query cache) and `BookList`'s effect (when query data changes). Keep both paths in mind when touching filtering.
- Provider order is set in `helpers/providers.tsx`: `QueryClientProvider` → `FiltersProvider`.

**Book detail modal (intercepting routes)**
- `BookCard` links to `/book/[id]`. When navigated client-side, `app/@modal/(.)book/[id]/page.tsx` intercepts it and renders `BookDetail` inside `Modal`, reading the book from the `['userBooks']` cache. The `@modal` parallel slot is rendered in `app/layout.tsx`; `Modal` portals into `#modal-root` and closes via `router.back()`.
- A hard load of `/book/[id]` hits `app/book/[id]/page.tsx`, which just redirects to `/`.

**Shared types and constants**: `interfaces/index.ts` (`Book`, `UserBook`, option union types) and `helpers/constants.ts` (select options, badge color classes keyed by detective/status).
