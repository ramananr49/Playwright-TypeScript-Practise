import { expect, test } from "@playwright/test";

test("Handling Input filed related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Input"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Input"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Interact with different types of input fields ");
    await page.locator('a[href="/edit"]').click();
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
    //Screenshot
    const ss = await page.screenshot();
    testInfo.attach("Landing Page Screenshot", {
        body: ss,
        contentType: 'image/png',
    })
    await page.locator('input[id="fullName"]').fill("Hell TypeScript");
    await page.locator('input[id="join"]').click();
    await page.locator('input[id="join"]').type(" Tester");
    await page.keyboard.press('Tab');
    await expect(page.locator('input[id="getMe"]')).toHaveValue('ortonikc');
    const beforeTxt = await page.locator('[id="clearMe"]').inputValue();
    await page.locator('[id="clearMe"]').clear();
    const afterTxt = await page.locator('[id="clearMe"]').inputValue();
    await expect(beforeTxt).not.toEqual(afterTxt);
    await expect(page.locator('[id="noEdit"]')).toHaveAttribute("disabled");
    await expect(page.locator('[id="dontwrite"]')).toHaveAttribute("readonly")

    //Screenshot
    const ss1 = await page.screenshot();
    testInfo.attach("After Validation Screenshot", {
        body: ss1,
        contentType: 'image/png',
    })
})