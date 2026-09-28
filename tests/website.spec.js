import { test, expect } from "@playwright/test";

test("production landing page loads every local image without runtime errors", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Get Access to HundredsCourses Available",
  );
  await expect(
    page.getByRole("heading", {
      name: "Discover What Our Community Is Saying",
    }),
  ).toBeVisible();
  const brokenImages = await page.evaluate(async () => {
    document
      .querySelectorAll("img")
      .forEach((image) => (image.loading = "eager"));
    await Promise.all(
      [...document.images].map((image) => image.decode().catch(() => {})),
    );
    return [...document.images]
      .filter(
        (image) =>
          !image.naturalWidth || image.getBoundingClientRect().width === 0,
      )
      .map((image) => image.src);
  });
  expect(brokenImages).toEqual([]);
  expect(errors).toEqual([]);
});

test("search returns matching courses and recovers from no results", async ({
  page,
}) => {
  await page.goto("/");
  const search = page.getByRole("searchbox");
  await search.fill("figma");
  await search.press("Enter");
  await expect(
    page.getByRole("link", {
      name: "View Learn Figma from Basic",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "View the Power of Big Data",
      exact: true,
    }),
  ).toHaveCount(0);
  await search.fill("a course that does not exist");
  await search.press("Enter");
  await expect(
    page.getByRole("heading", { name: "No results found" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Clear search and filters", exact: true })
    .click();
  await expect(
    page.getByRole("link", {
      name: "View the Power of Big Data",
      exact: true,
    }),
  ).toBeVisible();
  await expect(search).toHaveValue("");
});

test("category and learning-path filters show relevant courses", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "UI/UX Design", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "UI/UX Design", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("link", {
      name: "View Learn Figma from Basic",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Development", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("link", {
      name: "View the Power of Big Data",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "View Learn Figma from Basic",
      exact: true,
    }),
  ).toHaveCount(0);
});

test("course pages connect preview, lessons, and enrollment", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "View Learn Figma from Basic", exact: true })
    .click();
  await expect(page).toHaveURL(/\/courses\/figma$/);
  await page.getByRole("button", { name: "Play course preview" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await page
    .getByRole("navigation", { name: "Course sections" })
    .getByRole("link", { name: "Lessons" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Explore the Modules" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Enroll Now" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Create an account" })
    .click();
  await expect(page).toHaveURL(/\/signup\?course=figma$/);
  await expect(
    page.getByRole("heading", { name: "Welcome to ByteSpace" }),
  ).toBeVisible();
});

test("mobile navigation and layouts work at narrow and tablet widths", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Courses", exact: true }).click();
  await expect(menu).toBeHidden();
  await page.getByRole("button", { name: "Open menu" }).click();
  await menu.getByRole("link", { name: "Sign In", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome Back" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("auth forms validate entries, toggle password visibility, and disclose demo state", async ({
  page,
}) => {
  await page.goto("/signup");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await page.getByLabel("Full name").fill("Alex Learner");
  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await page.getByLabel("Password", { exact: true }).fill("demo-password");
  await page.getByRole("button", { name: "Show password" }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await page.getByRole("button", { name: "Hide password" }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
    "type",
    "password",
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator(".auth-feedback")).toContainText(
    "no account has been created",
  );
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByRole("link", { name: "Login", exact: true }).click();
  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await page.getByLabel("Password", { exact: true }).fill("demo-password");
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await expect(page.locator(".auth-feedback")).toContainText(
    "authentication is not connected",
  );
});

test("newsletter feedback is honest and cookie preferences persist", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Email for newsletter").fill("learner@example.com");
  await page.locator(".newsletter-form").getByRole("button").click();
  await expect(page.locator(".toast")).toContainText("not connected");
  await page.getByRole("button", { name: "Cookies Settings" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Save preferences" }).click();
  await page.reload();
  await page.getByRole("button", { name: "Cookies Settings" }).click();
  await expect(page.getByRole("checkbox")).toBeChecked();
});
