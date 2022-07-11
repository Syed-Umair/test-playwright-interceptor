import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('should login and load the test calendar sdk', async ({ page }) => {
    await page.route(/(anywhere-calendar\.js$)/, route => route.continue({
        url: 'https://storage.googleapis.com/anywhere-components/dev/live/sch-800/anywhere-calendar.js'
    }));
    await page.goto('https://go.setmore.com');
    await page.locator('#email.email-field').fill(process.env.LOGIN as string);
    await page.locator('#password.password-field').fill(process.env.PASSWORD as string);
    await page.locator('#login-now').click();
    await page.waitForNavigation({
        url: 'https://go.setmore.com/calendar'
    });
    await page.waitForSelector('anywhere-calendar');
    const calendar = await page.$('anywhere-calendar');
    await expect(await calendar?.evaluate(node => node.shadowRoot?.textContent)).toBe('Hello Syed!');
});
