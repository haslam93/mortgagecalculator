# Testing

The repository does not currently include an automated test framework. Until one is added, use the existing client quality checks and the manual test cases below. Do not use `npm test` in `server`; that script is a placeholder which exits with an error.

## Client checks

Run these commands from `client`:

```bash
npm run lint
npm run build
```

The lint command checks the React source with ESLint. The build command verifies that Vite can produce the production bundle.

## API smoke tests

Start the API from `server`:

```bash
npm start
```

In a second terminal, verify that rates can be read:

```bash
curl --fail http://localhost:3001/api/rates
```

Verify a known payment calculation:

```bash
curl --fail \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"loanAmount":300000,"interestRate":6.5,"loanTermYears":30}' \
  http://localhost:3001/api/calculate
```

The response should report a monthly payment of `1896.20`, a total payment of `682633.47`, and total interest of `382633.47`.

Verify required-field validation:

```bash
curl --silent \
  --output /dev/null \
  --write-out "%{http_code}\n" \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"loanAmount":300000}' \
  http://localhost:3001/api/calculate
```

The response status should be `400`.

## Browser checks

With both the client and API running:

1. Open `http://localhost:5173` and confirm the seeded rates appear.
2. Select a rate and confirm its interest rate and term populate the calculator.
3. Submit the default `$300,000`, `6.5%`, 30-year calculation and confirm the monthly payment is `$1896.20`.
4. Open `/rates` and confirm only the rates panel appears.
5. Open `/calculators` and confirm only the calculator panel appears.
6. Enter missing or invalid values and confirm the UI does not display a successful result.

## Future automated coverage

When a test framework is introduced, prioritize:

- Unit tests for the amortization formula and input validation.
- API integration tests for success, database failure, and HTTP `400` responses.
- React tests for loading rates, selecting a rate, submitting the form, and error states.
