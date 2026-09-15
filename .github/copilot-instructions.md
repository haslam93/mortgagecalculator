# Repository instructions

- Keep changes focused and consistent with the existing React, Express, and SQLite architecture.
- Use Node.js 18 or newer.
- Install and run client commands from `client`.
- Install and run server commands from `server` so `./mortgage.db` resolves correctly.
- Run `npm run lint` and `npm run build` in `client` after changing client code.
- The server has no automated test suite; use the smoke tests in `docs/TESTING.md`.
- Keep the API on port `3001` and the Vite client on port `5173` unless configuration support is added across both applications and documentation.
- Do not commit generated client output or dependency directories.
