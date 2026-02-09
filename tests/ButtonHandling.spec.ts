import { expect, test } from "@playwright/test";
import { after } from "node:test";

test("Handling Button Element related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
        await page.locator('a[id="testing"][href="/test"]').click();
        await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Button"]')).toBeVisible();
        const input_content = await page.locator('//*[normalize-space()="Button"]/parent::header/following-sibling::div//p').textContent();
        await expect(input_content).toContain(" Interact with different types of buttons ");
        await page.locator('a[href="/button"]').click();
        await expect(page.locator('h1[class^="title"]')).toBeVisible();
        //Screenshot
        const ss = await page.screenshot();
        testInfo.attach("Landing Page Screenshot", {
            body: ss,
            contentType: 'image/png',
        })

        //GOTO Home and comeback to same screen
        await page.locator('[id="home"]').click();
        const backURL = await page.url();
        await page.goBack();
        const currentURL = await page.url();
        console.log(backURL);
        console.log(currentURL);
        await expect(backURL).not.toEqual(currentURL);

        //Get X and Y co ordinates
        const locationBtn = await page.locator('[id="position"]').boundingBox()
        console.log(locationBtn?.x);
        console.log(locationBtn?.y);

        //Get height and width of button
        const propBtn = await page.locator('[id="property"]').boundingBox();
        console.log(propBtn?.height);
        console.log(propBtn?.width);

        //Verify button is Disabled
        await expect(page.locator('[id="isDisabled"][class*="is-info"]')).toBeDisabled();

        //Click and Hold the Button
        const clickHoldBtn = await page.locator('[id="isDisabled"] h2');
        const beforeText = await clickHoldBtn.textContent();
        await clickHoldBtn.hover();
        await page.mouse.down();
        await page.waitForTimeout(3000);
        await page.mouse.up();
        const afterText = await clickHoldBtn.textContent();
        await expect(beforeText).not.toEqual(afterText);
        console.log(beforeText);
        console.log(afterText);

        //Get the Color of the Button
        const colorBtn = await page.locator('[id="color"]')
        const color_bg = await colorBtn.evaluate(el => { return window.getComputedStyle(el).backgroundColor});
        console.log(color_bg);
})