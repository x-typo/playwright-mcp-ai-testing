<p align="center">
  <img width="100" src="https://i.imgur.com/TgIgEjo.png" alt="Playwright" align="middle"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="48" src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/plus.svg" alt="Plus" align="middle"/>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="130" src="https://i.imgur.com/QZKvZAW.png" alt="AI-powered" align="middle"/>
</p>

# AI-Powered Playwright Hybrid E2E Framework

[![CI Status](https://img.shields.io/badge/CI-passing-brightgreen)]() [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/) [![Playwright](https://img.shields.io/badge/Playwright-1.51-45ba4b)](https://playwright.dev/) [![License](https://img.shields.io/badge/license-MIT-yellow)]()

> A production-ready, AI-powered test automation framework that unifies UI and API testing with intelligent workflows.

Inside you'll find an MCP-integrated Playwright stack that blends UI and API automation with WebdriverIO/Appium mobile coverage—optimized for fast feedback, high reusability, and clean abstractions.

## Why This Framework?

- **Fast Onboarding** - Get productive in minutes with AI-assisted test authoring
- **Reliable** - API-backed setup eliminates flaky tests and data dependencies
- **Maintainable** - SOLID principles and Page Object Model keep code clean
- **Observable** - Built-in reporting, visual regression, and CI/CD integration
- **AI-Native** - Natural language commands accelerate test creation and debugging

## Highlights

- **Fixture-driven architecture** injects fully configured pages and API clients into every test.
- **SOLID-aligned Page Object Model** keeps selectors and actions encapsulated while leaving assertions in the test layer.
- **API-backed setup & verification** enables reliable test data management and faster feedback loops.
- **Cross-device coverage** for desktop Chrome, iOS emulation, and LambdaTest mobile runs.
- **Visual regression support** with baseline snapshots per device.
- **AI-assisted authoring** powered by the Playwright MCP server, enabling natural language-driven automation and live DOM scanning without additional npm scripts.

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

## Quick Start

Get up and running in under 2 minutes, then pair it with the MCP-powered "open chrome" flow to lock selectors in minutes:

```bash
# 1. Clone and install
git clone https://github.com/x-typo/playwright-mcp-ai-testing.git
cd playwright-mcp-ai-testing
npm install

# 2. Install Playwright browsers (first-time only)
npx playwright install

# 3. Create .env file with your credentials
# See "Environment Configuration" section below

# 4. Run your first test
npm run chrome-debug -- --grep "@smoke"
```

**Success!** You should see the Playwright debugger open and tests running.

## AI Workflow Requirements

To leverage the AI assistant for DOM inspection or natural language automation flows:

- Install the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) and follow the repo instructions to configure credentials and start the service.
- Connect via an MCP-aware client—GitHub Copilot Chat (Command Palette → “GitHub Copilot: Manage MCP Servers”), Claude Code, Codex, or the MCP CLI (`npx @playwright/mcp@latest`)—so the agent can attach to the server.
- Use the "open chrome" instruction with the AI agent to launch a pre-authenticated browser session; the MCP server handles DOM scanning directly.
- Continue to rely on standard scripts such as `npm run chrome-debug` or `npm run chrome-ui` for verification runs.

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
   npm run chrome-debug -- --grep "@smoke"
   ```
   The debug UI opens Playwright's runner so you can watch the flow and capture traces if needed.

## Running Tests

| Scenario                                    | Command                                              |
| ------------------------------------------- | ---------------------------------------------------- |
| Interactive desktop debugging (recommended) | `npm run chrome-debug -- --grep "Scenario Name"`     |
| Interactive iOS emulation                   | `npm run ios-debug -- --grep "Scenario Name"`        |
| Headless desktop smoke/regression           | `npm run chrome-ui -- --grep "@smoke"`               |
| Visual regression (desktop / iOS)           | `npm run chrome-visual` / `npm run ios-visual`       |
| Playwright Test UI mode                     | `npm run ui-mode`                                    |
| Show latest HTML report                     | `npm run report`                                     |
| Generate selectors with codegen             | `npm run codegen-desktop` / `npm run codegen-mobile` |

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

| Issue               | Solution                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Auth failures**   | Re-run `npm run chrome-debug` to confirm storage state is valid; check `auth/authSetups/global-setup.ts` logs |
| **Flaky selectors** | Use "open chrome" workflow to inspect live DOM, then update the page object                                   |
| **Visual drift**    | Mask dynamic regions before capturing snapshots; use `maxDiffPixelRatio: 0.03` as guardrail                   |
| **Mobile issues**   | Validate WDIO configs under `configs/`; ensure LambdaTest credentials are exported                            |
| **Test failures**   | Check trace files in `test-results/` or run with `--debug` flag for step-by-step execution                    |

## Additional Resources

- [Framework Architecture Guide](./AGENTS.md) - Deep dive into design patterns and AI workflows
- [Playwright Documentation](https://playwright.dev/) - Official Playwright docs
- [WebdriverIO Documentation](https://webdriver.io/) - Mobile testing with Appium
- [Playwright MCP Server](https://github.com/microsoft/playwright-mcp) - Run the AI-enabled browser control service
- [Claude Code](https://docs.claude.com/en/home) - Claude’s IDE with native MCP client support
- [OpenAI Codex](https://developers.openai.com/codex) - Codex developer platform and MCP integrations

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with [Playwright](https://playwright.dev/) by Microsoft
- AI integration powered by Model Context Protocol (MCP)
- Test app provided by [ExpandTesting](https://practice.expandtesting.com/)

---

Happy testing! Keep flows simple, reuse shared helpers, and lean on API calls for reliable setup/teardown.
