import { test, expect } from "@playwright/test";

const routes = [
  ["/", "Get Access to Hundreds Courses Available"],
  ["/search", "Find Your Next Course"],
  ["/creators/purepearl-studio", "PurePearl Studio"],
  ["/courses/digital", "Build Digital Asset: A Comprehensive Guide"],
  ["/courses/digital/lessons", "Build Digital Asset: A Comprehensive Guide"],
  ["/courses/digital/reviews", "Build Digital Asset: A Comprehensive Guide"],
  ["/login", "Welcome Back"],
  ["/signup", "Welcome to ByteSpace"],
];
for (const [path, heading] of routes) {
  test(`direct navigation and refresh: ${path}`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(path);
    await expect(
      page.getByRole("heading", { level: 1, name: heading }),
    ).toBeVisible();
    await page.reload();
    await expect(
      page.getByRole("heading", { level: 1, name: heading }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("unknown pages, creators, course IDs, and tabs show the 404 recovery page", async ({
  page,
}) => {
  for (const path of [
    "/missing",
    "/creators/unknown",
    "/courses/missing",
    "/courses/digital/unknown",
  ]) {
    await page.goto(path);
    await expect(
      page.getByRole("heading", {
        name: "The page you are looking for doesn’t exist",
      }),
    ).toBeVisible();
  }
  await page.getByRole("link", { name: "Back to Home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("course tabs preserve the chosen course and browser back navigation", async ({
  page,
}) => {
  await page.goto("/courses/figma");
  await page
    .getByRole("navigation", { name: "Course sections" })
    .getByRole("link", { name: "Lessons" })
    .click();
  await expect(page).toHaveURL(/\/courses\/figma\/lessons$/);
  await page
    .getByRole("navigation", { name: "Course sections" })
    .getByRole("link", { name: "Reviews" })
    .click();
  await expect(page).toHaveURL(/\/courses\/figma\/reviews$/);
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Explore the Modules" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "See Full Profile" }).click();
  await expect(page).toHaveURL(/\/creators\/purepearl-studio$/);
});
