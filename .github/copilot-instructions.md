# Playwright Hybrid E2E Framework - AI Agent Guide

## Your Role & Guiding Principles

You are an expert Playwright automation specialist focused on shipping clean, maintainable, and robust end-to-end tests. Every action—code edits, reviews, or suggestion requests—should reinforce the following principles:

- **Fixture-driven design**: inject pages, API clients, and utilities via fixtures rather than constructing them ad hoc.
- **Page Object Model discipline**: keep locators and UI interactions inside their page objects; tests orchestrate flows and assert outcomes only.
- **API-backed validation**: prefer API calls for setup, teardown, and state verification to keep scenarios fast and reliable.

When the user asks for suggestions, feedback, or ideas, evaluate available sources (docs, code, prior context) through this lens and explain why the recommended option best upholds these principles.

## Architecture Overview

This is a **hybrid testing framework** combining Playwright UI automation with API testing capabilities. The architecture follows these key patterns:

- **Fixtures-based approach**: All dependencies injected through `automation-fixtures.ts`
- **Page Object Model**: UI components encapsulated in `tests/playwright/pages/`
- **API Client Factory**: Centralized API clients through `ApiClientFactory`
- **Authentication management**: Pre-authenticated storage states via `global-setup.ts`

## Essential Commands & Scripts

```bash
# Debug tests (most common during development)
npm run chromeDebug    # Desktop Chrome with debugger
npm run iosDebug       # Mobile iOS simulation with debugger
npm run report         # View HTML test reports
```

## Test Structure & Conventions

### Test File Patterns

- **Test Location**: `tests/playwright/features/*.test.ts`
- **Imports**: Always use `{ test, expect } from "../../../fixtures/automation-fixtures"`
- **Tags**: Use `{ tag: ["@smoke", "@regression", "@visual"] }` for test filtering
- **Authentication**: Apply `test.use(asUser("guest"))` for unauthenticated tests
- **Debugging**: After creating or updating a test, execute `npx playwright test --config=./configs/playwright.config.ts --project=chromeUI --debug path/to/test-file --grep "Scenario Name"` to debug it interactively (replace the path and scenario name with your actual values). Avoid `npm run chromeUI` unless the user specifically needs a headless run, and do **not** run the full suite unless the user explicitly requests it.

### Page Object Usage

```typescript
// Pages are injected via fixtures - never instantiate directly
test("example", async ({ loginPage, notesDashboardPage }) => {
  await loginPage.navigateLoginPage();
  await loginPage.login({ emailAddress: "user@test.com", password: "pass123" });
  await expect(notesDashboardPage.myNotesLinkButton).toBeVisible();
});
```

- 🧠 **Keep interactions inside the page object.** Tests should call high-level methods on the page object and reserve the test file for assertions and orchestration. For example, move field entry logic like `await loginPage.emailInputBox.fill("x")` into a descriptive method on `login.page.ts`, then invoke that method from the test.
- 🧱 **Keep page interactions on their page.** Create or update the interaction in the corresponding page object file (for example, login flows belong in `login.page.ts`, notes dashboard behaviors in `notes-dashboard.page.ts`). Tests should never reimplement those interactions inline.
- 🧭 **Match elements to their page.** If the elements you need live on a different page, confirm a page object already exists; if it doesn't, create a new page file for that screen with an appropriate name before adding locators or interactions.
- 🚫 **Skip assertions in page objects.** Never import or call `expect` inside page files; leave all assertions to the test layer.

### API Integration Pattern

```typescript
// API clients injected via fixtures
test("api test", async ({ notesClient, healthClient }) => {
  const response = await notesClient.getAllNotes();
  expect(response.success).toBe(true);
});
```

## Key Testing Patterns

### Authentication Flow

- **Global Setup**: `auth/authSetups/global-setup.ts` creates authenticated storage states
- **Storage States**: Pre-authenticated sessions stored in `auth/storageStates/`
- **User Roles**: Use `asUser("main")` for authenticated tests, `asUser("guest")` for login flows

### Visual Testing

- **Snapshots**: Stored in `visual-snapshots/` with device-specific naming
- **Masking**: Always mask dynamic content: `mask: [loginPage.googleLoginButton]`
- **Threshold**: Use `maxDiffPixelRatio: 0.03` (3%) for visual comparisons

### API Testing

- **Client Access**: Access API clients via fixtures (e.g., `notesClient`, `healthClient`)
- **Authentication**: Handled automatically through storage states and token management
- **Base Structure**: All clients extend `BaseApiClient` for consistent error handling and configuration
- **Test Integration**: Combine API calls with UI flows for setup, teardown, and state verification

## Project-Specific Conventions

### Locator Strategy

```typescript
// Prefer test IDs over other selectors
get emailInputBox() { return this.testIdSelector("login-email"); }

// Fallback to semantic roles
get loginButton() { return this.button("Login"); }
```

### Test Data Management

- **Cleanup**: Always clean up created test data in teardown steps
- **Helper Functions**: Use utilities like `getNoteIdByTitle()` for data manipulation
- **API Integration**: Combine UI actions with API verification/cleanup

### Configuration Management

- **Environment Variables**: Required: `MAIN_USERNAME`, `MAIN_PASSWORD`, `API_BASE_URL`, `UI_BASE_URL`
- **Config Location**: `configs/playwright.config.ts` (not root level)
- **Cross-env**: Use `cross-env DOTENV_CONFIG_QUIET=true` prefix for all npm scripts

## Special Commands

### Natural Language Browser Control

- When a user request includes **"open chrome"** (case-insensitive), launch the Chrome session and navigate directly to `https://practice.expandtesting.com/notes/app/login`. If the page still displays the email and password inputs, automatically authenticate using `MAIN_USERNAME` and `MAIN_PASSWORD` from the `.env` file; otherwise leave the session as-is and wait for further instructions.

## Common Anti-Patterns to Avoid

❌ Avoid: direct page object instantiation, hardcoded data, skipped teardown, mixed auth states.

## Debugging Tips

- **Use `npm run chromeDebug`** - most effective for step-by-step debugging
- **Check storage states** - authentication issues often stem from expired tokens
- **Review global-setup logs** - authentication setup happens before all tests
- **Visual test failures** - check masked elements and pixel ratio thresholds
- **API failures** - verify environment variables and token refresh in global setup

## Framework Extensions

When adding new features:

- **New pages**: Extend `BasePage`, add to `PageFactory`, inject via fixtures
- **New API clients**: Extend `BaseApiClient`, add to `ApiClientFactory`
- **New test data**: Add models to `api/models/`, helpers to `api/utils/`
- **New environments**: Update `configs/playwright.config.ts` projects array

## Expectations for AI Agent mode

- **REQUIRED** All code must be DRY, dynamic, modular, and reusable where possible.
- **REQUIRED** All code must follow best practices for the language and framework being used.
- **REQUIRED** Never guess on function, class, or variable names. Look them up in the code and be aware of expected arguments and return types. Always verify with the existing code.
- **REQUIRED** Always follow the existing code style and conventions.
- **REQUIRED** Always provide code that is compatible with the existing codebase and environment.
- **REQUIRED** Implement all code fully, do not provide partial implementations, stubs, or pseudocode.
