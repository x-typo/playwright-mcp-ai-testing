<div align="center">
<table style="border-collapse: collapse; border: none;">
<tr style="border: none;">
<td style="border: none;"><img width="100" src="https://i.imgur.com/TgIgEjo.png" alt="Playwright"/></td>
<td style="border: none;"><img width="48" src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/plus.svg" alt="Plus"/></td>
<td style="border: none;"><img width="130" src="https://i.imgur.com/QZKvZAW.png" alt="AI-powered"/></td>
</tr>
</table>
</div>

# AI-Powered Playwright Hybrid E2E Framework

This repository hosts an AI-powered Playwright framework with MCP server integration that unifies UI and API testing while showcasing mobile coverage (via WebdriverIO/Appium). It is engineered for fast feedback, high reusability, and clean abstractions that scale with your product.

## Highlights

- **Fixture-driven architecture** injects fully configured pages and API clients into every test.
- **SOLID-aligned Page Object Model** keeps selectors and actions encapsulated while leaving assertions in the test layer.
- **API-backed setup & verification** enables reliable test data management and faster feedback loops.
- **Cross-device coverage** for desktop Chrome, iOS emulation, and LambdaTest mobile runs.
- **Visual regression support** with baseline snapshots per device.
- **AI-assisted authoring** through the Playwright MCP server and `npm run aiChrome` workflow for natural language-driven automation.

## Architecture at a Glance

- **Fixtures**: `fixtures/automation-fixtures.ts` wires Playwright pages, API clients, and auth helpers into the test context.
- **Page Objects**: `tests/playwright/pages/*` encapsulate locators and interactions for each surface (login, notes dashboard, profile, etc.).
- **API Clients**: `api/clients/*` expose typed helpers for REST endpoints via the `ApiClientFactory`.
- **Authentication**: `auth/authSetups/global-setup.ts` prepares storage states so UI tests start authenticated when required.
- **Configuration**: `configs/playwright.config.ts` centralizes projects, reporters, and global behaviors; separate WDIO configs power mobile emulation.

## Repository Layout

```
├── api/                         # API clients, endpoints, and data models
│   ├── clients/                 # Base client + domain-specific clients (health, notes)
│   ├── endpoints/               # Endpoint builders referenced by the clients
│   ├── models/                  # Shared request/response interfaces
│   └── utils/                   # Helper utilities (e.g., note lookups)
├── auth/                        # Authentication manager, global setup, storage states
├── configs/                     # Playwright + WDIO configuration files
├── fixtures/                    # Playwright fixtures that inject pages, clients, and helpers
├── reporters/                   # Post-run integrations (e.g., Microsoft Teams notifications)
├── tests/
│   ├── playwright/
│   │   ├── features/            # Playwright test specs orchestrating POM flows
│   │   └── pages/               # Page Object Model classes + PageFactory
│   └── appium/                  # Mobile UI specs and page objects for WebdriverIO
├── visual-snapshots/            # Baseline images per project for visual comparisons
├── playwright-report/           # Last generated Playwright HTML report (gitignored in CI)
├── test-results/                # Aggregated artifacts from previous runs
├── package.json                 # npm scripts, dependencies, toolchain versions
├── tsconfig.json                # TypeScript compiler configuration
└── README.md                    # You are here
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (bundled with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/) with the [Playwright VS Code extension](https://playwright.dev/docs/getting-started-vscode) for debugger-friendly runs
- Access credentials for the ExpandTesting Notes app (see Environment configuration)

Optional but recommended:

- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilotvs) for faster authoring
- Chrome DevTools knowledge for live DOM inspection via the "open chrome" workflow

## Environment Configuration

Create a `.env` file in the project root (or export the variables in your shell) with the following keys:

| Variable        | Description                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| `MAIN_USERNAME` | Primary account email used for authenticated UI flows                               |
| `MAIN_PASSWORD` | Password for `MAIN_USERNAME`                                                        |
| `API_BASE_URL`  | Base URL for REST requests (e.g., `https://practice.expandtesting.com/notes/api`)   |
| `UI_BASE_URL`   | Base URL for UI navigation (default `https://practice.expandtesting.com/notes/app`) |

The npm scripts rely on `cross-env` to load these variables (see `package.json`).

## Getting Started

1. **Install dependencies**
   ```powershell
   npm install
   ```
2. **Install Playwright browsers** (first-time setup only)
   ```powershell
   npx playwright install
   ```
3. **Verify credentials** by running a quick smoke test:
   ```powershell
   npm run chromeDebug -- --grep "@smoke"
   ```
   The debug UI opens Playwright's runner so you can watch the flow and capture traces if needed.

## Running Tests

| Scenario                                    | Command                                            |
| ------------------------------------------- | -------------------------------------------------- |
| Interactive desktop debugging (recommended) | `npm run chromeDebug -- --grep "Scenario Name"`    |
| Interactive iOS emulation                   | `npm run iosDebug -- --grep "Scenario Name"`       |
| Headless desktop smoke/regression           | `npm run chromeUI -- --grep "@smoke"`              |
| Visual regression (desktop / iOS)           | `npm run chromeVisual` / `npm run iosVisual`       |
| Playwright Test UI mode                     | `npm run uiMode`                                   |
| Show latest HTML report                     | `npm run report`                                   |
| Generate selectors with codegen             | `npm run codeGenDesktop` / `npm run codeGenMobile` |

> **Tip:** When authoring or fixing selectors, launch the pre-authenticated browser by requesting "open chrome" from the AI agent. It navigates to the login page and signs in automatically using the configured credentials.

### Test Tags & Filters

- Apply tags via `test.describe.configure({ mode: "parallel", retries: 0 }, { tag: ["@smoke"] });` in each spec.
- Filter runs using Playwright's `--grep` / `--grep-invert` flags (already wired through npm scripts).
- Reserve `@visual` for scenarios that compare snapshots stored in `visual-snapshots/`.

### Authenticated vs Guest Sessions

- Use `test.use(asUser("main"))` (via fixtures) when a test requires the pre-seeded storage state.
- Use `test.use(asUser("guest"))` for login or registration flows that must start unauthenticated.

## API & UI Collaboration

- **API Clients**: Access the `notesClient`, `healthClient`, etc., directly from fixtures inside your tests for data setup or verification.
- **Data Helpers**: Utilities such as `getNoteIdByTitle` streamline cleanup; add new helpers under `api/utils/`.
- **Assertions**: Keep all assertions in specs—page objects should expose only behaviors and locators.

## Reporting & CI

- Local reports: `npm run report` renders the last Playwright HTML report; WDIO runs output to `allure-results/` (if configured) and Teams reporters.
- CI compatibility: The config supports GitHub Actions and Jenkins. JUnit XML artifacts are generated automatically under `desktop-junit-reports/` for pipeline consumption.
- Visual diffs: Baselines live in `visual-snapshots/`; adjust thresholds via `expect().toMatchSnapshot` options in tests.

## Extending the Framework

- **New Page**: Extend `BasePage`, register it inside `PageFactory`, and expose it through fixtures.
- **New API Client**: Extend `BaseApiClient`, add an entry inside `ApiClientFactory`, and inject it through the appropriate fixture.
- **New Environment**: Duplicate/update entries in `configs/playwright.config.ts` or WDIO configs to add more device/browser coverage.
- **Shared Utilities**: Place XHR interceptors, data builders, and loggers in `api/utils/` or `fixtures/` to keep specs lean.

## Troubleshooting

- **Auth failures**: Re-run `npm run chromeDebug` to confirm the storage state is valid; check `auth/authSetups/global-setup.ts` logs.
- **Flaky selectors**: Inspect the live DOM using the "open chrome" workflow, then update the relevant page object.
- **Visual drift**: Mask dynamic regions in the page object before capturing new snapshots; use the `maxDiffPixelRatio` of `0.03` as a guardrail.
- **Mobile issues**: Validate WDIO configs under `configs/` and ensure the LambdaTest credentials (if used) are exported.

---

Happy testing! Keep flows simple, reuse shared helpers, and lean on API calls for reliable setup/teardown.
