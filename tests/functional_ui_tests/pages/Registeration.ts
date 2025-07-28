import { Page, Locator } from '@playwright/test';


export class Registration{
    readonly page: Page;
    readonly nameInputField: Locator;
    readonly emailInputField: Locator;
    readonly phoneInputField: Locator;
    readonly passwordInputField: Locator;
    readonly confirmPasswordInputField: Locator;
    readonly registerButton: Locator;
    


    constructor(page: Page){
        this.page = page;
        this.nameInputField = this.page.getByRole('textbox', { name: 'Name' })
        this.emailInputField = this.page.getByRole('textbox', { name: 'Email' })
        this.phoneInputField = this.page.getByRole('textbox', { name: 'Phone' })
        this.passwordInputField = this.page.getByRole('textbox', { name: 'Password', exact: true })
        this.confirmPasswordInputField = this.page.getByRole('textbox', { name: 'Confirm Password' })
        this.registerButton = this.page.getByRole('button', { name: 'Register' })
    }

    async register(userName: string, userMail: string, userPhone: string, password: string){
        await this.nameInputField.fill(userName);
        await this.emailInputField.fill(userMail);
        await this.phoneInputField.fill(userPhone);
        await this.passwordInputField.fill(password);
        await this.confirmPasswordInputField.fill(password);
        await this.registerButton.click();
    }
}