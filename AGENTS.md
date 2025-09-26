# Repository Guidelines

## Project Structure & Modules
- Frontend: `src/` (React + TypeScript, Vite). Static assets in `public/`. Build output in `dist/`.
- Backend: `backend/` (NestJS + TypeScript). Source in `backend/src/`, tests in `backend/test/`, scripts in `backend/scripts/`.
- Config: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js` (root), `backend/eslint.config.mjs`, `backend/.prettierrc`.
- Secrets: backend uses `GOOGLE_APPLICATION_CREDENTIALS` (see `backend/.env`); keep secrets under `var/secrets/` and out of VCS.

## Build, Test, and Development
- Frontend dev: `npm run dev` (serves at `http://localhost:5173`).
- Frontend build: `npm run build`; preview: `npm run preview`.
- Backend dev: `cd backend && npm run start:dev` (watches files). Port from `PORT` or `3000`.
- Backend build: `cd backend && npm run build`; prod: `npm run start:prod`.
- Backend tests: `cd backend && npm run test` (unit), `npm run test:e2e` (e2e), `npm run test:cov` (coverage).
- Admin script: `cd backend && npm run set:role -- <uid> <admin|user>`.

## Coding Style & Naming
- TypeScript everywhere; 2-space indent; use semicolons.
- Frontend: follow ESLint recommended + React Hooks rules (`npm run lint`).
- Backend: ESLint + Prettier (single quotes, trailing commas). Run `cd backend && npm run lint` and Prettier via `npm run format`.
- Names: files `kebab-case` for modules; React components `PascalCase`.

## Testing Guidelines
- Framework: Jest on backend. Unit specs end with `.spec.ts`; e2e specs end with `.e2e-spec.ts` in `backend/test/`.
- Minimum: add unit tests for new providers/guards; include e2e for new routes.
- Run locally before PR: `cd backend && npm run test && npm run test:e2e`.

## Commit & Pull Requests
- Commits: keep short, imperative, and scoped (e.g., "API 連携（フロント側）", "AuthGuard の設定"). Group related changes.
- PRs: include clear description, linked issues, steps to test, and screenshots/terminal logs for API changes. Note config changes (`.env`, CORS, ports).

## Security & Configuration
- Backend Firebase Admin initializes from `GOOGLE_APPLICATION_CREDENTIALS`. Example: `PORT=4000` in `backend/.env`.
- Frontend API base: `src/lib/api.ts` (`http://localhost:3000`). Keep in sync with backend port and CORS (`backend/src/main.ts`).
