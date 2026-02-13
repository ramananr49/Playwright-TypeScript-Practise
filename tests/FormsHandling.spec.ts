import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Forms Scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Forms"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Forms"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Interact with everything ");
    await page.locator('a[href="/forms"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");
    await page.waitForLoadState('domcontentloaded');

    //Verify the form Validation
    await page.locator('#firstname').fill("Hemanth");
    await page.locator('#lasttname').fill('Kumar');
    await page.locator('#email').fill('Hemanth.kumar@mail.com');
    await page.locator('//*[@id="countrycode"]/following-sibling::div//select').selectOption({value: "91"});
    await page.locator('#Phno').fill("9988776655");
    await page.locator('#Addl1').fill("flat No : 1004, Prestage Apartments");
    await page.locator('#Addl2').fill("Peenya Industry Metro Station");
    await page.locator('#state').fill("Karnataka");
    await page.locator('#postalcode').fill("560070");
    await page.locator('//*[@id="country"]/following-sibling::div//select').selectOption("India");
    await page.locator('#Date').fill("1994-12-23");
    await page.locator('#male').check();
    await page.locator('input[type="checkbox"]').check();
    await attachScreenshot(page, testInfo, "Before Clicking Submit Button Screenshot")
    await page.locator('input[type="submit"]').click();
    await attachScreenshot(page, testInfo, "After Clicking Submit Button Screenshot")
})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name:string="Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png',
    })
}