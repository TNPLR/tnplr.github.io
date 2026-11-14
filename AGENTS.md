# Repository Guidelines

## Architecture Context for Codex

When a task requires understanding architecture, routes, data flow, or deployment, read [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md) first, then verify the relevant source files. Treat code as authoritative; distinguish configured behavior from verified runtime results. Update that document when an authorized change alters architecture. Do not fix documented risks or refactor unrelated code without task authorization.

## Project Structure & Module Organization

This Taiwan-focused bridge bidding tutorial uses Nuxt 4, Vue 3, and TypeScript with client-side rendering (`ssr: false`). Keep teaching content in Traditional Chinese.

- `pages/`: file-based routes for articles, `/story` practice, and `/questgen` question authoring. For example, `pages/relay/interference.vue` maps to `/relay/interference`.
- `layouts/`: shared article navigation in `default.vue`; minimal tool layout in `custom.vue`.
- `components/`: reusable bidding controls, auction displays, signal notation, and article sections.
- `modules/`: formatting helpers, table-of-contents generation, and `quest.json`; these are application utilities, not registered Nuxt modules.
- `type/type.ts`: shared auction, question, and navigation types.
- `assets/css/main.css`: global, responsive, and print styles. `public/` holds files served from the site root.
- `server/`: TypeScript configuration only; no implemented API. No test directory currently exists.

## Build, Test, and Development Commands

- `npm ci`: install locked dependencies; runs `nuxt prepare` through `postinstall`.
- `npm run dev`: start the local development server.
- `npm run build`: build the production application.
- `npm run generate`: generate static output for hosting.
- `npm run preview`: preview production output.

The deployment workflow uses Node 24 from `.nvmrc`, runs generation, and publishes `./.output/public`. Verify output paths when changing Nuxt configuration. Never commit `.nuxt/`, `.output/`, or `dist/`.

## Coding Style & Naming Conventions

Follow the surrounding file’s indentation; no formatter or linter is configured. Prefer `<script setup lang="ts">`, shared types, and `~/` imports for new code. Use PascalCase for new reusable components and preserve existing route filenames. Article notation uses `!C`, `!D`, `!H`, and `!S`; auction data uses values such as `1C`, with `P` for auction passes and `Pass` for answer keys.

## Testing Guidelines

No automated test framework, test script, or coverage threshold is configured. Validate changes with generation and manual checks: direct route loading, navigation, mobile layout, article anchors, question switching, and answer explanations. For bidding changes, check Double/Redouble availability and initial state. For question edits, verify 13 cards, valid answers, and explanations. Report checks actually performed.

## Commit & Pull Request Guidelines

History uses short descriptive English subjects, including `New: Lebensohl` and `Fix bug`; no strict prefix convention is established. Write specific summaries. PRs should explain the change, affected routes, validation, and related issues when applicable; include screenshots for visual changes. The current workflow builds pushes and PRs targeting `master`, but only deploys successful pushes to `master`; write permission is scoped to the deploy job. Review deployment effects before changing it.
