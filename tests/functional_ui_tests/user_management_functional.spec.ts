import { test, expect } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { AccountManagement } from './pages/AccountManagement';
import { users } from '../Data/userData';
import { Registration } from './pages/Registeration';


test('Landing page displays Login, Register and Header texts', async({page}) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto('http://localhost:5173/');
  await expect(landingPage.pageHeading).toBeVisible();
  await expect(landingPage.loginButton).toBeVisible();
  await expect(landingPage.registerButton).toBeVisible();
});

test('User can register new user', async({page}) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openRegistrationPage();

  const registrationPage = new Registration(page);

  const dialogPromise = page.waitForEvent('dialog');

  await registrationPage.register(users.valid.name, users.valid.email, users.valid.phone, users.valid.password);

  const dialog = await dialogPromise;

  const registerAlertMessage = dialog.message();
  await dialog.dismiss().catch(() => {});

  await expect(registerAlertMessage).toBe("User registered successfully");
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('User can not register duplicate email', async({page}) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openRegistrationPage();

  const registrationPage = new Registration(page);

  const dialogPromise = page.waitForEvent('dialog');

  await registrationPage.register(users.duplicate.name, users.duplicate.email, users.duplicate.phone, users.duplicate.password);

  const dialog = await dialogPromise;

  const registerAlertMessage = dialog.message();
  await dialog.dismiss().catch(() => {});

  await expect(registerAlertMessage).toBe("Email already exists.");
});

test('User can not register new user with empty input data', async({page}) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openRegistrationPage();

  const registrationPage = new Registration(page);

  const dialogPromise = page.waitForEvent('dialog');

  await registrationPage.register(users.empty.name, users.empty.email, users.empty.phone, users.empty.password);

  const dialog = await dialogPromise;

  const registerAlertMessage = dialog.message();
  await dialog.dismiss().catch(() => {});

  await expect(registerAlertMessage).toBe("Internal Server Error. Please try again!!");
});

test('User can login with valid', async({page}) => {

  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openLoginPage()

  const loginPage = new Login(page)
  await loginPage.login(users.valid.email, users.valid.password)
  await expect(page.getByRole('heading', { name: 'Manage Account' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(users.valid.email);
});

test('User can  not login with wrong credentials password', async({page}) => {

  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openLoginPage()

  const loginPage = new Login(page)

  const dialogPromise = page.waitForEvent('dialog');

  await loginPage.login(users.wrongPassword.email,  users.wrongPassword.password)

  const dialog = await dialogPromise;

  const registerAlertMessage = dialog.message();
  await dialog.dismiss().catch(() => {});

  await expect(registerAlertMessage).toBe('Incorrect username / password'); 

});

test('User can not login with wrong credentials email', async({page}) => {

  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openLoginPage()

  const loginPage = new Login(page)

  const dialogPromise = page.waitForEvent('dialog');

  await loginPage.login(users.wrongEmail.email, users.wrongEmail.password)

  const dialog = await dialogPromise;

  const registerAlertMessage = dialog.message();
  await dialog.dismiss().catch(() => {});

  await expect(registerAlertMessage).toBe("User does not exists"); 

});

test('User can update profile', async({page}) => {

  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openLoginPage()
  const loginPage = new Login(page)
  await loginPage.login(users.valid.email, users.valid.password)

  const accountmanagementPage = new AccountManagement(page);
  const dialogPromise = page.waitForEvent('dialog');
  await accountmanagementPage.updateProfile(users.update.name, users.update.phone);
  const dialog = await dialogPromise;

  const registerAlertMessage = dialog.message();
  await dialog.dismiss().catch(() => {});

  await expect(registerAlertMessage).toBe("User details updated successfully");
});

test('User can delete account', async({page}) => {

  const landingPage = new LandingPage(page);
  await landingPage.goto('http://localhost:5173/');
  await landingPage.openLoginPage()

  const loginPage = new Login(page)
  await loginPage.login(users.valid.email, users.valid.password)

  const accountmanagementPage = new AccountManagement(page);
  await accountmanagementPage.deleteAccount();

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});