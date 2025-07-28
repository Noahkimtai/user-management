import { Page, Locator } from '@playwright/test';


export class AccountManagement{
    readonly page: Page;

    readonly manageAccountHeading: Locator;
    readonly deleteAccountButton: Locator;
    readonly updateProfileButton: Locator;
    readonly nameInputField: Locator;
    readonly emailInputField: Locator;
    readonly phoneInputField: Locator;
    readonly submitUpdateeButton: Locator;    

    
    constructor(page: Page){
        this.page = page;
        this.manageAccountHeading =  this.page.getByRole('heading', { name: 'Manage Account' });
        this.deleteAccountButton =  this.page.getByRole('button', { name: 'Delete Account' });
        this.updateProfileButton =  this.page.getByRole('button', { name: 'Update Profile' });
        this.nameInputField = this.page.getByRole('textbox', { name: 'Name' });
        this.emailInputField = this.page.getByRole('textbox', { name: 'Email' });
        this.phoneInputField = this.page.getByRole('textbox', { name: 'Phone' });
        this.submitUpdateeButton =  this.page.getByRole('button', { name: 'Submit Update' });
    }

    async updateProfile(newName: string, newPhone: string){
        await this.updateProfileButton.click();
        await this.nameInputField.click();
        await this.nameInputField.fill(newName);
        await  this.phoneInputField.click();
        await  this.phoneInputField.fill(newPhone);
        await this.submitUpdateeButton.click()
    }

    async deleteAccount(){
        await this.deleteAccountButton.click();
    }
}