# Playwright Hybrid E2E Framework - AI Agent Guide

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

> **Default execution**: When asked to run desktop Playwright tests (including login scenarios), prefer `npm run chromeDebug`.

## Test Structure & Conventions

### Test File Patterns

- **Test Location**: `tests/playwright/features/*.test.ts`
- **Imports**: Always use `{ test, expect } from "../../../fixtures/automation-fixtures"`
- **Tags**: Use `{ tag: ["@smoke", "@regression", "@visual"] }` for test filtering
- **Authentication**: Apply `test.use(asUser("guest"))` for unauthenticated tests
- **Isolation**: Mark newly generated Playwright tests with `.only` so only the new scenario runs, then remove the `.only` once the scenario passes locally
- **Debugging**: After creating or updating a test, execute `npm run chromeDebug` to debug it interactively. Avoid `npm run chromeUI` unless the user specifically needs a headless run.

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

- API Testing: Access API clients via fixtures (e.g., notesClient). Authentication is handled automatically. All clients extend BaseApiClient.

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
