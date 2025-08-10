import { test, expect, Page } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';

let landingPage: LandingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  await landingPage.goto('/');
});

test('Landing UI Page snapshot', async ({ page }) => {
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - heading "Welcome to User Management" [level=1]
    - paragraph: "Please select an option:"
    - link "Login":
      - /url: /login
      - button "Login"
    - link "Register":
      - /url: /register
      - button "Register"
    `);
});

test('Login Page UI snapshot', async ({ page }) => {
  await landingPage.openLoginPage();
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - heading "Login" [level=1]
    - textbox "Email"
    - textbox "Password"
    - button "Login"
    `);
});

test('Register Page UI snapshot', async ({ page }) => {
  await landingPage.openRegistrationPage();

  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - heading "Register" [level=1]
    - textbox "Name"
    - textbox "Email"
    - textbox "Phone"
    - textbox "Password"
    - textbox "Confirm Password"
    - button "Register"
    `);
});