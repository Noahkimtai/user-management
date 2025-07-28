import { Page, Locator } from '@playwright/test';

export class LandingPage{
    readonly page: Page;
    readonly pageHeading: Locator;
    readonly loginButton: Locator;
    readonly registerButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.pageHeading = this.page.getByRole('heading', { name: 'Welcome to User Management' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.registerButton = this.page.getByRole('button', { name: 'Register' });
    }

    async goto(url: string){
        await this.page.goto(url);
    }

    async openRegistrationPage(){
        await this.registerButton.click();
    }

    async openLoginPage(){
        await this.loginButton.click();
    }
}