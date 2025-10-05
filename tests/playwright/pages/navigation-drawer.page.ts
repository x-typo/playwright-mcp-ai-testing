import { type Locator, type Page, expect } from "@playwright/test";

export class NavigationDrawer {
  readonly page: Page;
  readonly isMob: boolean | undefined;

  private readonly selectors = {
    sidebarId: "sidebar",
    drawerChevronButton: "drawer-chevron",
    mobileNavigationContainer: "mobile-navigation",
    mobileMenuItem: "Menu",
    drawerHeading: "QA Practice",
  } as const;

  private readonly navigationLinks = [
    "Ecommerce - Login",
    "Spot the BUGS CHALLENGE",
    "GraphQL Testing",
    "API Testing",
    "Products List - Shop",
    "Intercept API Request",
    "Visual Testing - GIF Page",
    "Forms",
    "Buttons",
    "New Tab / Window",
    "Btn actions",
    "Tables",
    "Dropdowns",
    "Iframes",
    "Alerts",
    "File Upload",
    "Date Pickers",
    "Loader",
    "Pagination",
    "RV - Website",
    "Let's connect - LinkedIn",
    "Learn with RV - YouTube",
  ] as const;

  // LOCATOR DECLARATIONS //
  idSelector: (name: string) => Locator;
  heading: (name: string) => Locator;
  text: (name: string) => Locator;
  icon: (name: string) => Locator;
  button: (name: string) => Locator;
  link: (name: string) => Locator;
  menuItem: (name: string) => Locator;
  menuPopup: (name: string) => Locator;
  readonly navDrawer: Locator;
  readonly navBarButton: Locator;
  readonly navBarMobile: Locator;
  readonly navBarButtonMobile: Locator;

  // LOCATOR INITIALIZATIONS //
  constructor(page: Page, isMob: boolean | undefined) {
    this.page = page;
    this.isMob = isMob;

    this.idSelector = (name) => page.locator(`#${name}`);
    this.heading = (name) => page.getByRole("heading", { name: name });
    this.text = (name) => page.getByText(name);
    this.icon = (name) => page.getByTestId(name);
    this.button = (name) => page.getByRole("button", { name: name });
    this.link = (name) => page.getByRole("link", { name: name });
    this.menuItem = (name: string) =>
      page.getByRole("link", { name: new RegExp(`^${name}`) });
    this.menuPopup = (name: string) =>
      page.getByRole("tooltip", { name: new RegExp(`^${name}`) });
    this.navDrawer = page.locator(`#${this.selectors.sidebarId}`);
    this.navBarButton = page.getByTestId(this.selectors.drawerChevronButton);
    this.navBarMobile = page.getByTestId(
      this.selectors.mobileNavigationContainer
    );
    this.navBarButtonMobile = page.getByRole("menuitem", {
      name: this.selectors.mobileMenuItem,
    });
  }

  // Interactions //
  async selectIdSelector(name: string) {
    await this.idSelector(name).click();
  }

  async selectMenuList(name: string) {
    await this.menuItem(name).click();
  }

  async selectIcon(name: string) {
    await this.icon(name).click();
  }

  async selectText(name: string) {
    await this.text(name).click();
  }

  async selectLink(name: string) {
    await this.link(name).click();
  }

  // Verifications //
  async verifyDrawer() {
    await expect(
      this.heading(this.selectors.drawerHeading).first()
    ).toBeVisible();

    for (const linkText of this.navigationLinks) {
      await expect(this.link(linkText)).toBeVisible();
    }
  }
}
