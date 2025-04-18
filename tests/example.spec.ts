import { test, expect } from "@playwright/test";

test("local app title", async ({ page }) => {
    await page.goto("/"); // Relative path, baseURL is used
    const title = await page.title();
    expect(title).toBe("Vite + React + TS"); // Update with your app's expected title
});
