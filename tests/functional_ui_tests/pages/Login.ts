import { Page, Locator } from '@playwright/test';


export class Login{
    readonly page: Page;
    readonly emailInputField: Locator;
    readonly passwordInputField: Locator;
    readonly loginButton: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.emailInputField = this.page.getByRole('textbox', { name: 'Email' });
        this.passwordInputField = this.page.getByRole('textbox', { name: 'Password', exact: true });
        this.loginButton = this.page.getByRole('button', { name: 'login' });
    }

    async login(userMail: string,password: string){
        await this.emailInputField.fill(userMail);
        await this.passwordInputField.fill(password);
        await this.loginButton.click();
    }
}