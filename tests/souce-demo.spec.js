import { test, expect } from '@playwright/test';

const baseUrl = 'https://www.saucedemo.com';

test('user successfully login', async ({ page }) =>  {
    await page.goto(baseUrl);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Assert that the URL is correct after login
    await expect(page).toHaveURL(`${baseUrl}/inventory.html`);
});

const usersLogin = [
    {
        username: '',
        password: '',
        error: 'Epic sadface: Username is required'
    },
    {
        username: '    '   ,
        password: '    ',
        error: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        username: 'wrong_user',
        password: '',
        error: 'Epic sadface: Password is required..'
    },
    {
        username: '',
        password: 'wrong_password',
        error: 'Epic sadface: Username is required'
    },
    {
        username: 'wrong_user',
        password: 'wrong_password',
        error: 'Epic sadface: Username and password do not match any user in this service'
    },
    {
        username: '~!@#$%^&*(',
        password: '~!@#$%^&*(',
        error: 'Epic sadface: Username and password do not match any user in this service'

    },
]

usersLogin.forEach(({username, password, error}, index) => {
    test(`(${index}) user failed login using ${username}`, async ({ page }) =>  {
        await page.goto(baseUrl);

        await page.fill('#user-name', username);
        await page.fill('#password', password);
        await page.click('#login-button');

        // Assert error message
        await expect(page.locator("[data-test='error']")).toHaveText(error);
    });
});
